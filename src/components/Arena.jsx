import { CHARACTERS_DATABASE } from '../data/Characters';
import { ENEMIES_DATABASE } from '../data/enemies';
import { useState } from 'react';
import EnemyHUD from './HUD/EnemyHUD';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';

const enemy = ENEMIES_DATABASE[0]

const character = CHARACTERS_DATABASE[0]


export default function Arena() {

    //inizializzo useState per gestire i punti vita del nemico e del player.
    //destrutturazione variabile

    const [enemyHp, setEnemyHp] = useState(enemy.hp);

    const [playerHp, setPlayerHp] = useState(character.hp);



    //funzione Handler per gestione evento click Nemico e Player

    function handleHp(danno) {
        if (enemyHp >= 1) {
            setEnemyHp(Math.max(0, enemyHp - danno))
        }
    }


    function handlePlayerHp(danno) {
        if (playerHp >= 1) {
            setPlayerHp(Math.max(0, playerHp - danno))
        }
    }


    return (
        <div className="arena-container font- flex-1 flex flex-col items-center justify-between border-2 border-dashed border-neutral-700 rounded-lg m-2 w-screen">

            <EnemyHUD nomeNemico={enemy.name} hpNemico={enemy.hp} hpCorrenti={enemyHp} gestioneDanno={handleHp} />

            <PlayerHUD characterName={character.name} characterImage={character.image} characterHp={character.hp} characterCurrentHp={playerHp} />

            {/*Player Hand meglio in HUD ???*/}

            <PlayerHand gestioneDanno={handleHp} />

        </div >
    );
}

