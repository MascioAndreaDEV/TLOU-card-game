// === INIZIO SEZIONE: Import Dipendenze e Moduli Arena ===
import { CHARACTERS_DATABASE } from '../data/Characters';
import { ENEMIES_DATABASE } from '../data/enemies';
import { CARD_DATABASE } from '../data/cards';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';
import EnemiesCard from './CharactersCards/EnemiesCard';
import Card from './card';
import { useCombatEngine } from '../hooks/useCombatEngine';
// === FINE SEZIONE: Import Dipendenze e Moduli Arena ===

// === INIZIO SEZIONE: Blueprint Entità Fallback Default ===
const defaultEnemy = ENEMIES_DATABASE[0];
const defaultCharacter = CHARACTERS_DATABASE[0];
// === FINE SEZIONE: Blueprint Entità Fallback Default ===

// === INIZIO SEZIONE: Componente Principale Arena ===
export default function Arena({
    character = defaultCharacter,
    enemy = defaultEnemy,
    deck = CARD_DATABASE,
    initialPlayerHp,
    rewardChoices = [],
    onCompleteVictory,
    onReturnToMap,
}) {
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
        cardDatabase: deck,
        allCardsDatabase: CARD_DATABASE,
        initialPlayerHp,
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

            {/* === INIZIO SEZIONE: Banner Vittoria con Draft Ricompensa 1-su-3 o Sconfitta === */}
            {isBattleOver && (
                <div className="font-barlow flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-stone-950/95 border-2 border-amber-500 shadow-2xl z-50 max-w-5xl">
                    <h2 className={`text-3xl font-extrabold uppercase tracking-widest ${isVictory ? 'text-emerald-400' : 'text-red-500'}`}>
                        {isVictory ? `MINACCIA ELIMINATA (${enemy.name}) — VITTORIA!` : 'SEI SOPRAFFATTO — GAME OVER'}
                    </h2>

                    {isVictory && onCompleteVictory && rewardChoices.length > 0 ? (
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-sm text-stone-300 uppercase tracking-wider font-bold">
                                🎁 Bottino di Sopravvivenza: Scegli 1 carta da aggiungere al tuo Mazzo della Run
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-5">
                                {rewardChoices.map((rewardCard) => (
                                    <div key={rewardCard.id} className="flex flex-col items-center gap-2">
                                        <Card
                                            card={rewardCard}
                                            isPlayable={true}
                                            playedCard={() => onCompleteVictory(playerHp, rewardCard)}
                                        />
                                        <button
                                            onClick={() => onCompleteVictory(playerHp, rewardCard)}
                                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold text-xs uppercase tracking-wider cursor-pointer transition"
                                        >
                                            + Prendi {rewardCard.name}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => onCompleteVictory(Math.min(character.hp, playerHp + 5), null)}
                                className="mt-1 px-5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-bold uppercase tracking-wider cursor-pointer transition"
                            >
                                🩹 Salta Carta e Fascia le Ferite (+5 HP e Prosegui sulla Mappa)
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleRestartBattle}
                                className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider transition cursor-pointer"
                            >
                                🔄 Riprova Scontro
                            </button>
                            {onReturnToMap && (
                                <button
                                    onClick={onReturnToMap}
                                    className="px-6 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold uppercase tracking-wider border border-stone-600 transition cursor-pointer"
                                >
                                    🗺️ Torna alla Mappa
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
            {/* === FINE SEZIONE: Banner Vittoria con Draft Ricompensa 1-su-3 o Sconfitta === */}

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
