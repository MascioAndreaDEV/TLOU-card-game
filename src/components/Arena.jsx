import { CHARACTERS_DATABASE } from '../data/Characters';
import { ENEMIES_DATABASE } from '../data/enemies';
import { useState } from 'react';
import EnemyHUD from './HUD/EnemyHUD';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';
import { CARD_DATABASE } from '../data/cards';
const enemy = ENEMIES_DATABASE[0]

const character = CHARACTERS_DATABASE[0]


export default function Arena() {

    //inizializzo useState per gestire i punti vita del nemico e del player.
    //destrutturazione variabile

    const [enemyHp, setEnemyHp] = useState(enemy.hp);

    const [playerHp, setPlayerHp] = useState(character.hp);

    const [stamina, setStamina] = useState(3)

    const [hand, setHand] = useState(CARD_DATABASE.slice(0, 6));

    const [enemyShield, setEnemyShield] = useState(0)

    const [playerShield, setPlayerShield] = useState(0)


    //funzione Handler per gestione evento click Nemico e Player
    
    function handlePlayerHp(danno) {
        if (playerHp >= 1) {
            setPlayerHp(Math.max(0, playerHp - danno))
        }
    }

    function handleHp(danno) {
        if (enemyHp >= 1) {
            setEnemyHp(Math.max(0, enemyHp - danno))
        }
    }

    function handleEnemyShield(danno) {
        if(enemyShield > 0) {
            setEnemyShield(Math.max(0, enemyShield - danno))
        }
    }


    function handlePlayerShield(danno) {
        if(playerShield > 0) {
            setPlayerShield(Math.max(0, playerShield - danno))
        }
    }



    function handleStamina(costoCarta) {
        if(stamina < costoCarta) {
            return false
        }
      
        setStamina(stamina - costoCarta)
        return true
    }


    function handleDiscard(card){
    setHand(hand.filter(c => c.id !== card.id))
}

function handleEnemyTurn() {
    if(enemyHp > 0) {

        const mossaCasualeNemico = Math.floor(Math.random() * enemy.moves.length)

        const prossimaMossaNemico = enemy.moves[mossaCasualeNemico]


        if(prossimaMossaNemico.damage > 0) {
            handlePlayerHp(prossimaMossaNemico.damage)
        }

        if(prossimaMossaNemico.shield > 0) {
            setEnemyShield(prev => prev + prossimaMossaNemico.shield)
        }

    }
}

function refillCard() {
    const carteMancanti = 6 - hand.length;
    if (carteMancanti > 0) {
        const carteNonInMano = CARD_DATABASE.filter(card => !hand.includes(card));

        if (carteNonInMano.length > 0) {
            const carteNuove = [];
            for (let i = 0; i < carteMancanti && carteNonInMano.length > 0; i++) {
                const cartaRandom = Math.floor(Math.random() * carteNonInMano.length);
                const cartaPescata = carteNonInMano.splice(cartaRandom, 1)[0];
                carteNuove.push(cartaPescata);
            }

            setHand(prevHand => [...prevHand, ...carteNuove]);
        }
    }
    return [];
}


function handleEndTurn(){
        handleEnemyTurn()
        refillCard()
        setStamina(3);
}
 
 



    return (
        <div className="arena-container font- flex-1 flex flex-col items-center justify-between border-2 border-dashed border-neutral-700 rounded-lg m-2 w-screen">

            <EnemyHUD nomeNemico={enemy.name} hpNemico={enemy.hp} hpCorrenti={enemyHp} gestioneDanno={handleHp} gestioneScudo={handleEnemyShield} />

            <PlayerHUD characterName={character.name} characterImage={character.image} characterHp={character.hp} characterCurrentHp={playerHp} playerStamina={stamina} gestioneScudo={handlePlayerShield} />

            {/*Player Hand meglio in HUD ???*/}

            <PlayerHand refillCard={refillCard} handleDiscard={handleDiscard} hand={hand} gestioneDanno={handleHp} gestioneStamina={handleStamina}/>

            <button className='border-2 border-white w-1/4 rounded-lg bg-red-600 text-white' onClick={handleEndTurn}><span className='p-3'>FINE TURNO</span></button> 

        </div >
    );
};
