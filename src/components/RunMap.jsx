// === INIZIO SEZIONE: Import Dati e Componenti RunMap ===
import { useState } from "react";
import { CHARACTERS_DATABASE } from "../data/Characters";
import Card from "./card";
// === FINE SEZIONE: Import Dati e Componenti RunMap ===

// === INIZIO SEZIONE: Componente Principale RunMap ===
export default function RunMap({
    runState,
    onSelectSurvivor,
    onEnterCombatNode,
    onResolveRestNode,
    onResolveScavengeNode,
    onStartNewRun,
}) {
    const [showDeckModal, setShowDeckModal] = useState(false);

    // === INIZIO SEZIONE: Schermata Selezione Sopravvissuto Iniziale ===
    if (!runState.survivor) {
        return (
            <section className="font-barlow w-full max-w-6xl mx-auto px-4 py-6 flex-1 flex flex-col items-center justify-center gap-6">
                <div className="text-center max-w-2xl">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/40">
                        Nuova Spedizione — Passo 1
                    </span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-stone-100">
                        Scegli il tuo Sopravvissuto
                    </h2>
                    <p className="mt-2 text-stone-400 text-sm md:text-base">
                        Ogni sopravvissuto inizia con uno Starter Deck di 12 carte base e conserva gli HP residui tra una tappa e l&apos;altra della Zona di Quarantena.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                    {CHARACTERS_DATABASE.map((char) => (
                        <div
                            key={char.id}
                            onClick={() => onSelectSurvivor(char)}
                            className="group rounded-2xl bg-stone-950/90 border-2 border-stone-800 hover:border-amber-500 overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1"
                        >
                            <div className="h-56 w-full overflow-hidden bg-stone-900 relative">
                                <img
                                    src={char.image}
                                    alt={char.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                                />
                                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 font-extrabold text-sm">
                                    ❤️ {char.hp} HP
                                </span>
                            </div>
                            <div className="p-4 flex items-center justify-between bg-stone-950">
                                <div>
                                    <h3 className="text-xl font-extrabold uppercase tracking-wider text-stone-100 group-hover:text-amber-400 transition">
                                        {char.name}
                                    </h3>
                                    <p className="text-xs uppercase tracking-widest text-stone-400">
                                        Starter Deck: 12 Carte
                                    </p>
                                </div>
                                <span className="px-4 py-1.5 rounded-lg bg-amber-600 group-hover:bg-amber-500 text-stone-950 font-extrabold text-xs uppercase tracking-wider">
                                    Seleziona →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
    // === FINE SEZIONE: Schermata Selezione Sopravvissuto Iniziale ===

    const { survivor, currentHp, deck, nodes, currentNodeIndex, isRunCompleted } = runState;
    const hpPercent = Math.max(0, Math.min(100, Math.round((currentHp / survivor.hp) * 100)));

    return (
        <section className="font-barlow w-full max-w-6xl mx-auto px-4 py-6 flex-1 flex flex-col gap-6">
            {/* === INIZIO SEZIONE: Barra HUD Stato Run (Sopravvissuto, HP, Mazzo) === */}
            <div className="rounded-2xl bg-stone-950/95 border border-stone-800 p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={survivor.image}
                        alt={survivor.name}
                        className="w-14 h-14 rounded-xl object-cover object-top border-2 border-amber-500"
                    />
                    <div>
                        <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                            Sopravvissuto in Spedizione
                        </div>
                        <h2 className="text-xl font-extrabold uppercase text-stone-100">
                            {survivor.name}
                        </h2>
                        <div className="mt-1 flex items-center gap-2">
                            <div className="w-36 h-3 rounded-full bg-stone-800 overflow-hidden border border-stone-700">
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
                    <button
                        onClick={() => setShowDeckModal((prev) => !prev)}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/60 text-amber-300 font-bold text-sm uppercase tracking-wider cursor-pointer transition"
                    >
                        🎒 Il Tuo Mazzo ({deck.length} Carte)
                    </button>

                    <button
                        onClick={onStartNewRun}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-rose-950 border border-stone-700 hover:border-rose-500/70 text-stone-300 hover:text-rose-300 font-bold text-sm uppercase tracking-wider cursor-pointer transition"
                    >
                        🔄 Nuova Spedizione
                    </button>
                </div>
            </div>
            {/* === FINE SEZIONE: Barra HUD Stato Run (Sopravvissuto, HP, Mazzo) === */}

            {/* === INIZIO SEZIONE: Ispezione Mazzo Attuale della Run === */}
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
            {/* === FINE SEZIONE: Ispezione Mazzo Attuale della Run === */}

            {/* === INIZIO SEZIONE: Banner Vittoria Finale della Run === */}
            {isRunCompleted && (
                <div className="rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 p-8 text-center shadow-2xl flex flex-col items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                        Zona di Quarantena Liberata!
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-stone-100">
                        🏆 Spedizione Completata con Successo!
                    </h2>
                    <p className="text-stone-300 max-w-xl">
                        {survivor.name} ha superato tutte le 6 tappe e sconfitto il Bloater finale con {currentHp} HP residui e un mazzo di {deck.length} carte.
                    </p>
                    <button
                        onClick={onStartNewRun}
                        className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold uppercase tracking-wider cursor-pointer transition"
                    >
                        ⚔️ Gioca una Nuova Run
                    </button>
                </div>
            )}
            {/* === FINE SEZIONE: Banner Vittoria Finale della Run === */}

            {/* === INIZIO SEZIONE: Percorso Tappe della Mappa (6 Nodi) === */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {nodes.map((node, index) => {
                    const isCompleted = index < currentNodeIndex || isRunCompleted;
                    const isCurrent = index === currentNodeIndex && !isRunCompleted;

                    return (
                        <div
                            key={node.id}
                            className={`rounded-2xl p-5 border-2 flex flex-col justify-between transition-all ${
                                isCompleted
                                    ? "bg-stone-950/60 border-emerald-700/60 opacity-75"
                                    : isCurrent
                                    ? "bg-stone-950/95 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.25)]"
                                    : "bg-stone-950/40 border-stone-800/80 opacity-50"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
                                    <span className="text-stone-400">Tappa {index + 1} / {nodes.length}</span>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full ${
                                            isCompleted
                                                ? "bg-emerald-950 text-emerald-300 border border-emerald-600/50"
                                                : isCurrent
                                                ? "bg-amber-500 text-stone-950"
                                                : "bg-stone-900 text-stone-500"
                                        }`}
                                    >
                                        {isCompleted ? "✓ Completata" : isCurrent ? "📍 Tappa Attuale" : "🔒 Bloccata"}
                                    </span>
                                </div>

                                <h3 className="text-xl font-extrabold uppercase tracking-wider text-stone-100">
                                    {node.title}
                                </h3>
                                <p className="text-xs text-stone-400 mt-1 mb-4">
                                    {node.description}
                                </p>

                                {node.type !== "event" && node.enemy && (
                                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 mb-4">
                                        <img
                                            src={node.enemy.image}
                                            alt={node.enemy.name}
                                            className="w-12 h-12 rounded-lg object-cover border border-rose-500/60"
                                        />
                                        <div>
                                            <div className="text-sm font-extrabold uppercase text-rose-400">
                                                {node.enemy.name}
                                            </div>
                                            <div className="text-xs text-stone-400">
                                                💀 {node.enemy.hp} HP • {node.enemy.moves.length} Mosse
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* === INIZIO SEZIONE: Azioni Tappa Attiva === */}
                            {isCurrent && node.type !== "event" && (
                                <button
                                    onClick={() => onEnterCombatNode(node)}
                                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold uppercase tracking-wider text-sm cursor-pointer transition shadow"
                                >
                                    ⚔️ Affronta {node.enemy.name}
                                </button>
                            )}

                            {isCurrent && node.type === "event" && (
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={onResolveRestNode}
                                        className="w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-stone-100 font-bold uppercase tracking-wider text-xs cursor-pointer transition"
                                    >
                                        🏕️ Riposa al Falò (+25 HP)
                                    </button>
                                    <button
                                        onClick={onResolveScavengeNode}
                                        className="w-full py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-stone-100 font-bold uppercase tracking-wider text-xs cursor-pointer transition"
                                    >
                                        📦 Cassa FEDRA (+1 Carta Rara & +8 HP)
                                    </button>
                                </div>
                            )}
                            {/* === FINE SEZIONE: Azioni Tappa Attiva === */}
                        </div>
                    );
                })}
            </div>
            {/* === FINE SEZIONE: Percorso Tappe della Mappa (6 Nodi) === */}
        </section>
    );
}
// === FINE SEZIONE: Componente Principale RunMap ===
