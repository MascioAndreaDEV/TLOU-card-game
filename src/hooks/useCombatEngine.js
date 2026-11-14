// === INIZIO SEZIONE: Import Dipendenze React per Combat Engine ===
import { useReducer, useState } from 'react';
// === FINE SEZIONE: Import Dipendenze React per Combat Engine ===

// === INIZIO SEZIONE: Funzioni Pure Helper (Shuffle Fisher-Yates, Deck Runtime, Intent, Pescata) ===
export function shuffleDeck(deck) {
    const copy = [...deck];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function createRuntimeDeck(database) {
    const instances = database.map((card, index) => ({
        ...card,
        instanceId: `${card.id}_${index}_${Math.random().toString(36).slice(2, 6)}`,
        maxDurability: card.durability ?? null,
    }));
    return shuffleDeck(instances);
}

export function getRandomEnemyMove(enemyData) {
    const randomIndex = Math.floor(Math.random() * enemyData.moves.length);
    return enemyData.moves[randomIndex];
}

function drawNFromPiles(hand, drawPile, discardPile, count) {
    if (count <= 0) {
        return { hand, drawPile, discardPile };
    }
    let currentDraw = [...drawPile];
    let currentDiscard = [...discardPile];
    let drawnCards;

    if (currentDraw.length >= count) {
        drawnCards = currentDraw.slice(0, count);
        currentDraw = currentDraw.slice(count);
    } else {
        const remainingNeeded = count - currentDraw.length;
        const reshuffledDiscard = shuffleDeck(currentDiscard);
        drawnCards = [
            ...currentDraw,
            ...reshuffledDiscard.slice(0, remainingNeeded),
        ];
        currentDraw = reshuffledDiscard.slice(remainingNeeded);
        currentDiscard = [];
    }

    return {
        hand: [...hand, ...drawnCards],
        drawPile: currentDraw,
        discardPile: currentDiscard,
    };
}

function drawUpToTarget(hand, drawPile, discardPile, targetHandSize = 5) {
    const keptCards = hand.filter(card => card.retainable === true);
    const discardedFromHand = hand.filter(card => !card.retainable);

    const currentDiscard = [...discardPile, ...discardedFromHand];
    const cardsNeeded = Math.max(0, targetHandSize - keptCards.length);

    return drawNFromPiles(keptCards, drawPile, currentDiscard, cardsNeeded);
}

export function getAvailableCrafts(hand, cardDatabase) {
    const craftableTemplates = cardDatabase.filter(
        c => Array.isArray(c.recipe) && c.recipe.length === 2
    );

    return craftableTemplates.filter(template => {
        const [ingA, ingB] = template.recipe;
        if (ingA === ingB) {
            return hand.filter(c => c.id === ingA).length >= 2;
        }
        return hand.some(c => c.id === ingA) && hand.some(c => c.id === ingB);
    });
}
// === FINE SEZIONE: Funzioni Pure Helper (Shuffle Fisher-Yates, Deck Runtime, Intent, Pescata) ===

// === INIZIO SEZIONE: Inizializzatore Stato Combattimento ===
function createInitialCombatState({ character, enemy, cardDatabase, initialPlayerHp }) {
    const deck = createRuntimeDeck(cardDatabase);
    const startingHp =
        typeof initialPlayerHp === 'number' && initialPlayerHp > 0
            ? Math.min(character.hp, initialPlayerHp)
            : character.hp;

    return {
        enemyHp: enemy.hp,
        playerHp: startingHp,
        stamina: 3,
        enemyShield: 0,
        playerShield: 0,
        hand: deck.slice(0, 5),
        drawPile: deck.slice(5),
        discardPile: [],
        ammoReserve: {},
        enemyStatus: {
            ...enemy.status,
            bleedDuration: 0,
            bleedDamage: 3,
            burnDuration: 0,
            burnDamage: 3,
        },
        playerStatus: {
            ...character.status,
            bleedDuration: 0,
            bleedDamage: 2,
            isPoisoned: false,
            poisonDuration: 0,
            poisonDamage: 2,
        },
        enemyIntent: getRandomEnemyMove(enemy),
    };
}
// === FINE SEZIONE: Inizializzatore Stato Combattimento ===

// === INIZIO SEZIONE: Combat Reducer (Macchina a Stati Immutabile) ===
function combatReducer(state, action) {
    switch (action.type) {
        case 'PLAY_CARD': {
            const { card, character } = action.payload;
            const isBattleOver = state.enemyHp <= 0 || state.playerHp <= 0;
            if (isBattleOver || state.stamina < card.cost || card.craftOnly) {
                return state;
            }

            // 1. Verifica e consumo munizioni per armi da fuoco
            let consumedHandAmmoKey = null;
            let nextAmmoReserve = { ...state.ammoReserve };

            if (card.cardType === 'weapon' && card.ammoType) {
                const reserveCount = nextAmmoReserve[card.ammoType] || 0;
                const matchingAmmoCardInHand = state.hand.find(
                    c => c.cardType === 'ammo' && c.ammoType === card.ammoType
                );

                if (reserveCount <= 0 && !matchingAmmoCardInHand) {
                    return state;
                }

                if (reserveCount > 0) {
                    nextAmmoReserve[card.ammoType] = reserveCount - 1;
                } else if (matchingAmmoCardInHand) {
                    consumedHandAmmoKey = matchingAmmoCardInHand.instanceId || matchingAmmoCardInHand.id;
                }
            }

            // 2. Se è una carta munizione, ricarica la riserva
            if (card.cardType === 'ammo' && card.ammoType) {
                nextAmmoReserve[card.ammoType] = (nextAmmoReserve[card.ammoType] || 0) + 1;
            }

            // 3. Pipeline Danni (con bonusStunDamage e pierceShield), Scudo, Cura e selfDamage
            let nextEnemyShield = state.enemyShield;
            let nextEnemyHp = state.enemyHp;
            let nextPlayerShield = state.playerShield;
            let nextPlayerHp = state.playerHp;

            if (card.effects?.damage !== undefined && card.effects.damage > 0) {
                let totalDamage = card.effects.damage;
                if (card.effects.bonusStunDamage && state.enemyStatus.isStun) {
                    totalDamage += card.effects.bonusStunDamage;
                }
                if (card.effects.bonusBleedDamage && state.enemyStatus.isBleeding) {
                    totalDamage += card.effects.bonusBleedDamage;
                }

                if (card.effects.pierceShield) {
                    nextEnemyHp = Math.max(0, nextEnemyHp - totalDamage);
                } else if (totalDamage <= nextEnemyShield) {
                    nextEnemyShield -= totalDamage;
                } else {
                    const dannoResiduo = totalDamage - nextEnemyShield;
                    nextEnemyShield = 0;
                    nextEnemyHp = Math.max(0, nextEnemyHp - dannoResiduo);
                }
            }

            if (card.effects?.selfDamage > 0) {
                nextPlayerHp = Math.max(0, nextPlayerHp - card.effects.selfDamage);
            }

            if (card.effects?.shield !== undefined && card.effects.shield > 0) {
                nextPlayerShield += card.effects.shield;
            }

            if (card.effects?.heal !== undefined && card.effects.heal > 0) {
                nextPlayerHp = Math.min(character.hp, nextPlayerHp + card.effects.heal);
            }

            // 4. Status Alterati da Carta Giocata
            let nextEnemyStatus = { ...state.enemyStatus };
            let nextPlayerStatus = { ...state.playerStatus };

            if (card.effects) {
                if (card.effects.stun) {
                    nextEnemyStatus.isStun = true;
                }
                if (card.effects.bleedChance && Math.random() < card.effects.bleedChance) {
                    nextEnemyStatus.isBleeding = true;
                    nextEnemyStatus.bleedDuration = 3;
                    nextEnemyStatus.bleedDamage = 3;
                }
                if (card.effects.dismemberChance && Math.random() < card.effects.dismemberChance) {
                    nextEnemyStatus.isDismember = true;
                }
                if (card.effects.burnDamage) {
                    nextEnemyStatus.burnDuration = 3;
                    nextEnemyStatus.burnDamage = Math.max(1, Math.round(card.effects.burnDamage / 3));
                }
                if (card.effects.cleanse) {
                    if (card.effects.cleanse.includes('bleed')) {
                        nextPlayerStatus.isBleeding = false;
                        nextPlayerStatus.bleedDuration = 0;
                    }
                    if (card.effects.cleanse.includes('poison')) {
                        nextPlayerStatus.isPoisoned = false;
                        nextPlayerStatus.poisonDuration = 0;
                    }
                }
            }

            // 5. Gestione Durabilità e Scarti
            const targetKey = card.instanceId || card.id;
            const hasRemainingDurability = card.durability !== undefined && card.durability > 1;

            let nextHand = state.hand.filter(c => (c.instanceId || c.id) !== consumedHandAmmoKey);
            if (hasRemainingDurability) {
                nextHand = nextHand.map(c =>
                    (c.instanceId || c.id) === targetKey
                        ? { ...c, durability: c.durability - 1 }
                        : c
                );
            } else {
                nextHand = nextHand.filter(c => (c.instanceId || c.id) !== targetKey);
            }

            let nextDiscardPile = [...state.discardPile];
            if (consumedHandAmmoKey) {
                const usedAmmoCard = state.hand.find(c => (c.instanceId || c.id) === consumedHandAmmoKey);
                if (usedAmmoCard) {
                    nextDiscardPile.push({
                        ...usedAmmoCard,
                        durability: usedAmmoCard.maxDurability ?? usedAmmoCard.durability,
                    });
                }
            }
            if (!hasRemainingDurability) {
                nextDiscardPile.push({
                    ...card,
                    durability: card.maxDurability ?? card.durability,
                });
            }

            // 6. Effetti Extra: Pesca carte immediata (draw) e Guadagno Stamina (staminaGain)
            let nextDrawPile = [...state.drawPile];
            if (card.effects?.draw > 0) {
                const drawResult = drawNFromPiles(
                    nextHand,
                    nextDrawPile,
                    nextDiscardPile,
                    card.effects.draw
                );
                nextHand = drawResult.hand;
                nextDrawPile = drawResult.drawPile;
                nextDiscardPile = drawResult.discardPile;
            }

            const staminaBonus = card.effects?.staminaGain || 0;

            return {
                ...state,
                stamina: state.stamina - card.cost + staminaBonus,
                ammoReserve: nextAmmoReserve,
                enemyShield: nextEnemyShield,
                enemyHp: nextEnemyHp,
                playerShield: nextPlayerShield,
                playerHp: nextPlayerHp,
                enemyStatus: nextEnemyStatus,
                playerStatus: nextPlayerStatus,
                hand: nextHand,
                drawPile: nextDrawPile,
                discardPile: nextDiscardPile,
            };
        }

        case 'CRAFT_CARD': {
            const { targetTemplate } = action.payload;
            const isBattleOver = state.enemyHp <= 0 || state.playerHp <= 0;
            if (isBattleOver || !Array.isArray(targetTemplate?.recipe)) {
                return state;
            }

            const [ingA, ingB] = targetTemplate.recipe;
            const firstMat = state.hand.find(c => c.id === ingA);
            if (!firstMat) return state;

            const firstKey = firstMat.instanceId || firstMat.id;
            const secondMat = state.hand.find(
                c => c.id === ingB && (c.instanceId || c.id) !== firstKey
            );
            if (!secondMat) return state;

            const secondKey = secondMat.instanceId || secondMat.id;

            const craftedInstance = {
                ...targetTemplate,
                instanceId: `${targetTemplate.id}_crafted_${Date.now()}`,
                maxDurability: targetTemplate.durability ?? null,
            };

            const nextHand = [
                ...state.hand.filter(
                    c => (c.instanceId || c.id) !== firstKey && (c.instanceId || c.id) !== secondKey
                ),
                craftedInstance,
            ];

            const nextDiscardPile = [
                ...state.discardPile,
                { ...firstMat, durability: firstMat.maxDurability ?? firstMat.durability },
                { ...secondMat, durability: secondMat.maxDurability ?? secondMat.durability },
            ];

            return {
                ...state,
                hand: nextHand,
                discardPile: nextDiscardPile,
            };
        }

        case 'END_TURN': {
            const { enemy } = action.payload;
            if (state.enemyHp <= 0 || state.playerHp <= 0) {
                return state;
            }

            let nextEnemyHp = state.enemyHp;
            let nextEnemyShield = state.enemyShield;
            let nextPlayerHp = state.playerHp;
            let nextPlayerShield = state.playerShield;
            let nextEnemyStatus = { ...state.enemyStatus };
            let nextPlayerStatus = { ...state.playerStatus };

            // 1. Tick DoT sul nemico (Bleed / Burn)
            let dotDamageOnEnemy = 0;
            if (nextEnemyStatus.isBleeding && nextEnemyStatus.bleedDuration > 0) {
                dotDamageOnEnemy += nextEnemyStatus.bleedDamage;
            }
            if (nextEnemyStatus.burnDuration > 0) {
                dotDamageOnEnemy += nextEnemyStatus.burnDamage;
            }
            nextEnemyHp = Math.max(0, nextEnemyHp - dotDamageOnEnemy);

            // 2. Se il nemico è ancora vivo e non è stordito, esegue il suo intento
            if (nextEnemyHp > 0) {
                if (nextEnemyStatus.isStun) {
                    nextEnemyStatus.isStun = false;
                } else if (state.enemyIntent) {
                    const mossaCorrente = state.enemyIntent;

                    if (mossaCorrente.damage > 0) {
                        const effectiveDamage = nextEnemyStatus.isDismember
                            ? Math.max(1, Math.floor(mossaCorrente.damage * 0.75))
                            : mossaCorrente.damage;

                        if (effectiveDamage > nextPlayerShield) {
                            nextPlayerHp = Math.max(0, nextPlayerHp - (effectiveDamage - nextPlayerShield));
                            nextPlayerShield = 0;
                        } else {
                            nextPlayerShield -= effectiveDamage;
                        }
                    }

                    if (mossaCorrente.shield > 0) {
                        nextEnemyShield += mossaCorrente.shield;
                    }

                    if (Array.isArray(mossaCorrente.effects)) {
                        mossaCorrente.effects.forEach(eff => {
                            if (eff.isBleeding) {
                                nextPlayerStatus.isBleeding = true;
                                nextPlayerStatus.bleedDuration = eff.duration || 2;
                                nextPlayerStatus.bleedDamage = eff.damageBleeding || 2;
                            }
                            if (eff.isPoisoned) {
                                nextPlayerStatus.isPoisoned = true;
                                nextPlayerStatus.poisonDuration = eff.duration || 2;
                                nextPlayerStatus.poisonDamage = eff.damagePoison || 2;
                            }
                        });
                    }
                }
            }

            // 3. Tick DoT sul giocatore (Bleed / Poison)
            let dotDamageOnPlayer = 0;
            if (nextPlayerStatus.isBleeding && nextPlayerStatus.bleedDuration > 0) {
                dotDamageOnPlayer += nextPlayerStatus.bleedDamage;
            }
            if (nextPlayerStatus.isPoisoned && nextPlayerStatus.poisonDuration > 0) {
                dotDamageOnPlayer += nextPlayerStatus.poisonDamage;
            }
            nextPlayerHp = Math.max(0, nextPlayerHp - dotDamageOnPlayer);

            // 4. Decremento durate status
            const nextEnemyBleed = Math.max(0, nextEnemyStatus.bleedDuration - 1);
            nextEnemyStatus.bleedDuration = nextEnemyBleed;
            nextEnemyStatus.isBleeding = nextEnemyBleed > 0;
            nextEnemyStatus.burnDuration = Math.max(0, nextEnemyStatus.burnDuration - 1);

            const nextPlayerBleed = Math.max(0, nextPlayerStatus.bleedDuration - 1);
            const nextPlayerPoison = Math.max(0, nextPlayerStatus.poisonDuration - 1);
            nextPlayerStatus.bleedDuration = nextPlayerBleed;
            nextPlayerStatus.isBleeding = nextPlayerBleed > 0;
            nextPlayerStatus.poisonDuration = nextPlayerPoison;
            nextPlayerStatus.isPoisoned = nextPlayerPoison > 0;

            // 5. Pescata carte per il nuovo turno e ricarica Stamina
            const { hand, drawPile, discardPile } = drawUpToTarget(
                state.hand,
                state.drawPile,
                state.discardPile,
                5
            );

            return {
                ...state,
                enemyHp: nextEnemyHp,
                enemyShield: nextEnemyShield,
                playerHp: nextPlayerHp,
                playerShield: nextPlayerShield,
                enemyStatus: nextEnemyStatus,
                playerStatus: nextPlayerStatus,
                hand,
                drawPile,
                discardPile,
                stamina: 3,
                enemyIntent: getRandomEnemyMove(enemy),
            };
        }

        case 'RESTART_BATTLE': {
            return createInitialCombatState(action.payload);
        }

        default:
            return state;
    }
}
// === FINE SEZIONE: Combat Reducer (Macchina a Stati Immutabile) ===

// === INIZIO SEZIONE: Custom Hook useCombatEngine ===
export function useCombatEngine({
    character,
    enemy,
    cardDatabase,
    allCardsDatabase = cardDatabase,
    initialPlayerHp,
}) {
    const [state, dispatch] = useReducer(
        combatReducer,
        { character, enemy, cardDatabase, initialPlayerHp },
        createInitialCombatState
    );

    const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
    const [isEnemyHit, setIsEnemyHit] = useState(false);

    const isVictory = state.enemyHp <= 0;
    const isGameOver = state.playerHp <= 0;
    const isBattleOver = isVictory || isGameOver;
    const availableCrafts = getAvailableCrafts(state.hand, allCardsDatabase);

    function handlePlayCard(card) {
        if (isBattleOver || state.stamina < card.cost || card.craftOnly) return;

        if (card.effects?.damage > 0) {
            setIsEnemyHit(true);
            setTimeout(() => setIsEnemyHit(false), 300);
        }

        dispatch({
            type: 'PLAY_CARD',
            payload: { card, character },
        });
    }

    function handleCraftCard(targetTemplate) {
        if (isBattleOver) return;
        dispatch({
            type: 'CRAFT_CARD',
            payload: { targetTemplate },
        });
    }

    function handleEndTurn() {
        if (isBattleOver) return;

        if (!state.enemyStatus.isStun && state.enemyHp > 0) {
            setIsEnemyAttacking(true);
            setTimeout(() => setIsEnemyAttacking(false), 350);
        }

        dispatch({
            type: 'END_TURN',
            payload: { enemy },
        });
    }

    function handleRestartBattle() {
        setIsEnemyAttacking(false);
        setIsEnemyHit(false);
        dispatch({
            type: 'RESTART_BATTLE',
            payload: { character, enemy, cardDatabase, initialPlayerHp },
        });
    }

    return {
        ...state,
        availableCrafts,
        isEnemyAttacking,
        isEnemyHit,
        isVictory,
        isGameOver,
        isBattleOver,
        handlePlayCard,
        handleCraftCard,
        handleEndTurn,
        handleRestartBattle,
    };
}
// === FINE SEZIONE: Custom Hook useCombatEngine ===
