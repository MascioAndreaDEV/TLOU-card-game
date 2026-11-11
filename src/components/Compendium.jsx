// === INIZIO SEZIONE: Import Dati e Componenti Compendium ===
import { useState } from "react";
import { CARD_DATABASE } from "../data/cards";
import { CHARACTERS_DATABASE } from "../data/Characters";
import { ENEMIES_DATABASE } from "../data/enemies";
import Card from "./card";
// === FINE SEZIONE: Import Dati e Componenti Compendium ===

// === INIZIO SEZIONE: Mappe Etichette e Colori Rarità ===
const TIER_STYLES = {
    starter: {
        label: "Starter Deck",
        badgeClass: "bg-stone-800 text-stone-300 border-stone-600",
    },
    common: {
        label: "Comune",
        badgeClass: "bg-emerald-950/90 text-emerald-300 border-emerald-600/60",
    },
    uncommon: {
        label: "Non Comune",
        badgeClass: "bg-sky-950/90 text-sky-300 border-sky-500/60",
    },
    rare: {
        label: "Rara",
        badgeClass: "bg-amber-950/90 text-amber-300 border-amber-500/80",
    },
};

const TYPE_FILTERS = [
    { id: "all", label: "Tutte" },
    { id: "weapon", label: "🗡️ Armi" },
    { id: "attack", label: "👊 Attacco" },
    { id: "defense", label: "🛡️ Difesa" },
    { id: "action", label: "⚡ Azione" },
    { id: "utility", label: "🧰 Utility" },
    { id: "ammo", label: "🔫 Munizioni" },
];

const TIER_FILTERS = [
    { id: "all", label: "Tutte le Rarità" },
    { id: "starter", label: "Starter" },
    { id: "common", label: "Comuni" },
    { id: "uncommon", label: "Non Comuni" },
    { id: "rare", label: "Rare" },
];
// === FINE SEZIONE: Mappe Etichette e Colori Rarità ===

// === INIZIO SEZIONE: Componente Principale Compendium ===
export default function Compendium() {
    // === INIZIO SEZIONE: Stati Filtri e Tab Compendium ===
    const [activeTab, setActiveTab] = useState("cards");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedTier, setSelectedTier] = useState("all");
    const [onlyCraftable, setOnlyCraftable] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // === FINE SEZIONE: Stati Filtri e Tab Compendium ===

    // === INIZIO SEZIONE: Logica di Filtraggio Carte ===
    const filteredCards = CARD_DATABASE.filter((card) => {
        const matchesType = selectedType === "all" || card.cardType === selectedType;
        const matchesTier = selectedTier === "all" || card.tier === selectedTier;
        const matchesCraft = !onlyCraftable || (Array.isArray(card.recipe) && card.recipe.length > 0);
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
            !query ||
            card.name.toLowerCase().includes(query) ||
            card.id.toLowerCase().includes(query) ||
            (card.ammoType && card.ammoType.toLowerCase().includes(query));

        return matchesType && matchesTier && matchesCraft && matchesSearch;
    });
    // === FINE SEZIONE: Logica di Filtraggio Carte ===

    return (
        <section className="font-barlow w-full max-w-7xl mx-auto px-4 py-6 flex-1 flex flex-col gap-6">
            {/* === INIZIO SEZIONE: Header e Selettore Sezioni Compendio === */}
            <div className="rounded-2xl bg-stone-950/90 border border-stone-800 p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-amber-400">
                        📖 Compendio & Workbench
                    </h2>
                    <p className="text-stone-400 text-sm">
                        Consulta l&apos;arsenale completo, le ricette di Crafting, i Sopravvissuti e le mosse delle minacce.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setActiveTab("cards")}
                        className={`px-4 py-2 rounded-xl font-bold uppercase text-sm tracking-wider border transition cursor-pointer ${
                            activeTab === "cards"
                                ? "bg-amber-600 text-stone-950 border-amber-400"
                                : "bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500/60"
                        }`}
                    >
                        🃏 Carte ({CARD_DATABASE.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("survivors")}
                        className={`px-4 py-2 rounded-xl font-bold uppercase text-sm tracking-wider border transition cursor-pointer ${
                            activeTab === "survivors"
                                ? "bg-amber-600 text-stone-950 border-amber-400"
                                : "bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500/60"
                        }`}
                    >
                        🧍 Sopravvissuti ({CHARACTERS_DATABASE.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("enemies")}
                        className={`px-4 py-2 rounded-xl font-bold uppercase text-sm tracking-wider border transition cursor-pointer ${
                            activeTab === "enemies"
                                ? "bg-amber-600 text-stone-950 border-amber-400"
                                : "bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500/60"
                        }`}
                    >
                        🧟‍♂️ Minacce ({ENEMIES_DATABASE.length})
                    </button>
                </div>
            </div>
            {/* === FINE SEZIONE: Header e Selettore Sezioni Compendio === */}

            {/* === INIZIO SEZIONE: Sezione 1 — Arsenale Carte e Filtri === */}
            {activeTab === "cards" && (
                <>
                    {/* === INIZIO SEZIONE: Barra Controlli Ricerca e Filtri Carte === */}
                    <div className="rounded-2xl bg-stone-950/85 border border-stone-800 p-4 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="🔍 Cerca carta per nome o calibro (.9, .12, .357, .308)..."
                                className="w-full md:w-80 px-4 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 text-sm"
                            />

                            <div className="flex flex-wrap items-center gap-2">
                                {TIER_FILTERS.map((tier) => (
                                    <button
                                        key={tier.id}
                                        onClick={() => setSelectedTier(tier.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition cursor-pointer ${
                                            selectedTier === tier.id
                                                ? "bg-amber-500 text-stone-950 border-amber-300"
                                                : "bg-stone-900 text-stone-400 border-stone-700 hover:text-stone-200"
                                        }`}
                                    >
                                        {tier.label}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setOnlyCraftable((prev) => !prev)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition cursor-pointer ${
                                        onlyCraftable
                                            ? "bg-emerald-600 text-stone-950 border-emerald-300"
                                            : "bg-stone-900 text-emerald-400 border-emerald-800 hover:border-emerald-500"
                                    }`}
                                >
                                    🛠️ Solo Craftabili
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800/80">
                            <div className="flex flex-wrap items-center gap-2">
                                {TYPE_FILTERS.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedType(type.id)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition cursor-pointer ${
                                            selectedType === type.id
                                                ? "bg-stone-200 text-stone-950 border-white"
                                                : "bg-stone-900/90 text-stone-400 border-stone-800 hover:border-stone-600"
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            <span className="text-xs uppercase tracking-wider text-stone-400 font-bold">
                                Mostrate: <strong className="text-amber-400">{filteredCards.length}</strong> / {CARD_DATABASE.length}
                            </span>
                        </div>
                    </div>
                    {/* === FINE SEZIONE: Barra Controlli Ricerca e Filtri Carte === */}

                    {/* === INIZIO SEZIONE: Griglia Carte Filtrate === */}
                    <div className="compendium flex justify-center gap-6 py-2 flex-wrap">
                        {filteredCards.map((card) => {
                            const tierInfo = TIER_STYLES[card.tier] || TIER_STYLES.common;
                            return (
                                <div key={card.id} className="flex flex-col items-center gap-1.5">
                                    <div className="w-full flex items-center justify-between px-1">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${tierInfo.badgeClass}`}
                                        >
                                            {tierInfo.label}
                                        </span>
                                        {card.recipe && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-600/60">
                                                🛠️ {card.recipe.join(" + ")}
                                            </span>
                                        )}
                                    </div>
                                    <Card card={card} />
                                </div>
                            );
                        })}
                    </div>
                    {/* === FINE SEZIONE: Griglia Carte Filtrate === */}
                </>
            )}
            {/* === FINE SEZIONE: Sezione 1 — Arsenale Carte e Filtri === */}

            {/* === INIZIO SEZIONE: Sezione 2 — Schede Sopravvissuti === */}
            {activeTab === "survivors" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CHARACTERS_DATABASE.map((survivor) => (
                        <div
                            key={survivor.id}
                            className="rounded-2xl bg-stone-950/90 border border-stone-800 hover:border-amber-500/60 overflow-hidden shadow-xl flex flex-col transition"
                        >
                            <div className="h-64 w-full overflow-hidden bg-stone-900 relative">
                                <img
                                    src={survivor.image}
                                    alt={survivor.name}
                                    className="w-full h-full object-cover object-top"
                                />
                                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/70 text-emerald-300 font-extrabold text-sm">
                                    ❤️ {survivor.hp} HP Max
                                </span>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-extrabold uppercase tracking-wider text-stone-100">
                                        {survivor.name}
                                    </h3>
                                    <p className="text-xs uppercase tracking-widest text-amber-400">
                                        Sopravvissuto Giocabile
                                    </p>
                                </div>
                                <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs font-bold text-stone-300">
                                    3 Stamina / Turno
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* === FINE SEZIONE: Sezione 2 — Schede Sopravvissuti === */}

            {/* === INIZIO SEZIONE: Sezione 3 — Bestiario Minacce e Pattern Mosse === */}
            {activeTab === "enemies" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ENEMIES_DATABASE.map((enemy) => {
                        const isInfected = enemy.type === "infected";
                        return (
                            <div
                                key={enemy.id}
                                className="rounded-2xl bg-stone-950/90 border border-stone-800 hover:border-rose-600/60 overflow-hidden shadow-xl flex flex-col justify-between transition"
                            >
                                <div>
                                    <div className="h-56 w-full overflow-hidden bg-stone-900 relative">
                                        <img
                                            src={enemy.image}
                                            alt={enemy.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <span
                                            className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                                isInfected
                                                    ? "bg-amber-950/90 text-amber-300 border-amber-500/70"
                                                    : "bg-sky-950/90 text-sky-300 border-sky-500/70"
                                            }`}
                                        >
                                            {isInfected ? "🍄 Infetto Cordyceps" : "🔫 Ostile Umano / WLF"}
                                        </span>
                                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-rose-950/95 border border-rose-500 text-rose-300 font-extrabold text-sm">
                                            💀 {enemy.hp} HP
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-xl font-extrabold uppercase tracking-wider text-stone-100 mb-3">
                                            {enemy.name}
                                        </h3>

                                        <div className="space-y-2">
                                            <div className="text-xs uppercase tracking-wider text-stone-400 font-bold">
                                                Pattern Mosse Telegrafate:
                                            </div>
                                            {enemy.moves.map((move) => (
                                                <div
                                                    key={move.id}
                                                    className="px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-800 flex items-center justify-between text-xs"
                                                >
                                                    <span className="font-bold uppercase text-stone-200">
                                                        {move.name}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        {move.damage > 0 && (
                                                            <span className="text-rose-400 font-bold">
                                                                ⚔️ {move.damage}
                                                            </span>
                                                        )}
                                                        {move.shield > 0 && (
                                                            <span className="text-sky-400 font-bold">
                                                                🛡️ +{move.shield}
                                                            </span>
                                                        )}
                                                        {Array.isArray(move.effects) &&
                                                            move.effects.map((eff, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-1.5 py-0.5 rounded bg-stone-950 text-amber-300 font-bold"
                                                                >
                                                                    {eff.isBleeding && `🩸 Bleed ${eff.damageBleeding}x${eff.duration}t`}
                                                                    {eff.isPoisoned && `☣️ Poison ${eff.damagePoison}x${eff.duration}t`}
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* === FINE SEZIONE: Sezione 3 — Bestiario Minacce e Pattern Mosse === */}
        </section>
    );
}
// === FINE SEZIONE: Componente Principale Compendium ===
