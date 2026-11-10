import { CHARACTERS_DATABASE } from '../data/Characters';
import { ENEMIES_DATABASE } from '../data/enemies';
import { useState } from 'react';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';
import { CARD_DATABASE } from '../data/cards';
import EnemiesCard from './CharactersCards/EnemiesCard';
import { SiD } from 'react-icons/si';


const enemy = ENEMIES_DATABASE[0]

const character = CHARACTERS_DATABASE[0]

// === INIZIO SEZIONE: Funzioni Helper Mazzo (Shuffle Fisher-Yates & Istanze Runtime) ===
function shuffleDeck(deck) {
    const copy = [...deck];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function createRuntimeDeck(database) {
    const instances = database.map((card, index) => ({
        ...card,
        instanceId: `${card.id}_${index}`,
        maxDurability: card.durability ?? null,
    }));
    return shuffleDeck(instances);
}

// === INIZIO SEZIONE: Helper Scelta Mossa Nemica (Enemy Intent) ===
function getRandomEnemyMove(enemyData) {
    const randomIndex = Math.floor(Math.random() * enemyData.moves.length);
    return enemyData.moves[randomIndex];
}
// === FINE SEZIONE: Helper Scelta Mossa Nemica (Enemy Intent) ===
// === FINE SEZIONE: Funzioni Helper Mazzo (Shuffle Fisher-Yates & Istanze Runtime) ===

export default function Arena() {

    // === INIZIO SEZIONE: Stato Runtime Combattimento e Mazzi ===
    const [initialDeck] = useState(() => createRuntimeDeck(CARD_DATABASE));

    const [enemyHp, setEnemyHp] = useState(enemy.hp);

    const [playerHp, setPlayerHp] = useState(character.hp);

    const [stamina, setStamina] = useState(3);

    const [enemyShield, setEnemyShield] = useState(0);

    const [playerShield, setPlayerShield] = useState(0);

    const [hand, setHand] = useState(() => initialDeck.slice(0, 5));

    const [drawPile, setDrawPile] = useState(() => initialDeck.slice(5));

    const [discardPile, setDiscardPile] = useState([]);

    const [ammoReserve, setAmmoReserve] = useState({});

    // === INIZIO SEZIONE: Stato Runtime Status Alterati (Nemico & Giocatore) ===
    const [enemyStatus, setEnemyStatus] = useState(() => ({
        ...enemy.status,
        bleedDuration: 0,
        bleedDamage: 3,
        burnDuration: 0,
        burnDamage: 3,
    }));

    const [playerStatus, setPlayerStatus] = useState(() => ({
        ...character.status,
        bleedDuration: 0,
        bleedDamage: 2,
        isPoisoned: false,
        poisonDuration: 0,
        poisonDamage: 2,
    }));
    // === FINE SEZIONE: Stato Runtime Status Alterati (Nemico & Giocatore) ===

    const [enemyIntent, setEnemyIntent] = useState(() => getRandomEnemyMove(enemy));

    const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);

    const [isEnemyHit, setIsEnemyHit] = useState(false);
    // === FINE SEZIONE: Stato Runtime Combattimento e Mazzi ===

    // === INIZIO SEZIONE: Condizioni Derivate Vittoria / Sconfitta ===
    const isVictory = enemyHp <= 0;
    const isGameOver = playerHp <= 0;
    const isBattleOver = isVictory || isGameOver;
    // === FINE SEZIONE: Condizioni Derivate Vittoria / Sconfitta ===

    // === INIZIO SEZIONE: Gestione Scarto Singola Carta ===
    function handleDiscard(card) {
        const targetKey = card.instanceId || card.id;
        setHand(prevHand => prevHand.filter(c => (c.instanceId || c.id) !== targetKey));
    }
    // === FINE SEZIONE: Gestione Scarto Singola Carta ===

    // === INIZIO SEZIONE: Logica Turno Nemico con Risoluzione Intent e Status ===
    function handleEnemyTurn() {
        if (enemyHp <= 0) return;

        // 1. Tick danni periodici sul nemico (Bleed / Burn)
        let dotDamageOnEnemy = 0;
        if (enemyStatus.isBleeding && enemyStatus.bleedDuration > 0) {
            dotDamageOnEnemy += enemyStatus.bleedDamage;
        }
        if (enemyStatus.burnDuration > 0) {
            dotDamageOnEnemy += enemyStatus.burnDamage;
        }

        const enemyHpAfterDot = Math.max(0, enemyHp - dotDamageOnEnemy);
        if (dotDamageOnEnemy > 0) {
            setEnemyHp(enemyHpAfterDot);
        }

        // Edge case: se il nemico muore per sanguinamento/ustione a inizio turno, non attacca
        if (enemyHpAfterDot <= 0) {
            setEnemyStatus(prev => ({
                ...prev,
                bleedDuration: Math.max(0, prev.bleedDuration - 1),
                isBleeding: prev.bleedDuration - 1 > 0,
                burnDuration: Math.max(0, prev.burnDuration - 1),
            }));
            return;
        }

        // 2. Controllo Stun: se stordito, salta l'azione e rimuove lo stordimento
        if (enemyStatus.isStun) {
            setEnemyStatus(prev => ({
                ...prev,
                isStun: false,
                bleedDuration: Math.max(0, prev.bleedDuration - 1),
                isBleeding: prev.bleedDuration - 1 > 0,
                burnDuration: Math.max(0, prev.burnDuration - 1),
            }));
            setEnemyIntent(getRandomEnemyMove(enemy));
            return;
        }

        // 3. Esecuzione della mossa telegrafata in enemyIntent
        let nextPlayerHp = playerHp;
        let nextPlayerShield = playerShield;

        if (enemyIntent) {
            const mossaCorrente = enemyIntent;

            setIsEnemyAttacking(true);
            setTimeout(() => setIsEnemyAttacking(false), 350);

            if (mossaCorrente.damage > 0) {
                // Se il nemico è mutilato (isDismember), infligge il 25% di danno in meno
                const effectiveDamage = enemyStatus.isDismember
                    ? Math.max(1, Math.floor(mossaCorrente.damage * 0.75))
                    : mossaCorrente.damage;

                if (effectiveDamage > nextPlayerShield) {
                    nextPlayerHp = Math.max(0, nextPlayerHp - (effectiveDamage - nextPlayerShield));
                    nextPlayerShield = 0;
                } else {
                    nextPlayerShield = nextPlayerShield - effectiveDamage;
                }
            }

            if (mossaCorrente.shield > 0) {
                setEnemyShield(prev => prev + mossaCorrente.shield);
            }

            // 4. Applicazione eventuali status inflitti dalla mossa nemica (Bleed / Poison)
            if (Array.isArray(mossaCorrente.effects)) {
                setPlayerStatus(prev => {
                    const updated = { ...prev };
                    mossaCorrente.effects.forEach(eff => {
                        if (eff.isBleeding) {
                            updated.isBleeding = true;
                            updated.bleedDuration = eff.duration || 2;
                            updated.bleedDamage = eff.damageBleeding || 2;
                        }
                        if (eff.isPoisoned) {
                            updated.isPoisoned = true;
                            updated.poisonDuration = eff.duration || 2;
                            updated.poisonDamage = eff.damagePoison || 2;
                        }
                    });
                    return updated;
                });
            }
        }

        // 5. Tick danni periodici sul giocatore (Bleed / Poison già attivi)
        let dotDamageOnPlayer = 0;
        if (playerStatus.isBleeding && playerStatus.bleedDuration > 0) {
            dotDamageOnPlayer += playerStatus.bleedDamage;
        }
        if (playerStatus.isPoisoned && playerStatus.poisonDuration > 0) {
            dotDamageOnPlayer += playerStatus.poisonDamage;
        }

        nextPlayerHp = Math.max(0, nextPlayerHp - dotDamageOnPlayer);
        setPlayerShield(nextPlayerShield);
        setPlayerHp(nextPlayerHp);

        // 6. Decremento durate status a fine turno
        setEnemyStatus(prev => {
            const nextBleed = Math.max(0, prev.bleedDuration - 1);
            const nextBurn = Math.max(0, prev.burnDuration - 1);
            return {
                ...prev,
                bleedDuration: nextBleed,
                isBleeding: nextBleed > 0,
                burnDuration: nextBurn,
            };
        });

        setPlayerStatus(prev => {
            const nextBleed = Math.max(0, prev.bleedDuration - 1);
            const nextPoison = Math.max(0, prev.poisonDuration - 1);
            return {
                ...prev,
                bleedDuration: nextBleed,
                isBleeding: nextBleed > 0,
                poisonDuration: nextPoison,
                isPoisoned: nextPoison > 0,
            };
        });

        // 7. Genera il prossimo intento per il turno successivo
        setEnemyIntent(getRandomEnemyMove(enemy));
    }
    // === FINE SEZIONE: Logica Turno Nemico con Risoluzione Intent e Status ===

    // === INIZIO SEZIONE: Pescata Inizio Turno, Retainable e Reshuffle Scarti ===
    function drawCards(targetHandSize = 5) {
        const keptCards = hand.filter(card => card.retainable === true);
        const discardedFromHand = hand.filter(card => !card.retainable);

        let currentDraw = [...drawPile];
        let currentDiscard = [...discardPile, ...discardedFromHand];

        const cardsNeeded = Math.max(0, targetHandSize - keptCards.length);
        let drawnCards = [];

        if (currentDraw.length >= cardsNeeded) {
            drawnCards = currentDraw.slice(0, cardsNeeded);
            currentDraw = currentDraw.slice(cardsNeeded);
        } else {
            const remainingNeeded = cardsNeeded - currentDraw.length;
            const reshuffledDiscard = shuffleDeck(currentDiscard);
            drawnCards = [
                ...currentDraw,
                ...reshuffledDiscard.slice(0, remainingNeeded)
            ];
            currentDraw = reshuffledDiscard.slice(remainingNeeded);
            currentDiscard = [];
        }

        setHand([...keptCards, ...drawnCards]);
        setDrawPile(currentDraw);
        setDiscardPile(currentDiscard);
    }
    // === FINE SEZIONE: Pescata Inizio Turno, Retainable e Reshuffle Scarti ===


    function shieldHandler(danno, playerShield, setPlayerShield, playerHp, setPlayerHp) {

        if (danno > playerShield) {
            setPlayerShield(0)
            setPlayerHp(Math.max(0, playerHp - (danno - playerShield)))
        }
        else {
            setPlayerShield(playerShield - danno)
        }
    }


    function handleEndTurn() {
        handleEnemyTurn()
        drawCards()
        setStamina(3);
    }

    // === INIZIO SEZIONE: Gestione Giocata Carta, Munizioni e Durabilità ===
    function handlePlayCard(card) {
        if (isBattleOver === true) {
            return;
        }

        if (stamina < card.cost) {
            return;
        }

        // 1. Verifica e consumo munizioni per armi da fuoco
        let consumedHandAmmoKey = null;
        if (card.cardType === 'weapon' && card.ammoType) {
            const reserveCount = ammoReserve[card.ammoType] || 0;
            const matchingAmmoCardInHand = hand.find(
                c => c.cardType === 'ammo' && c.ammoType === card.ammoType
            );

            if (reserveCount <= 0 && !matchingAmmoCardInHand) {
                return;
            }

            if (reserveCount > 0) {
                setAmmoReserve(prev => ({
                    ...prev,
                    [card.ammoType]: prev[card.ammoType] - 1,
                }));
            } else if (matchingAmmoCardInHand) {
                consumedHandAmmoKey = matchingAmmoCardInHand.instanceId || matchingAmmoCardInHand.id;
            }
        }

        // 2. Pagamento costo Stamina
        setStamina(prev => prev - card.cost);

        // 3. Se è una carta munizione, ricarica la riserva del calibro corrispondente
        if (card.cardType === 'ammo' && card.ammoType) {
            setAmmoReserve(prev => ({
                ...prev,
                [card.ammoType]: (prev[card.ammoType] || 0) + 1,
            }));
        }

        // 4. Risoluzione Danni, Scudo e Cura
        if (card.effects?.damage !== undefined && card.effects.damage > 0) {
            setIsEnemyHit(true);
            setTimeout(() => setIsEnemyHit(false), 300);

            if (card.effects.damage <= enemyShield) {
                setEnemyShield(enemyShield - card.effects.damage);
            } else {
                setEnemyShield(0);
                const dannoResiduo = card.effects.damage - enemyShield;
                setEnemyHp(Math.max(0, enemyHp - dannoResiduo));
            }
        }

        if (card.effects?.shield !== undefined && card.effects.shield > 0) {
            setPlayerShield(playerShield + card.effects.shield);
        }

        if (card.effects?.heal !== undefined && card.effects.heal > 0) {
            setPlayerHp(Math.min(character.hp, playerHp + card.effects.heal));
        }

        // === INIZIO SEZIONE: Risoluzione Status Alterati da Carta Giocata (Stun, Bleed, Dismember, Burn, Cleanse) ===
        if (card.effects) {
            setEnemyStatus(prev => {
                const next = { ...prev };
                if (card.effects.stun) {
                    next.isStun = true;
                }
                if (card.effects.bleedChance && Math.random() < card.effects.bleedChance) {
                    next.isBleeding = true;
                    next.bleedDuration = 3;
                    next.bleedDamage = 3;
                }
                if (card.effects.dismemberChance && Math.random() < card.effects.dismemberChance) {
                    next.isDismember = true;
                }
                if (card.effects.burnDamage) {
                    next.burnDuration = 3;
                    next.burnDamage = Math.max(1, Math.round(card.effects.burnDamage / 3));
                }
                return next;
            });

            if (card.effects.cleanse) {
                setPlayerStatus(prev => ({
                    ...prev,
                    isBleeding: card.effects.cleanse.includes('bleed') ? false : prev.isBleeding,
                    bleedDuration: card.effects.cleanse.includes('bleed') ? 0 : prev.bleedDuration,
                    isPoisoned: card.effects.cleanse.includes('poison') ? false : prev.isPoisoned,
                    poisonDuration: card.effects.cleanse.includes('poison') ? 0 : prev.poisonDuration,
                }));
            }
        }
        // === FINE SEZIONE: Risoluzione Status Alterati da Carta Giocata (Stun, Bleed, Dismember, Burn, Cleanse) ===

        // 5. Gestione Durabilità e Scarto
        const targetKey = card.instanceId || card.id;
        const hasRemainingDurability = card.durability !== undefined && card.durability > 1;

        setHand(prevHand => {
            let nextHand = prevHand.filter(c => (c.instanceId || c.id) !== consumedHandAmmoKey);
            if (hasRemainingDurability) {
                return nextHand.map(c =>
                    (c.instanceId || c.id) === targetKey
                        ? { ...c, durability: c.durability - 1 }
                        : c
                );
            }
            return nextHand.filter(c => (c.instanceId || c.id) !== targetKey);
        });

        setDiscardPile(prevDiscard => {
            const newDiscards = [...prevDiscard];
            if (consumedHandAmmoKey) {
                const usedAmmoCard = hand.find(c => (c.instanceId || c.id) === consumedHandAmmoKey);
                if (usedAmmoCard) {
                    newDiscards.push({
                        ...usedAmmoCard,
                        durability: usedAmmoCard.maxDurability ?? usedAmmoCard.durability,
                    });
                }
            }
            if (!hasRemainingDurability) {
                newDiscards.push({
                    ...card,
                    durability: card.maxDurability ?? card.durability,
                });
            }
            return newDiscards;
        });
    }
    // === FINE SEZIONE: Gestione Giocata Carta, Munizioni e Durabilità ===



    // === INIZIO SEZIONE: Funzione Reset / Nuovo Scontro ===
    function handleRestartBattle() {
        const freshDeck = createRuntimeDeck(CARD_DATABASE);
        setEnemyHp(enemy.hp);
        setPlayerHp(character.hp);
        setStamina(3);
        setEnemyShield(0);
        setPlayerShield(0);
        setHand(freshDeck.slice(0, 5));
        setDrawPile(freshDeck.slice(5));
        setDiscardPile([]);
        setAmmoReserve({});
        setEnemyStatus({
            ...enemy.status,
            bleedDuration: 0,
            bleedDamage: 3,
            burnDuration: 0,
            burnDamage: 3,
        });
        setPlayerStatus({
            ...character.status,
            bleedDuration: 0,
            bleedDamage: 2,
            isPoisoned: false,
            poisonDuration: 0,
            poisonDamage: 2,
        });
        setEnemyIntent(getRandomEnemyMove(enemy));
        setIsEnemyAttacking(false);
        setIsEnemyHit(false);
    }
    // === FINE SEZIONE: Funzione Reset / Nuovo Scontro ===

    return (
        <div className="arena-container flex-1 flex flex-col items-center justify-between rounded-lg m-2 w-screen relative">

            <EnemiesCard
                enemy={enemy}
                hpCorrenti={enemyHp}
                hpNemico={enemy.hp}
                scudo={enemyShield}
                isAttacking={isEnemyAttacking}
                isHit={isEnemyHit}
                intent={enemyIntent}
                status={enemyStatus}
            />

            {/* === INIZIO SEZIONE: Banner Vittoria / Sconfitta con Pulsante Rigioca === */}
            {isBattleOver && (
                <div className="font-barlow flex flex-col items-center gap-3 px-8 py-5 rounded-xl bg-stone-950/95 border-2 border-amber-500 shadow-2xl z-50">
                    <h2 className={`text-3xl font-bold uppercase tracking-widest ${isVictory ? 'text-emerald-400' : 'text-red-500'}`}>
                        {isVictory ? 'MINACCIA ELIMINATA — VITTORIA!' : 'SEI SOPRAFFATTO — GAME OVER'}
                    </h2>
                    <button
                        onClick={handleRestartBattle}
                        className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider transition cursor-pointer"
                    >
                        Rigioca / Nuovo Scontro
                    </button>
                </div>
            )}
            {/* === FINE SEZIONE: Banner Vittoria / Sconfitta con Pulsante Rigioca === */}

            <PlayerHUD
                characterName={character.name}
                characterImage={character.image}
                characterHp={character.hp}
                characterCurrentHp={playerHp}
                playerStamina={stamina}
                playerShield={playerShield}
                ammoReserve={ammoReserve}
                playerStatus={playerStatus}
            />

            {/* === INIZIO SEZIONE: Contatori Mazzo di Pesca, Mano a Ventaglio e Scarti === */}
            <div className="w-full flex items-center justify-between px-8">
                <div className="font-barlow flex flex-col items-center px-4 py-2 rounded-lg bg-stone-900/90 border border-amber-700/60 text-amber-300 shadow">
                    <span className="text-xs uppercase text-stone-400">Draw Pile</span>
                    <span className="text-2xl font-bold">{drawPile.length}</span>
                </div>

                <PlayerHand
                    hand={hand}
                    playedCard={handlePlayCard}
                    playerStamina={stamina}
                    ammoReserve={ammoReserve}
                />

                <div className="font-barlow flex flex-col items-center px-4 py-2 rounded-lg bg-stone-900/90 border border-zinc-700 text-stone-300 shadow">
                    <span className="text-xs uppercase text-stone-400">Discard Pile</span>
                    <span className="text-2xl font-bold">{discardPile.length}</span>
                </div>
            </div>
            {/* === FINE SEZIONE: Contatori Mazzo di Pesca, Mano a Ventaglio e Scarti === */}

            <button
                className="border-2 border-white w-1/4 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 cursor-pointer transition"
                onClick={handleEndTurn}
                disabled={isBattleOver}
            >
                FINE TURNO
            </button>

        </div>
    );
}
