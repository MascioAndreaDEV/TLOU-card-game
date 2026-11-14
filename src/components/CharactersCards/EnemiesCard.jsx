// === INIZIO SEZIONE: Import Icone per Intent e Status Nemico ===
import { GiClaws, GiShield, GiSkullCrossedBones } from 'react-icons/gi';
// === FINE SEZIONE: Import Icone per Intent e Status Nemico ===

// === INIZIO SEZIONE: Componente Carta Nemico con Frame Grunge Oscuro, Damage Ghost e Telegrafo Intent ===
export default function EnemiesCard({ enemy, hpCorrenti, scudo, isAttacking, isHit, intent, status }) {
    const activeStatus = status || enemy.status;
    const hpPercentage = Math.max(0, Math.min(100, (hpCorrenti / enemy.hp) * 100));
    const isInfected = enemy.type === 'infected';

    return (
        <div className="font-barlow flex flex-col items-center gap-2 z-20">
            {/* === INIZIO SEZIONE: Badge Telegrafo Intenzione Nemica (Enemy Intent) === */}
            {hpCorrenti > 0 && intent && (
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-950/95 border-2 border-amber-500/80 text-amber-300 text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                    <span className="uppercase tracking-widest text-[11px] font-bold text-stone-400">
                        Prossima Mossa:
                    </span>
                    <span className="font-extrabold uppercase tracking-wider text-stone-100">
                        {intent.name}
                    </span>
                    {intent.damage > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950 border border-red-500/70 text-red-300 font-extrabold text-xs">
                            <GiClaws /> {intent.damage} DMG
                        </span>
                    )}
                    {intent.shield > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-950 border border-sky-500/70 text-sky-300 font-extrabold text-xs">
                            <GiShield /> +{intent.shield}
                        </span>
                    )}
                    {intent.effects?.length > 0 && (
                        <span
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/70 text-emerald-300 font-extrabold text-xs"
                            title="Applica Status Alterato"
                        >
                            <GiSkullCrossedBones /> Status
                        </span>
                    )}
                </div>
            )}
            {/* === FINE SEZIONE: Badge Telegrafo Intenzione Nemica (Enemy Intent) === */}

            {/* === INIZIO SEZIONE: Frame Tattico Oscuro della Minaccia === */}
            <div
                className={`card relative flex flex-col justify-between w-64 rounded-2xl p-3.5 bg-gradient-to-b from-stone-900 via-stone-950 to-black border-2 text-stone-100 shadow-[0_10px_35px_rgba(0,0,0,0.85)] transition-all duration-300 ${
                    isAttacking
                        ? 'translate-y-6 scale-105 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]'
                        : 'translate-y-0'
                } ${
                    isHit
                        ? 'brightness-150 -translate-x-2 border-amber-300'
                        : ''
                } ${
                    hpCorrenti <= 0
                        ? 'grayscale opacity-50 border-zinc-800'
                        : isInfected
                        ? 'border-amber-700/80'
                        : 'border-sky-700/80'
                }`}
            >
                {/* Header Nome e Fazione Minaccia */}
                <div className="flex items-center justify-between px-1 mb-2">
                    <h2 className="font-extrabold text-lg uppercase tracking-wider text-stone-100">
                        {enemy.name}
                    </h2>
                    <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            isInfected
                                ? 'bg-amber-950/90 text-amber-300 border-amber-600/60'
                                : 'bg-sky-950/90 text-sky-300 border-sky-600/60'
                        }`}
                    >
                        {isInfected ? '🍄 Infetto' : '🔫 Ostile'}
                    </span>
                </div>

                {/* Ritratto Nemico */}
                <div className="card-image relative rounded-xl overflow-hidden border border-stone-800 h-42 bg-stone-950">
                    <img
                        className="w-full h-full object-cover object-center"
                        src={enemy.image}
                        alt={enemy.name}
                    />
                    {scudo > 0 && (
                        <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-sky-700/95 border border-sky-300 text-white font-extrabold text-xs flex items-center gap-1 shadow-lg">
                            <GiShield /> {scudo} Scudo
                        </span>
                    )}
                    {hpCorrenti <= 0 && (
                        <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                            <span className="px-4 py-1 rounded-lg border-2 border-red-500 text-red-500 font-extrabold text-2xl tracking-widest uppercase">
                                ELIMINATO
                            </span>
                        </div>
                    )}
                </div>

                {/* Barra Vita Nemico con Damage Ghost */}
                <div className="mt-2.5 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between text-xs font-bold mb-1 px-0.5">
                        <span className="text-stone-400 uppercase tracking-wider">Vitalità</span>
                        <span className="text-rose-400 font-extrabold">
                            💀 {hpCorrenti} / {enemy.hp} HP
                        </span>
                    </div>

                    <div className="relative rounded-full overflow-hidden w-full h-4 bg-stone-900 border border-stone-700 shadow-inner">
                        {/* Ghost Buffer Bar */}
                        <div
                            className="absolute inset-y-0 left-0 bg-amber-300/85 transition-all duration-700 delay-200 ease-out"
                            style={{ width: `${hpPercentage}%` }}
                        />
                        {/* Barra HP Reale */}
                        <div
                            className="relative h-full transition-all duration-200 ease-out bg-gradient-to-r from-red-800 to-rose-600"
                            style={{ width: `${hpPercentage}%` }}
                        />
                    </div>

                    {/* === INIZIO SEZIONE: Badge Status Alterati Nemico === */}
                    <div className="flex flex-wrap items-center justify-center gap-1 mt-2 min-h-5">
                        {activeStatus.isBleeding && (
                            <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-red-950 border border-red-500 text-red-300">
                                🩸 Sanguina ({activeStatus.bleedDuration ?? 1}t)
                            </span>
                        )}
                        {activeStatus.isStun && (
                            <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-amber-950 border border-amber-400 text-amber-300">
                                💫 Stordito
                            </span>
                        )}
                        {activeStatus.isPoisoned && (
                            <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-950 border border-emerald-500 text-emerald-300">
                                ☣️ Avvelenato
                            </span>
                        )}
                        {activeStatus.isDismember && (
                            <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-purple-950 border border-purple-400 text-purple-300">
                                🦴 Mutilato (-25% ATK)
                            </span>
                        )}
                        {activeStatus.burnDuration > 0 && (
                            <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-orange-950 border border-orange-500 text-orange-300">
                                🔥 Ustione ({activeStatus.burnDuration}t)
                            </span>
                        )}
                    </div>
                    {/* === FINE SEZIONE: Badge Status Alterati Nemico === */}
                </div>
            </div>
            {/* === FINE SEZIONE: Frame Tattico Oscuro della Minaccia === */}
        </div>
    );
}
// === FINE SEZIONE: Componente Carta Nemico con Frame Grunge Oscuro, Damage Ghost e Telegrafo Intent ===
