
//predisopondo il rendering della carta e i suoi effetti con condizionale react "&&"
export default function Card({ card }) {


    return (<div className="card">

        <h2>{card.name}</h2>
        <h4>{card.cost}</h4>
        <h3>{card.cardType}</h3>

        {card.effects.damage && <p>Damage: {card.effects.damage}</p>}
        {card.effects.shield && <p>Shield: {card.effects.shield}</p>}
        {card.effects.stun && <p>Stunned</p>}
        {card.effects.bleedChance && <p>bleeding chance = {card.effects.bleedChance * 100} %</p>}
        {card.effects.dismemberChance && <p>Dismembered!</p>}


    </div>


    )


};


