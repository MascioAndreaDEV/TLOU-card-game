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

    // === INIZIO SEZIONE: Logica Turno Nemico con Risoluzione Intent ===
    function handleEnemyTurn() {
        if (enemyHp > 0 && enemyIntent) {
            const mossaCorrente = enemyIntent;

            setIsEnemyAttacking(true);
            setTimeout(() => setIsEnemyAttacking(false), 350);

            if (mossaCorrente.damage > 0) {
                shieldHandler(mossaCorrente.damage, playerShield, setPlayerShield, playerHp, setPlayerHp);
            }
            if (mossaCorrente.shield > 0) {
                setEnemyShield(prev => prev + mossaCorrente.shield);
            }

            // Genera il prossimo intento per il turno successivo
            setEnemyIntent(getRandomEnemyMove(enemy));
        }
    }
    // === FINE SEZIONE: Logica Turno Nemico con Risoluzione Intent ===

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

    // FUnzione unica gestioneGiocataCarta

    function handlePlayCard(card) {

        if (isBattleOver === true) {
            return
        }

        if (stamina < card.cost) {
            return
        }
        setStamina(stamina - card.cost);

        if (card.effects.damage !== undefined && card.effects.damage > 0) {
            setIsEnemyHit(true);
            setTimeout(() => setIsEnemyHit(false), 300);

            if (card.effects.damage <= enemyShield) {
                setEnemyShield(enemyShield - card.effects.damage)
            }
            else if (card.effects.damage > enemyShield) {
                setEnemyShield(0)

                const dannoResiduo = card.effects.damage - enemyShield

                setEnemyHp(Math.max(0, enemyHp - dannoResiduo))
            }
        }

        if (card.effects.shield !== undefined && card.effects.shield > 0) {
            setPlayerShield(playerShield + card.effects.shield)
        }

        if (card.effects.heal !== undefined && card.effects.heal > 0) {
            setPlayerHp(Math.min(character.hp, playerHp + card.effects.heal))
        }

        handleDiscard(card);

        setDiscardPile(discardPile => [...discardPile, card])

    }



    return (
        <div className="arena-container font- flex-1 flex flex-col items-center justify-between rounded-lg m-2 w-screen">

            <EnemiesCard
                enemy={enemy}
                hpCorrenti={enemyHp}
                hpNemico={enemy.hp}
                scudo={enemyShield}
                isAttacking={isEnemyAttacking}
                isHit={isEnemyHit}
                intent={enemyIntent}
            />

            <PlayerHUD characterName={character.name} characterImage={character.image} characterHp={character.hp} characterCurrentHp={playerHp} playerStamina={stamina} playerShield={playerShield} />

            {/*Player Hand meglio in HUD ???*/}

            <PlayerHand hand={hand} playedCard={handlePlayCard} />

            <button className='border-2 border-white w-1/4 rounded-lg bg-red-600 text-white' onClick={handleEndTurn} disabled={isBattleOver}><span className='disabled:opacity-40 disabled:cursor-not-allowed text-white p-2'>FINE TURNO</span></button>

        </div >
    );
};
