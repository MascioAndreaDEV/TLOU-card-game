export default function EnemyHUD
    ({ nomeNemico, hpNemico, hpCorrenti, gestioneDanno }) {

    const hpPercentage = (hpCorrenti / hpNemico) * 100;


    return (
        <div className="enemy-zone flex flex-col items-center text-center">
            <h3>{nomeNemico}</h3>
            <p>{hpCorrenti} / {hpNemico} hp</p>
            {hpCorrenti === 0 && <p className="font-barlow font-bold uppercase text-red-600">Nemico ucciso</p>}
            <button onClick={gestioneDanno} disabled={hpCorrenti === 0} >TEST ATTACCO</button>
            <div className="enemy-hp-bar rounded-full overflow-hidden w-90 h-6 bg-amber-400">
                <div className="enemy-hp h-full transition-all duration-300 ease-out bg-red-700" style={{ width: `${hpPercentage}%` }}></div>
            </div>
        </div >

    )
}
