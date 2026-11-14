// === INIZIO SEZIONE: Import Dipendenze, Motion e Moduli Arena ===
import { AnimatePresence, motion } from 'motion/react';
import { CHARACTERS_DATABASE } from '../data/Characters';
import { ENEMIES_DATABASE } from '../data/enemies';
import { CARD_DATABASE } from '../data/cards';
import bgQuarantine from '../assets/bg_images/1301851.jpg';
import bgSeattleRuins from '../assets/bg_images/thumb-1920-743467.jpg';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';
import EnemiesCard from './CharactersCards/EnemiesCard';
import Card from './card';
import { useCombatEngine } from '../hooks/useCombatEngine';
// === FINE SEZIONE: Import Dipendenze, Motion e Moduli Arena ===

// === INIZIO SEZIONE: Blueprint Entità Fallback Default ===
const defaultEnemy = ENEMIES_DATABASE[0];
const defaultCharacter = CHARACTERS_DATABASE[0];
// === FINE SEZIONE: Blueprint Entità Fallback Default ===

// === INIZIO SEZIONE: Selettore Bioma / Sfondo Dinamico in base al Nemico ===
function getArenaBiome(enemy) {
    const id = enemy?.id || 'runner';

    if (id === 'bloater' || id === 'shambler' || id === 'seraphite_brute') {
        return {
            name: 'Settore Rosso — Allerta Massima',
            bgImage: bgSeattleRuins,
            overlayClass:
                'bg-[radial-gradient(circle_at_center,rgba(127,29,29,0.28)_0%,rgba(12,10,9,0.92)_90%)] border-rose-800/70',
            badgeClass: 'bg-rose-950/90 text-rose-300 border-rose-500/70',
        };
    }

    if (enemy?.type === 'human') {
        return {
            name: 'Rovine Piovose di Seattle — Pattuglia WLF',
            bgImage: bgSeattleRuins,
            overlayClass:
                'bg-[radial-gradient(circle_at_center,rgba(12,74,110,0.28)_0%,rgba(12,10,9,0.9)_90%)] border-sky-800/70',
            badgeClass: 'bg-sky-950/90 text-sky-300 border-sky-500/70',
        };
    }

    return {
        name: 'Galleria Infetta — Zona Spore Cordyceps',
        bgImage: bgQuarantine,
        overlayClass:
            'bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.28)_0%,rgba(12,10,9,0.9)_90%)] border-emerald-800/70',
        badgeClass: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/70',
    };
}
// === FINE SEZIONE: Selettore Bioma / Sfondo Dinamico in base al Nemico ===

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
        floatingTexts,
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

    const biome = getArenaBiome(enemy);

    return (
        <div
            style={{ backgroundImage: `url(${biome.bgImage})` }}
            className="arena-container flex-1 flex flex-col items-center justify-between rounded-2xl m-2 w-full max-w-7xl bg-cover bg-center relative overflow-hidden border border-stone-800 shadow-2xl p-4"
        >
            {/* === INIZIO SEZIONE: Overlay Atmosferico Dinamico & Badge Ambientazione === */}
            <div className={`absolute inset-0 pointer-events-none ${biome.overlayClass}`} />

            <div className="relative z-20 w-full flex items-center justify-between px-2 mb-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${biome.badgeClass}`}>
                    📍 {biome.name}
                </span>
                {onReturnToMap && (
                    <button
                        onClick={onReturnToMap}
                        className="px-3 py-1 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-amber-300 text-xs font-bold uppercase tracking-wider border border-stone-700 cursor-pointer transition"
                    >
                        🗺️ Mappa Spedizione
                    </button>
                )}
            </div>
            {/* === FINE SEZIONE: Overlay Atmosferico Dinamico & Badge Ambientazione === */}

            {/* === INIZIO SEZIONE: Floating Combat Text (Danni, Cure, Scudi, Stun) === */}
            <div className="pointer-events-none fixed inset-x-0 top-1/3 flex flex-col items-center gap-1 z-50">
                <AnimatePresence>
                    {floatingTexts.map((ft) => (
                        <motion.div
                            key={ft.id}
                            initial={{ opacity: 0, y: 16, scale: 0.8 }}
                            animate={{ opacity: 1, y: -24, scale: 1.1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                            transition={{ duration: 0.55 }}
                            className={`font-barlow px-4 py-1 rounded-full bg-stone-950/90 border border-stone-700 font-extrabold text-xl uppercase tracking-wider shadow-xl ${ft.colorClass}`}
                        >
                            {ft.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {/* === FINE SEZIONE: Floating Combat Text (Danni, Cure, Scudi, Stun) === */}

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
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-barlow flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-stone-950/95 border-2 border-amber-500 shadow-2xl z-50 max-w-5xl"
                >
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
                </motion.div>
            )}
            {/* === FINE SEZIONE: Banner Vittoria con Draft Ricompensa 1-su-3 o Sconfitta === */}

            {/* === INIZIO SEZIONE: HUD Giocatore === */}
            <PlayerHUD
                characterName={character.name}
                characterImage={character.image}
                characterPassive={character.passive}
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
                <div className="font-barlow flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-stone-950/90 border border-amber-500/80 shadow-lg z-20">
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
            <div className="w-full flex items-center justify-between px-6 z-20">
                <div className="font-barlow flex flex-col items-center px-4 py-2 rounded-xl bg-stone-950/90 border border-amber-600/60 text-amber-300 shadow-lg">
                    <span className="text-xs uppercase text-stone-400 font-bold">Mazzo Pesca</span>
                    <span className="text-2xl font-extrabold">{drawPile.length}</span>
                </div>

                <PlayerHand
                    hand={hand}
                    playedCard={handlePlayCard}
                    playerStamina={stamina}
                    ammoReserve={ammoReserve}
                />

                <div className="font-barlow flex flex-col items-center px-4 py-2 rounded-xl bg-stone-950/90 border border-zinc-700 text-stone-300 shadow-lg">
                    <span className="text-xs uppercase text-stone-400 font-bold">Pila Scarti</span>
                    <span className="text-2xl font-extrabold">{discardPile.length}</span>
                </div>
            </div>
            {/* === FINE SEZIONE: Contatori Mazzo di Pesca, Mano a Ventaglio e Scarti === */}

            {/* === INIZIO SEZIONE: Controllo Fine Turno === */}
            <button
                className="relative z-20 border-2 border-amber-400/80 px-10 rounded-xl bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-2.5 tracking-widest uppercase cursor-pointer transition shadow-[0_0_20px_rgba(225,29,72,0.45)]"
                onClick={handleEndTurn}
                disabled={isBattleOver}
            >
                ⏭️ FINE TURNO
            </button>
            {/* === FINE SEZIONE: Controllo Fine Turno === */}

        </div>
    );
}
// === FINE SEZIONE: Componente Principale Arena ===
