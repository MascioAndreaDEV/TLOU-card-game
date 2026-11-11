// === INIZIO SEZIONE: Import Dati e Icone MainMenu ===
import { CARD_DATABASE } from "../data/cards";
import { CHARACTERS_DATABASE } from "../data/Characters";
import { ENEMIES_DATABASE } from "../data/enemies";
// === FINE SEZIONE: Import Dati e Icone MainMenu ===

// === INIZIO SEZIONE: Componente Principale MainMenu ===
export default function MainMenu({ hasActiveBattle, onStartNewBattle, onResumeBattle, onOpenCompendium }) {
    // === INIZIO SEZIONE: Calcolo Statistiche Database ===
    const totalCards = CARD_DATABASE.length;
    const craftableCount = CARD_DATABASE.filter((card) => Array.isArray(card.recipe) && card.recipe.length > 0).length;
    const totalSurvivors = CHARACTERS_DATABASE.length;
    const totalEnemies = ENEMIES_DATABASE.length;
    // === FINE SEZIONE: Calcolo Statistiche Database ===

    return (
        <main className="font-barlow flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 py-8">
            {/* === INIZIO SEZIONE: Hero Panel Principale === */}
            <div className="w-full rounded-2xl bg-stone-950/90 border-2 border-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.85)] p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/40 mb-4">
                    Zona di Quarantena — Roguelike Deckbuilder Tattico
                </span>

                <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wider text-stone-100 drop-shadow-md">
                    Sopravvivi all&apos;Infezione
                </h2>

                <p className="mt-3 max-w-xl text-stone-400 text-base md:text-lg leading-relaxed">
                    Gestisci Stamina, munizioni contate e usura delle armi. Combina materiali di fortuna in tempo reale per creare ordigni e kit medici prima che gli Infetti ti sopraffacciano.
                </p>

                {/* === INIZIO SEZIONE: Azioni Menu Principale === */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
                    <button
                        onClick={onStartNewBattle}
                        className="w-full sm:w-auto flex-1 px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] transition cursor-pointer"
                    >
                        ⚔️ Nuova Partita
                    </button>

                    {hasActiveBattle && (
                        <button
                            onClick={onResumeBattle}
                            className="w-full sm:w-auto flex-1 px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-stone-100 font-extrabold text-lg uppercase tracking-wider border border-emerald-400/50 shadow-lg transition cursor-pointer"
                        >
                            ▶️ Riprendi Scontro
                        </button>
                    )}

                    <button
                        onClick={onOpenCompendium}
                        className="w-full sm:w-auto flex-1 px-7 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-400 font-bold text-lg uppercase tracking-wider border border-stone-700 hover:border-amber-500/60 transition cursor-pointer"
                    >
                        📖 Compendio ({totalCards})
                    </button>
                </div>
                {/* === FINE SEZIONE: Azioni Menu Principale === */}

                {/* === INIZIO SEZIONE: Statistiche Rapide Arsenale === */}
                <div className="mt-10 pt-6 border-t border-stone-800/90 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-amber-400">{totalCards}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Carte Totali</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-emerald-400">{craftableCount}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Ricette Crafting</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-sky-400">{totalSurvivors}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Sopravvissuti</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                        <div className="text-2xl font-extrabold text-rose-500">{totalEnemies}</div>
                        <div className="text-xs uppercase tracking-wider text-stone-400">Minacce Infette</div>
                    </div>
                </div>
                {/* === FINE SEZIONE: Statistiche Rapide Arsenale === */}
            </div>
            {/* === FINE SEZIONE: Hero Panel Principale === */}
        </main>
    );
}
// === FINE SEZIONE: Componente Principale MainMenu ===

