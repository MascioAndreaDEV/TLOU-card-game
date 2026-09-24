
export default function PlayerHUD({ characterName, characterImage, characterHp, characterCurrentHp }) {

    const characterHpPercentage = (characterCurrentHp / characterHp) * 100;

    return (
        <div className="player-zone flex flex-col items-center text-center">
            <h3>{characterName}</h3>
            <p>{characterCurrentHp} / {characterHp} hp</p>
            {characterCurrentHp === 0 && <p className="font-barlow font-bold uppercase text-red-600">ELIMINATO.</p>}
            <div className="enemy-hp-bar rounded-full overflow-hidden w-90 h-6 bg-amber-400">
                <div className="enemy-hp h-full transition-all duration-300 ease-out bg-red-700" style={{ width: `${characterHpPercentage}%` }}></div>
            </div>
        </div>
    )
}
