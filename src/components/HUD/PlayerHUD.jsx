// === INIZIO SEZIONE: Componente HUD Giocatore (HP, Stamina, Scudo, Munizioni, Status) ===
export default function PlayerHUD({
    characterName,
    characterHp,
    characterCurrentHp,
    playerStamina,
    playerShield,
    ammoReserve = {},
    playerStatus = {},
}) {
    const characterHpPercentage = Math.max(0, (characterCurrentHp / characterHp) * 100);
    const activeAmmoEntries = Object.entries(ammoReserve).filter(([, count]) => count > 0);

    return (
        <div className="player-zone flex flex-col items-center text-center gap-1">
            <h3>{characterName}</h3>
            <p>{playerStamina} stamina</p>
            <p>{characterCurrentHp} / {characterHp} hp</p>
            {characterCurrentHp === 0 && <p className="font-barlow font-bold uppercase text-red-600">ELIMINATO.</p>}
            <div className="enemy-hp-bar rounded-full overflow-hidden w-90 h-6 bg-amber-400">
                <div className="enemy-hp h-full transition-all duration-300 ease-out bg-red-700" style={{ width: `${characterHpPercentage}%` }}></div>
            </div>
            <div className="player-badge-section flex flex-wrap items-center justify-center gap-3 text-sm">
                <p>Scudo: {playerShield}</p>
                {activeAmmoEntries.length > 0 && (
                    <div className="flex gap-2">
                        {activeAmmoEntries.map(([caliber, count]) => (
                            <span key={caliber} className="px-2 py-0.5 rounded bg-stone-800 border border-amber-600 text-amber-300 text-xs">
                                {caliber}: {count}
                            </span>
                        ))}
                    </div>
                )}
                {playerStatus.isBleeding && (
                    <span className="px-2 py-0.5 rounded bg-red-950 border border-red-500 text-red-300 text-xs">
                        🩸 Sanguinamento ({playerStatus.bleedDuration}t)
                    </span>
                )}
                {playerStatus.isPoisoned && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs">
                        ☣️ Veleno ({playerStatus.poisonDuration}t)
                    </span>
                )}
            </div>
        </div>
    );
}
// === FINE SEZIONE: Componente HUD Giocatore (HP, Stamina, Scudo, Munizioni, Status) ===
