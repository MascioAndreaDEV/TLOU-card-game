// === INIZIO SEZIONE: Componente AppHeader con Navigazione Viste ===
export default function AppHeader({ currentView, onNavigate }) {
    // === INIZIO SEZIONE: Configurazione Voci Navbar ===
    const navItems = [
        { id: "menu", label: "🏠 Menu" },
        { id: "map", label: "🗺️ Mappa Run" },
        { id: "arena", label: "⚔️ Arena" },
        { id: "compendium", label: "📖 Compendio" },
    ];
    // === FINE SEZIONE: Configurazione Voci Navbar ===

    return (
        <header className="font-barlow w-full max-w-6xl mx-auto mt-3 px-6 py-3 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-stone-950/90 border border-stone-800 shadow-lg z-40">
            {/* === INIZIO SEZIONE: Titolo / Logo Interattivo === */}
            <h1
                onClick={() => onNavigate("menu")}
                className="font-bold text-2xl md:text-3xl tracking-wider uppercase text-amber-500 cursor-pointer select-none"
            >
                TLOU: <span className="text-stone-200">Survival Card Battler</span>
            </h1>
            {/* === FINE SEZIONE: Titolo / Logo Interattivo === */}

            {/* === INIZIO SEZIONE: Pulsanti Navigazione Viste === */}
            <nav className="flex flex-wrap items-center gap-2">
                {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider transition cursor-pointer border ${
                                isActive
                                    ? "bg-amber-600 text-stone-950 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                                    : "bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500/60 hover:text-amber-400"
                            }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            {/* === FINE SEZIONE: Pulsanti Navigazione Viste === */}
        </header>
    );
}
// === FINE SEZIONE: Componente AppHeader con Navigazione Viste ===
