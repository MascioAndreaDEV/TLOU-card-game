// === INIZIO SEZIONE: Import Icone HUD Giocatore ===
import { GiShield, GiLightningFrequency, GiBullets } from 'react-icons/gi';
// === FINE SEZIONE: Import Icone HUD Giocatore ===

// === INIZIO SEZIONE: Componente HUD Giocatore con Ritratto, Stamina Orbs e Damage Ghost Bar ===
export default function PlayerHUD({
    characterName,
    characterImage,
    characterPassive,
    characterHp,
    characterCurrentHp,
    playerStamina,
    playerShield,
    ammoReserve = {},
    playerStatus = {},
}) {
    const characterHpPercentage = Math.max(0, Math.min(100, (characterCurrentHp / characterHp) * 100));
    const activeAmmoEntries = Object.entries(ammoReserve).filter(([, count]) => count > 0);
    const maxOrbs = Math.max(3, playerStamina);

    return (
        <div className="font-barlow w-full max-w-2xl mx-auto px-4 py-2.5 rounded-2xl bg-stone-950/90 border border-stone-800 shadow-[0_8px_30px_rgba(0,0,0,0.75)] flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
            {/* === INIZIO SEZIONE: Ritratto Sopravvissuto e Passiva Lore === */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    {characterImage && (
                        <img
                            src={characterImage}
                            alt={characterName}
                            className="w-14 h-14 rounded-xl object-cover object-top border-2 border-amber-500 shadow-md"
                        />
                    )}
                    {playerShield > 0 && (
                        <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-sky-600 border border-sky-300 text-white font-extrabold text-xs flex items-center gap-0.5 shadow">
                            <GiShield /> {playerShield}
                        </span>
                    )}
                </div>

                <div className="text-left">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold uppercase tracking-wider text-stone-100">
                            {characterName}
                        </h3>
                        {characterCurrentHp <= 0 && (
                            <span className="px-2 py-0.5 rounded bg-red-700 text-white text-xs font-extrabold uppercase">
                                ELIMINATO
                            </span>
                        )}
                    </div>
                    {characterPassive && (
                        <p
                            title={characterPassive.description}
                            className="text-[11px] text-amber-400/90 font-semibold tracking-wide"
                        >
                            ★ {characterPassive.name}: <span className="text-stone-400 font-normal">{characterPassive.description}</span>
                        </p>
                    )}
                </div>
            </div>
            {/* === FINE SEZIONE: Ritratto Sopravvissuto e Passiva Lore === */}

            {/* === INIZIO SEZIONE: Barra Vita con Damage Ghost, Stamina Orbs e Riserva Munizioni === */}
            <div className="flex flex-col items-center sm:items-end gap-1.5 w-full sm:w-auto">
                <div className="flex items-center justify-between w-full sm:w-64 text-xs font-bold">
                    {/* Indicatori Stamina Orbs */}
                    <div className="flex items-center gap-1" title={`Stamina disponibile: ${playerStamina}`}>
                        <span className="text-amber-400 uppercase tracking-wider mr-1 flex items-center gap-0.5">
                            <GiLightningFrequency /> STM
                        </span>
                        {Array.from({ length: maxOrbs }).map((_, idx) => {
                            const isActive = idx < playerStamina;
                            return (
                                <span
                                    key={idx}
                                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                                        isActive
                                            ? 'bg-amber-400 border-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.8)] scale-105'
                                            : 'bg-stone-800 border-stone-700 opacity-45'
                                    }`}
                                />
                            );
                        })}
                    </div>

                    <span className="text-stone-200 font-extrabold">
                        ❤️ {characterCurrentHp} / {characterHp} HP
                    </span>
                </div>

                {/* Barra Vita con "Damage Ghost" (Buffer Bar) */}
                <div className="relative w-full sm:w-64 h-4 rounded-full overflow-hidden bg-stone-900 border border-stone-700 shadow-inner">
                    {/* Ghost Buffer Bar (scende lentamente con ritardo) */}
                    <div
                        className="absolute inset-y-0 left-0 bg-amber-300/80 transition-all duration-700 delay-200 ease-out"
                        style={{ width: `${characterHpPercentage}%` }}
                    />
                    {/* Barra HP Reale */}
                    <div
                        className={`relative h-full transition-all duration-200 ease-out ${
                            characterHpPercentage > 35 ? 'bg-emerald-600' : 'bg-red-600 animate-pulse'
                        }`}
                        style={{ width: `${characterHpPercentage}%` }}
                    />
                </div>

                {/* Munizioni e Status Attivi */}
                <div className="flex flex-wrap items-center justify-end gap-1.5 text-[11px]">
                    {activeAmmoEntries.map(([caliber, count]) => (
                        <span
                            key={caliber}
                            className="px-2 py-0.5 rounded-md bg-stone-900 border border-amber-600/70 text-amber-300 font-bold flex items-center gap-1"
                        >
                            <GiBullets /> {caliber}: {count}
                        </span>
                    ))}
                    {playerStatus.isBleeding && (
                        <span className="px-2 py-0.5 rounded-md bg-red-950 border border-red-500 text-red-300 font-bold">
                            🩸 Sanguina ({playerStatus.bleedDuration}t)
                        </span>
                    )}
                    {playerStatus.isPoisoned && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold">
                            ☣️ Spore ({playerStatus.poisonDuration}t)
                        </span>
                    )}
                </div>
            </div>
            {/* === FINE SEZIONE: Barra Vita con Damage Ghost, Stamina Orbs e Riserva Munizioni === */}
        </div>
    );
}
// === FINE SEZIONE: Componente HUD Giocatore con Ritratto, Stamina Orbs e Damage Ghost Bar ===
