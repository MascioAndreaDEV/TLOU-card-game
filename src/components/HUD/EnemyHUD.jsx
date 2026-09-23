import { useState } from "react"
import { ENEMIES_DATABASE } from '../../data/enemies'

const enemy = ENEMIES_DATABASE[0];




export default function EnemyHUD() {


    //inizializzo useState per gestire i punti vita.
    //destrutturazione variabile

    const [hp, setHp] = useState(enemy.hp);


    //funzione Handler per gestione evento click

    function handleHp() {
        if (hp >= 10) {
            setHp(Math.max(0, hp - 10))
        }
    }

    const hpPercentage = (hp / enemy.hp) * 100;

    return (
        <div className="enemy-zone flex flex-col items-center text-center">
            <h3 className>{enemy.name}</h3>
            <p>{hp} / {enemy.hp} hp</p>
            {hp === 0 && <p className="font-barlow font-bold uppercase text-red-600">Nemico ucciso</p>}
            <button onClick={handleHp} disabled={hp === 0} >TEST ATTACCO</button>
            <div className="enemy-hp-bar rounded-full overflow-hidden w-90 h-6 bg-amber-400">
                <div className="enemy-hp h-full transition-all duration-300 ease-out bg-red-700" style={{ width: `${hpPercentage}%` }}></div>
            </div>
        </div >

    )
}
