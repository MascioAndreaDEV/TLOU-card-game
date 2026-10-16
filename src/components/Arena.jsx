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

    const [hand, setHand] = useState(CARD_DATABASE.slice(0, 4));


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

    function handleStamina(costoCarta) {
        if(stamina < costoCarta) {
            return false
        }
      
        setStamina(stamina - costoCarta)
        return true
    }

    function drawCard(){
        const carteNonInMano = CARD_DATABASE.filter(card => !hand.includes(card));
        if(hand.length < 4) {
            const cardRandom = carteNonInMano[Math.floor(Math.random() * carteNonInMano.length)];
            setHand(prevHand => [...prevHand, cardRandom]);
            return cardRandom;
        }
        return null;

    }

    function handleDiscard(card){
    setHand(hand.filter(c => c.id !== card.id))
}



    return (
        <div className="arena-container font- flex-1 flex flex-col items-center justify-between border-2 border-dashed border-neutral-700 rounded-lg m-2 w-screen">

            <EnemyHUD nomeNemico={enemy.name} hpNemico={enemy.hp} hpCorrenti={enemyHp} gestioneDanno={handleHp} />

            <PlayerHUD characterName={character.name} characterImage={character.image} characterHp={character.hp} characterCurrentHp={playerHp} playerStamina={stamina}/>

            {/*Player Hand meglio in HUD ???*/}

            <PlayerHand drawCard={drawCard} handleDiscard={handleDiscard} hand={hand} gestioneDanno={handleHp} gestioneStamina={handleStamina}/>

        </div >
    );
}

