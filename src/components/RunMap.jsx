// === INIZIO SEZIONE: Import Dati, Motion e Componenti RunMap ===
import { useState } from "react";
import { motion } from "motion/react";
import { CHARACTERS_DATABASE } from "../data/Characters";
import { CARD_DATABASE } from "../data/cards";
import Card from "./card";
// === FINE SEZIONE: Import Dati, Motion e Componenti RunMap ===

// === INIZIO SEZIONE: Helper Coordinate SVG per il Grafo a 7 Piani (Slay the Spire) ===
function getNodePercentCoords(col, row) {
    const x = 7 + (col / 6) * 86;
    const y = 18 + (row / 2) * 64;
    return { x, y };
}

const NODE_TYPE_BADGES = {
    combat: { icon: "⚔️", label: "Scontro", color: "text-amber-300 border-amber-500/70 bg-amber-950/90" },
    elite: { icon: "💀", label: "Elite", color: "text-rose-300 border-rose-500/80 bg-rose-950/90" },
    rest: { icon: "🏕️", label: "Rifugio", color: "text-emerald-300 border-emerald-500/70 bg-emerald-950/90" },
    scavenge: { icon: "📦", label: "Scavenging", color: "text-sky-300 border-sky-500/70 bg-sky-950/90" },
    mystery: { icon: "❓", label: "Evento", color: "text-purple-300 border-purple-500/70 bg-purple-950/90" },
    boss: { icon: "☣️", label: "BOSS", color: "text-red-200 border-red-500 bg-red-950" },
};
// === FINE SEZIONE: Helper Coordinate SVG per il Grafo a 7 Piani (Slay the Spire) ===

// === INIZIO SEZIONE: Componente Principale RunMap ===
export default function RunMap({
    runState,
    onSelectSurvivor,
    onSelectMapNode,
    onResolveEventChoice,
    onStartNewRun,
}) {
    const [showDeckModal, setShowDeckModal] = useState(false);

    // === INIZIO SEZIONE: Schermata Selezione Sopravvissuto con Anteprima Signature & Passiva ===
    if (!runState.survivor) {
        return (
            <section className="font-barlow w-full max-w-7xl mx-auto px-4 py-6 flex-1 flex flex-col items-center justify-center gap-6">
                <div className="text-center max-w-2xl">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/40">
                        Nuova Spedizione — Scegli il tuo Eroe
                    </span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-stone-100">
                        Seleziona il Sopravvissuto
                    </h2>
                    <p className="mt-2 text-stone-400 text-sm md:text-base">
                        Ogni sopravvissuto possiede un <strong>Tratto Passivo Lore</strong>, 2 copie della sua <strong>Carta Signature Iniziale</strong> nello Starter Deck e una <strong>Reliquia Signature Esclusiva</strong> sbloccabile lungo la mappa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {CHARACTERS_DATABASE.map((char) => {
                        const starterSig = CARD_DATABASE.find((c) => c.id === char.starterSignatureId);
                        const relicSig = CARD_DATABASE.find((c) => c.id === char.unlockableSignatureId);

                        return (
                            <motion.div
                                key={char.id}
                                whileHover={{ y: -5 }}
                                onClick={() => onSelectSurvivor(char)}
                                className="group rounded-2xl bg-stone-950/95 border-2 border-stone-800 hover:border-amber-500 overflow-hidden shadow-2xl flex flex-col justify-between cursor-pointer transition-colors"
                            >
                                <div>
                                    <div className="h-52 w-full overflow-hidden bg-stone-900 relative">
                                        <img
                                            src={char.image}
                                            alt={char.name}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 font-extrabold text-sm">
                                            ❤️ {char.hp} HP
                                        </span>
                                        <div className="absolute bottom-2 left-3 right-3">
                                            <h3 className="text-2xl font-extrabold uppercase tracking-wider text-stone-100 group-hover:text-amber-400 transition">
                                                {char.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-2.5">
                                        {char.passive && (
                                            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-600/40">
                                                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                                                    ★ Passiva: {char.passive.name}
                                                </div>
                                                <div className="text-xs text-stone-300 mt-0.5">
                                                    {char.passive.description}
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            {starterSig && (
                                                <div className="p-2 rounded-lg bg-stone-900 border border-rose-500/40">
                                                    <div className="text-[10px] uppercase text-rose-400 font-bold">
                                                        Starter Signature (x2)
                                                    </div>
                                                    <div className="font-bold text-stone-100 truncate">
                                                        {starterSig.name}
                                                    </div>
                                                </div>
                                            )}
                                            {relicSig && (
                                                <div className="p-2 rounded-lg bg-stone-900 border border-amber-500/40">
                                                    <div className="text-[10px] uppercase text-amber-400 font-bold">
                                                        Reliquia Sbloccabile
                                                    </div>
                                                    <div className="font-bold text-stone-100 truncate">
                                                        {relicSig.name}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 pb-4">
                                    <button className="w-full py-2.5 rounded-xl bg-amber-600 group-hover:bg-amber-500 text-stone-950 font-extrabold text-sm uppercase tracking-wider cursor-pointer transition">
                                        Inizia Spedizione con {char.name} →
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        );
    }
    // === FINE SEZIONE: Schermata Selezione Sopravvissuto con Anteprima Signature & Passiva ===

    const {
        survivor,
        currentHp,
        deck,
        nodes,
        visitedNodeIds,
        availableNodeIds,
        activeEventNode,
        isRunCompleted,
    } = runState;

    const hpPercent = Math.max(0, Math.min(100, Math.round((currentHp / survivor.hp) * 100)));
    const heroRelicCard = CARD_DATABASE.find((c) => c.id === survivor.unlockableSignatureId);
    const alreadyHasRelic = heroRelicCard && deck.some((c) => c.id === heroRelicCard.id);

    return (
        <section className="font-barlow w-full max-w-7xl mx-auto px-4 py-5 flex-1 flex flex-col gap-5">
            {/* === INIZIO SEZIONE: Barra HUD Stato Run (Sopravvissuto, Passiva, HP, Mazzo) === */}
            <div className="rounded-2xl bg-stone-950/95 border border-stone-800 p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={survivor.image}
                        alt={survivor.name}
                        className="w-14 h-14 rounded-xl object-cover object-top border-2 border-amber-500"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-extrabold uppercase text-stone-100">
                                {survivor.name}
                            </h2>
                            {survivor.passive && (
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/60 text-amber-300 text-xs font-bold">
                                    ★ {survivor.passive.name}
                                </span>
                            )}
                        </div>
                        <div className="mt-1.5 flex items-center gap-3">
                            <div className="w-40 h-3.5 rounded-full bg-stone-900 overflow-hidden border border-stone-700">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-300"
                                    style={{ width: `${hpPercent}%` }}
                                />
                            </div>
                            <span className="text-xs font-extrabold text-emerald-400">
                                ❤️ {currentHp} / {survivor.hp} HP
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold uppercase text-stone-300">
                        📍 Piano {visitedNodeIds.length + (isRunCompleted ? 0 : 1)} / 7
                    </span>

                    <button
                        onClick={() => setShowDeckModal((prev) => !prev)}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/60 text-amber-300 font-bold text-sm uppercase tracking-wider cursor-pointer transition"
                    >
                        🎒 Zaino Carte ({deck.length})
                    </button>

                    <button
                        onClick={onStartNewRun}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-rose-950 border border-stone-700 hover:border-rose-500/70 text-stone-300 hover:text-rose-300 font-bold text-sm uppercase tracking-wider cursor-pointer transition"
                    >
                        🔄 Nuova Run
                    </button>
                </div>
            </div>
            {/* === FINE SEZIONE: Barra HUD Stato Run (Sopravvissuto, Passiva, HP, Mazzo) === */}

            {/* === INIZIO SEZIONE: Modale Ispezione Zaino Carte === */}
            {showDeckModal && (
                <div className="rounded-2xl bg-stone-950/95 border-2 border-amber-500/70 p-5 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-extrabold uppercase tracking-wider text-amber-400">
                            🎒 Carte nel tuo Zaino ({deck.length})
                        </h3>
                        <button
                            onClick={() => setShowDeckModal(false)}
                            className="px-3 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-bold uppercase cursor-pointer"
                        >
                            Chiudi ✕
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 max-h-96 overflow-y-auto p-2">
                        {deck.map((card, idx) => (
                            <Card key={`${card.id}_${idx}`} card={card} isPlayable={true} />
                        ))}
                    </div>
                </div>
            )}
            {/* === FINE SEZIONE: Modale Ispezione Zaino Carte === */}

            {/* === INIZIO SEZIONE: Modale Interattivo Nodo Evento / Rifugio / Scavenging === */}
            {activeEventNode && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-stone-950/95 border-2 border-amber-500 p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="space-y-2 max-w-xl">
                        <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/50">
                            {NODE_TYPE_BADGES[activeEventNode.type]?.icon} Tappa Tattica — {activeEventNode.title}
                        </span>
                        <h3 className="text-2xl font-extrabold uppercase tracking-wider text-stone-100">
                            Scegli come procedere
                        </h3>
                        <p className="text-sm text-stone-300">
                            {activeEventNode.description}
                        </p>

                        <div className="pt-3 flex flex-wrap gap-3">
                            <button
                                onClick={() => onResolveEventChoice("heal")}
                                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer transition shadow"
                            >
                                🏕️ Riposa e Cura (+25 HP)
                            </button>

                            {heroRelicCard && !alreadyHasRelic && (
                                <button
                                    onClick={() => onResolveEventChoice("signature_relic")}
                                    className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 border border-rose-400 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer transition shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                                >
                                    ★ Sblocca Signature: {heroRelicCard.name} (+8 HP)
                                </button>
                            )}

                            <button
                                onClick={() => onResolveEventChoice("rare_loot")}
                                className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer transition shadow"
                            >
                                📦 Cassa Militare (+1 Carta Rara/Non Comune & +10 HP)
                            </button>
                        </div>
                    </div>

                    {heroRelicCard && !alreadyHasRelic && (
                        <div className="flex flex-col items-center gap-1 shrink-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                                ★ Reliquia Eroe Disponibile:
                            </span>
                            <Card card={heroRelicCard} isPlayable={true} />
                        </div>
                    )}
                </motion.div>
            )}
            {/* === FINE SEZIONE: Modale Interattivo Nodo Evento / Rifugio / Scavenging === */}

            {/* === INIZIO SEZIONE: Banner Vittoria Finale della Run === */}
            {isRunCompleted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 p-8 text-center shadow-2xl flex flex-col items-center gap-4"
                >
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                        Zona di Quarantena Liberata!
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-stone-100">
                        🏆 Spedizione Completata con Successo!
                    </h2>
                    <p className="text-stone-300 max-w-xl">
                        {survivor.name} ha attraversato tutti i 7 piani della mappa e sconfitto il Bloater finale con {currentHp} HP residui e un mazzo di {deck.length} carte.
                    </p>
                    <button
                        onClick={onStartNewRun}
                        className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold uppercase tracking-wider cursor-pointer transition"
                    >
                        ⚔️ Gioca una Nuova Run
                    </button>
                </motion.div>
            )}
            {/* === FINE SEZIONE: Banner Vittoria Finale della Run === */}

            {/* === INIZIO SEZIONE: Grafo Ramificato a 7 Piani con Linee SVG (Slay the Spire) === */}
            <div className="rounded-2xl bg-stone-950/90 border-2 border-stone-800 p-6 shadow-2xl overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-extrabold uppercase tracking-wider text-amber-400">
                            🗺️ Mappa Tattica della Zona di Quarantena (Scegli il tuo Sentiero)
                        </h3>
                        <p className="text-xs text-stone-400">
                            I nodi illuminati in ambra sono raggiungibili dalla tua posizione attuale. Scegli con cura tra scontri, rifugi ed élite.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/50">✓ Superato</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950">📍 Raggiungibile</span>
                        <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-500 border border-stone-800">🔒 Fuori Rotta</span>
                    </div>
                </div>

                <div className="relative min-w-[920px] h-[430px] rounded-xl bg-stone-900/60 border border-stone-800/90 overflow-hidden">
                    {/* Layer SVG per i sentieri tra i nodi */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {nodes.map((node) => {
                            const start = getNodePercentCoords(node.col, node.row);
                            const isFromVisited = visitedNodeIds.includes(node.id);

                            return (node.nextIds || []).map((targetId) => {
                                const targetNode = nodes.find((n) => n.id === targetId);
                                if (!targetNode) return null;
                                const end = getNodePercentCoords(targetNode.col, targetNode.row);

                                const isPathTaken =
                                    isFromVisited && visitedNodeIds.includes(targetId);
                                const isPathAvailable =
                                    isFromVisited && availableNodeIds.includes(targetId) && !activeEventNode;

                                return (
                                    <line
                                        key={`${node.id}->${targetId}`}
                                        x1={`${start.x}%`}
                                        y1={`${start.y}%`}
                                        x2={`${end.x}%`}
                                        y2={`${end.y}%`}
                                        stroke={
                                            isPathTaken
                                                ? "#10b981"
                                                : isPathAvailable
                                                ? "#f59e0b"
                                                : "#44403c"
                                        }
                                        strokeWidth={isPathTaken || isPathAvailable ? "3.5" : "2"}
                                        strokeDasharray={isPathTaken ? "none" : "7 6"}
                                        opacity={isPathTaken || isPathAvailable ? "0.95" : "0.45"}
                                    />
                                );
                            });
                        })}
                    </svg>

                    {/* Nodi Interattivi del Grafo */}
                    {nodes.map((node) => {
                        const { x, y } = getNodePercentCoords(node.col, node.row);
                        const isVisited = visitedNodeIds.includes(node.id);
                        const isAvailable =
                            availableNodeIds.includes(node.id) && !isRunCompleted && !activeEventNode;
                        const badge = NODE_TYPE_BADGES[node.type] || NODE_TYPE_BADGES.combat;

                        return (
                            <div
                                key={node.id}
                                style={{ left: `${x}%`, top: `${y}%` }}
                                onClick={() => isAvailable && onSelectMapNode(node)}
                                className={` -translate-x-1/2 -translate-y-1/2 absolute w-32 rounded-xl p-2 border-2 transition-all duration-200 flex flex-col items-center text-center select-none ${
                                    isVisited
                                        ? "bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md z-10"
                                        : isAvailable
                                        ? "bg-stone-950 border-amber-400 text-stone-100 shadow-[0_0_22px_rgba(245,158,11,0.55)] scale-105 hover:scale-110 cursor-pointer z-20"
                                        : "bg-stone-950/80 border-stone-800 text-stone-500 opacity-50 z-10"
                                }`}
                            >
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${badge.color}`}>
                                    {badge.icon} {badge.label}
                                </span>

                                <div className="mt-1 font-extrabold text-xs uppercase tracking-wide truncate w-full">
                                    {node.enemy ? node.enemy.name : node.title}
                                </div>

                                <div className="text-[10px] text-stone-400">
                                    {node.enemy
                                        ? `💀 ${node.enemy.hp} HP`
                                        : isVisited
                                        ? "✓ Completato"
                                        : "Evento Scelta"}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* === FINE SEZIONE: Grafo Ramificato a 7 Piani con Linee SVG (Slay the Spire) === */}
        </section>
    );
}
// === FINE SEZIONE: Componente Principale RunMap ===
