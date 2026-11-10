


// === INIZIO SEZIONE: Import Icone per Intent e Status Nemico ===
import { GiClaws, GiShield, GiSkullCrossedBones } from 'react-icons/gi';
// === FINE SEZIONE: Import Icone per Intent e Status Nemico ===

// === INIZIO SEZIONE: Componente Carta Nemico con Telegrafo Intent e Status Runtime ===
export default function EnemiesCard({ enemy, hpCorrenti, scudo, isAttacking, isHit, intent, status }) {

    const activeStatus = status || enemy.status;
    const hpPercentage = Math.max(0, (hpCorrenti / enemy.hp) * 100);

    return (
        <div className="flex flex-col items-center gap-2">
            {/* === INIZIO SEZIONE: Badge Telegrafo Intenzione Nemica (Enemy Intent) === */}
            {hpCorrenti > 0 && intent && (
                <div className="font-barlow flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/90 border border-amber-500/70 text-amber-300 text-sm shadow-md">
                    <span className="uppercase tracking-wider text-xs text-stone-400">Intento:</span>
                    <span className="font-bold text-white">{intent.name}</span>
                    {intent.damage > 0 && (
                        <span className="flex items-center gap-1 text-red-400 font-bold">
                            <GiClaws className="text-base" /> {intent.damage}
                        </span>
                    )}
                    {intent.shield > 0 && (
                        <span className="flex items-center gap-1 text-sky-400 font-bold">
                            <GiShield className="text-base" /> +{intent.shield}
                        </span>
                    )}
                    {intent.effects?.length > 0 && (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold" title="Effetto status">
                            <GiSkullCrossedBones className="text-base" />
                        </span>
                    )}
                </div>
            )}
            {/* === FINE SEZIONE: Badge Telegrafo Intenzione Nemica (Enemy Intent) === */}

            <div className={`font-barlow card flex flex-col justify-between w-64 h-95 bg-yellow-900 border text-gray-200 rounded-xl p-4 shadow-lg transition-all duration-300 cursor-pointer
                ${isAttacking ? 'translate-y-6 scale-105 border-red-500 shadow-red-900/50' : 'translate-y-0'}
                ${isHit ? 'brightness-150 -translate-x-1 border-white' : ''}
                ${hpCorrenti <= 0 ? 'grayscale opacity-50 border-zinc-700' : 'border-zinc-700'}
            `}>

                <div>
                    <h2>{enemy.name}</h2>
                </div>

                <div className="card-image flex flex-col items-center justify-center">
                    <img className="rounded-xl" src={enemy.image} alt={enemy.name} />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="enemy-hp-bar rounded-full overflow-hidden w-50 h-6 bg-amber-400">
                        <div className="enemy-hp h-full transition-all duration-300 ease-out bg-red-700" style={{ width: `${hpPercentage}%` }}></div>
                    </div>
                    <p className="text-xs mt-1">{hpCorrenti} / {enemy.hp} HP</p>
                    <h4>scudo: {scudo}</h4>

                    {hpCorrenti <= 0 ? (
                        <div className="flex items-center justify-center">
                            <h1 className="text-red-500 font-bold tracking-widest">DEAD</h1>
                        </div>
                    ) : null}

                    {/* === INIZIO SEZIONE: Badge Status Alterati Nemico === */}
                    <div className="flex flex-wrap items-center justify-center gap-1 mt-1">
                        {activeStatus.isBleeding && (
                            <span className="px-2 py-0.5 text-xs rounded bg-red-950 border border-red-500 text-red-300">
                                🩸 Sanguina ({activeStatus.bleedDuration ?? 1}t)
                            </span>
                        )}
                        {activeStatus.isStun && (
                            <span className="px-2 py-0.5 text-xs rounded bg-amber-950 border border-amber-400 text-amber-300">
                                💫 Stordito
                            </span>
                        )}
                        {activeStatus.isPoisoned && (
                            <span className="px-2 py-0.5 text-xs rounded bg-emerald-950 border border-emerald-500 text-emerald-300">
                                ☣️ Avvelenato
                            </span>
                        )}
                        {activeStatus.isDismember && (
                            <span className="px-2 py-0.5 text-xs rounded bg-purple-950 border border-purple-400 text-purple-300">
                                🦴 Mutilato (-25% ATK)
                            </span>
                        )}
                        {activeStatus.burnDuration > 0 && (
                            <span className="px-2 py-0.5 text-xs rounded bg-orange-950 border border-orange-500 text-orange-300">
                                🔥 Ustione ({activeStatus.burnDuration}t)
                            </span>
                        )}
                    </div>
                    {/* === FINE SEZIONE: Badge Status Alterati Nemico === */}
                </div>
            </div>
        </div>
    );
}
// === FINE SEZIONE: Componente Carta Nemico con Telegrafo Intent ===
