// === INIZIO SEZIONE: Import Icone per Carte Signature ===
import {
    GiBlood,
    GiKnockout,
    GiBrokenBone,
    GiShield,
    GiPunch,
    GiFirstAidKit,
    GiBandageRoll,
    GiFireflake,
} from 'react-icons/gi';
// === FINE SEZIONE: Import Icone per Carte Signature ===

// === INIZIO SEZIONE: Componente Carte Signature ===
export default function SignaturesCards({ card }) {
    if (!card) return null;

    return (
        <div className="font-barlow card flex flex-col justify-between w-58 h-85 bg-stone-900 border border-zinc-700 text-amber-300 rounded-xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">

            <div className="card-header text-center flex justify-between items-center border-2 border-amber-600 p-2 rounded">
                <h2>{card.name}</h2>
                <h4 className="bg-amber-600 text-stone-950 font-bold px-2 py-0.5 rounded-full text-sm">cost {card.cost}</h4>
                <h3 className="text-xs">{card.cardType}</h3>
            </div>

            <div className="card-image">
                <img className="rounded-xl" src={card.img} alt={card.name} />
            </div>

            <div className="card-effects flex justify-around text-center bg-stone-950/60 p-2.5 rounded-lg text-xl space-y-1 border border-stone-800">
                {card.effects?.damage && <p><GiPunch /> {card.effects.damage}</p>}
                {card.effects?.shield && <p><GiShield /> {card.effects.shield}</p>}
                {card.effects?.stun && <GiKnockout />}
                {card.effects?.bleedChance && <GiBlood />}
                {card.effects?.dismemberChance && <GiBrokenBone />}
                {card.effects?.heal && <p><GiFirstAidKit /> {card.effects.heal}</p>}
                {card.effects?.cleanse && <p><GiBandageRoll /></p>}
                {card.effects?.burnDamage && <p><GiFireflake /> {card.effects.burnDamage}</p>}
            </div>

        </div>
    );
}
// === FINE SEZIONE: Componente Carte Signature ===
