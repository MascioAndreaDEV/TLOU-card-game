// === INIZIO SEZIONE: Import Dipendenze e Moduli Arena ===
import { CHARACTERS_DATABASE } from '../data/Characters';
import { ENEMIES_DATABASE } from '../data/enemies';
import { CARD_DATABASE } from '../data/cards';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';
import EnemiesCard from './CharactersCards/EnemiesCard';
import { useCombatEngine } from '../hooks/useCombatEngine';
// === FINE SEZIONE: Import Dipendenze e Moduli Arena ===

// === INIZIO SEZIONE: Blueprint Entità Iniziali ===
const enemy = ENEMIES_DATABASE[0];
const character = CHARACTERS_DATABASE[0];
// === FINE SEZIONE: Blueprint Entità Iniziali ===

// === INIZIO SEZIONE: Componente Principale Arena ===
export default function Arena() {
    const {
        enemyHp,
        playerHp,
        stamina,
        enemyShield,
        playerShield,
        hand,
        drawPile,
        discardPile,
        ammoReserve,
        enemyStatus,
        playerStatus,
        enemyIntent,
        availableCrafts,
        isEnemyAttacking,
        isEnemyHit,
        isVictory,
        isBattleOver,
        handlePlayCard,
        handleCraftCard,
        handleEndTurn,
        handleRestartBattle,
    } = useCombatEngine({
        character,
        enemy,
        cardDatabase: CARD_DATABASE,
    });

    return (
        <div className="arena-container flex-1 flex flex-col items-center justify-between rounded-lg m-2 w-screen relative">

            {/* === INIZIO SEZIONE: Area Nemico e Intento === */}
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
            {/* === FINE SEZIONE: Area Nemico e Intento === */}

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

            {/* === INIZIO SEZIONE: HUD Giocatore === */}
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
            {/* === FINE SEZIONE: HUD Giocatore === */}

            {/* === INIZIO SEZIONE: Barra Crafting Rapido in Combattimento === */}
            {!isBattleOver && availableCrafts.length > 0 && (
                <div className="font-barlow flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-stone-950/90 border border-amber-500/80 shadow-lg">
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                        🛠️ Crafting Disponibile:
                    </span>
                    {availableCrafts.map((craftItem) => (
                        <button
                            key={craftItem.id}
                            onClick={() => handleCraftCard(craftItem)}
                            className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase cursor-pointer transition shadow"
                        >
                            + Assembla {craftItem.name} ({craftItem.recipe.join(' + ')})
                        </button>
                    ))}
                </div>
            )}
            {/* === FINE SEZIONE: Barra Crafting Rapido in Combattimento === */}

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

            {/* === INIZIO SEZIONE: Controllo Fine Turno === */}
            <button
                className="border-2 border-white w-1/4 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 cursor-pointer transition"
                onClick={handleEndTurn}
                disabled={isBattleOver}
            >
                FINE TURNO
            </button>
            {/* === FINE SEZIONE: Controllo Fine Turno === */}

        </div>
    );
}
// === FINE SEZIONE: Componente Principale Arena ===
