
import { ENEMIES_DATABASE } from '../data/enemies';
import { useState } from 'react';
import EnemyHUD from './HUD/EnemyHUD';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';

const enemy = ENEMIES_DATABASE[0]


export default function Arena() {

    //inizializzo useState per gestire i punti vita del nemico.
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
        <div className="arena-container font- flex-1 flex flex-col items-center justify-between border-2 border-dashed border-neutral-700 rounded-lg m-2 w-screen">

            <EnemyHUD nomeNemico={enemy.name} hpNemico={enemy.hp} hpCorrenti={hp} gestioneDanno={handleHp} />

            <PlayerHUD />

            {/*Player Hand meglio in HUD ???*/}

            <PlayerHand />

        </div >
    );
}

