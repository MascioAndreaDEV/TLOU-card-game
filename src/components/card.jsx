
//predisopondo il rendering della carta e i suoi effetti con condizionale react "&&"
export default function Card({ card }) {


    return (
        <div className="card flex flex-col justify-between w-58 h-75 bg-stone-900 border border-zinc-700 text-amber-300 rounded-xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">

            <div className="card-header text-center flex justify-between">
                <h2>{card.name}</h2>
                <h4 className="bg-amber-600 text-stone-950 font-bold px-2 py-0.5 rounded-full text-sm">cost {card.cost}</h4>
            </div>

            <h3>{card.cardType}</h3>


            <div class name="card-effects"
            >
                {card.effects.damage && <p>Damage: {card.effects.damage}</p>}
                {card.effects.shield && <p>Shield: {card.effects.shield}</p>}
                {card.effects.stun && <p>Stunned</p>}
                {card.effects.bleedChance && <p>bleeding chance = {card.effects.bleedChance * 100} %</p>}
                {card.effects.dismemberChance && <p>Dismember the enemy!!</p>}

            </div>


        </div >


    )


};


