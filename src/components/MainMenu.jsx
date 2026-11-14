// === INIZIO SEZIONE: Import Dati e Motion MainMenu ===
import { motion } from "motion/react";
import { CARD_DATABASE } from "../data/cards";
import { CHARACTERS_DATABASE } from "../data/Characters";
import { ENEMIES_DATABASE } from "../data/enemies";
// === FINE SEZIONE: Import Dati e Motion MainMenu ===

// === INIZIO SEZIONE: Configurazione Particelle Spore Fluttuanti ===
const SPORE_PARTICLES = [
    { left: "12%", bottom: "10%", size: 6, delay: "0s" },
    { left: "24%", bottom: "18%", size: 4, delay: "1.4s" },
    { left: "38%", bottom: "8%", size: 7, delay: "2.6s" },
    { left: "54%", bottom: "15%", size: 5, delay: "0.8s" },
    { left: "69%", bottom: "12%", size: 6, delay: "3.1s" },
    { left: "83%", bottom: "20%", size: 5, delay: "1.9s" },
    { left: "91%", bottom: "9%", size: 4, delay: "4.0s" },
];
// === FINE SEZIONE: Configurazione Particelle Spore Fluttuanti ===

// === INIZIO SEZIONE: Componente Principale MainMenu ===
export default function MainMenu({
    runState,
    hasActiveBattle,
    onStartNewBattle,
    onResumeBattle,
    onOpenCompendium,
}) {
    // === INIZIO SEZIONE: Calcolo Statistiche Database ===
    const totalCards = CARD_DATABASE.length;
    const signatureCount = CARD_DATABASE.filter((c) => c.tier === "signature").length;
    const craftableCount = CARD_DATABASE.filter((card) => Array.isArray(card.recipe) && card.recipe.length > 0).length;
    const totalSurvivors = CHARACTERS_DATABASE.length;
    const totalEnemies = ENEMIES_DATABASE.length;
    const activeSurvivor = runState?.survivor;
    const currentFloor = (runState?.visitedNodeIds?.length || 0) + 1;
    // === FINE SEZIONE: Calcolo Statistiche Database ===

    return (
        <main className="font-barlow flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 py-8 relative">
            {/* === INIZIO SEZIONE: Hero Panel Principale con Spore Fluttuanti === */}
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full rounded-3xl bg-stone-950/92 border-2 border-stone-800 shadow-[0_0_60px_rgba(0,0,0,0.9)] p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden"
            >
                {/* Particelle Spore Animate in CSS */}
                {SPORE_PARTICLES.map((sp, idx) => (
                    <span
                        key={idx}
                        style={{
                            left: sp.left,
                            bottom: sp.bottom,
                            width: `${sp.size}px`,
                            height: `${sp.size}px`,
                            animationDelay: sp.delay,
                        }}
                        className="spore-particle absolute rounded-full bg-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    />
                ))}

                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/40 mb-4 z-10">
                    Zona di Quarantena — Roguelike Deckbuilder Tattico
                </span>

                <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wider text-stone-100 drop-shadow-md z-10">
                    Sopravvivi all&apos;Infezione
                </h2>

                <p className="mt-3 max-w-2xl text-stone-400 text-base md:text-lg leading-relaxed z-10">
                    Scegli uno dei 6 Sopravvissuti con le sue Carte Signature esclusive, traccia il tuo percorso lungo i 7 piani della Zona di Quarantena e assembla armi di fortuna in tempo reale.
                </p>

                {/* === INIZIO SEZIONE: Card Riepilogativa della Spedizione in Corso === */}
                {activeSurvivor && (
                    <div className="mt-6 w-full max-w-xl rounded-2xl bg-stone-900/95 border-2 border-emerald-600/70 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl z-10">
                        <div className="flex items-center gap-3 text-left">
                            <img
                                src={activeSurvivor.image}
                                alt={activeSurvivor.name}
                                className="w-14 h-14 rounded-xl object-cover object-top border-2 border-emerald-400"
                            />
                            <div>
                                <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                                    Spedizione in Corso • Piano {Math.min(7, currentFloor)} / 7
                                </div>
                                <div className="text-xl font-extrabold uppercase text-stone-100">
                                    {activeSurvivor.name}
                                </div>
                                <div className="text-xs text-stone-300 font-bold">
                                    ❤️ {runState.currentHp} / {activeSurvivor.hp} HP • 🎒 {runState.deck.length} Carte
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onResumeBattle}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold text-sm uppercase tracking-wider cursor-pointer transition shadow-lg"
                        >
                            ▶️ Riprendi Spedizione
                        </button>
                    </div>
                )}
                {/* === FINE SEZIONE: Card Riepilogativa della Spedizione in Corso === */}

                {/* === INIZIO SEZIONE: Azioni Menu Principale === */}
                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg z-10">
                    <button
                        onClick={onStartNewBattle}
                        className="w-full sm:w-auto flex-1 px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] transition cursor-pointer"
                    >
                        ⚔️ {hasActiveBattle ? "Nuova Spedizione" : "Inizia Spedizione"}
                    </button>

                    <button
                        onClick={onOpenCompendium}
                        className="w-full sm:w-auto flex-1 px-7 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-400 font-bold text-lg uppercase tracking-wider border border-stone-700 hover:border-amber-500/60 transition cursor-pointer"
                    >
                        📖 Compendio ({totalCards})
                    </button>
                </div>
                {/* === FINE SEZIONE: Azioni Menu Principale === */}

                {/* === INIZIO SEZIONE: Statistiche Rapide Arsenale === */}
                <div className="mt-9 pt-6 border-t border-stone-800/90 grid grid-cols-2 sm:grid-cols-5 gap-3 w-full z-10">
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-amber-400">{totalCards}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Carte Totali</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-rose-400">{signatureCount}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Carte Signature</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-emerald-400">{craftableCount}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Ricette Crafting</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-sky-400">{totalSurvivors}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Sopravvissuti</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 col-span-2 sm:col-span-1">
                        <div className="text-2xl font-extrabold text-red-500">{totalEnemies}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Minacce</div>
                    </div>
                </div>
                {/* === FINE SEZIONE: Statistiche Rapide Arsenale === */}
            </motion.div>
            {/* === FINE SEZIONE: Hero Panel Principale con Spore Fluttuanti === */}
        </main>
    );
}
// === FINE SEZIONE: Componente Principale MainMenu ===
