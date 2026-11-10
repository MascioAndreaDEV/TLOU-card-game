// === INIZIO SEZIONE: Import Icone Effetti e Risorse Survival ===
import {
    GiBlood,
    GiKnockout,
    GiBrokenBone,
    GiShield,
    GiPunch,
    GiFirstAidKit,
    GiBandageRoll,
    GiFireflake,
    GiBullets,
    GiAnvilImpact,
} from 'react-icons/gi';
// === FINE SEZIONE: Import Icone Effetti e Risorse Survival ===

// === INIZIO SEZIONE: Componente Singola Carta Giocabile con Affordance UI ===
export default function Card({
    card,
    playedCard,
    isPlayable = true,
    hasEnoughStamina = true,
    hasAmmoForWeapon = true,
}) {

    return (
        <div
            onClick={() => isPlayable && playedCard && playedCard(card)}
            className={`font-barlow card flex flex-col justify-between w-58 h-85 bg-stone-900 rounded-xl p-4 transition-all duration-200
                ${isPlayable
                    ? 'border border-zinc-700 hover:border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:shadow-2xl cursor-pointer'
                    : 'border border-red-900/70 text-stone-400 opacity-55 grayscale-[40%] cursor-not-allowed shadow-md'
                }`}
        >
            {/* === INIZIO SEZIONE: Header Carta (Nome, Costo, Tipo) === */}
            <div className="card-header text-center flex justify-between items-center border-2 border-amber-600 p-2 rounded">
                <h2 className="font-bold truncate">{card.name}</h2>
                <h4 className={`font-bold px-2 py-0.5 rounded-full text-sm ${
                    hasEnoughStamina
                        ? 'bg-amber-600 text-stone-950'
                        : 'bg-red-700 text-white animate-pulse'
                }`}>
                    cost {card.cost}
                </h4>
                <h3 className="text-xs uppercase">{card.cardType}</h3>
            </div>
            {/* === FINE SEZIONE: Header Carta (Nome, Costo, Tipo) === */}

            {/* === INIZIO SEZIONE: Immagine e Badge Survival (Durabilità & Munizioni) === */}
            <div className="card-image relative">
                {card.img && <img className="rounded-xl max-h-36 w-full object-cover" src={card.img} alt={card.name} />}
                <div className="flex justify-between items-center mt-1 text-xs">
                    {card.durability !== undefined && (
                        <span className={`flex items-center gap-1 bg-stone-800 border px-2 py-0.5 rounded ${
                            card.durability === 1
                                ? 'border-red-500 text-red-300'
                                : 'border-amber-700/60 text-amber-200'
                        }`}>
                            <GiAnvilImpact /> {card.durability}/{card.maxDurability ?? card.durability}
                        </span>
                    )}
                    {card.ammoType && (
                        <span className={`flex items-center gap-1 bg-stone-800 border px-2 py-0.5 rounded ${
                            hasAmmoForWeapon
                                ? 'border-zinc-600 text-amber-400'
                                : 'border-red-600 text-red-400 line-through'
                        }`}>
                            <GiBullets /> {card.ammoType}
                        </span>
                    )}
                </div>
            </div>
            {/* === FINE SEZIONE: Immagine e Badge Survival (Durabilità & Munizioni) === */}

            {/* === INIZIO SEZIONE: Footer Effetti Carta === */}
            <div className="card-effects flex justify-around items-center text-center bg-stone-950/60 p-2.5 rounded-lg text-xl border border-stone-800">
                {card.effects?.damage && <p className="flex items-center gap-1"><GiPunch /> {card.effects.damage}</p>}
                {card.effects?.shield && <p className="flex items-center gap-1"><GiShield /> {card.effects.shield}</p>}
                {card.effects?.stun && <GiKnockout />}
                {card.effects?.bleedChance && <GiBlood />}
                {card.effects?.dismemberChance && <GiBrokenBone />}
                {card.effects?.heal && <p className="flex items-center gap-1"><GiFirstAidKit /> {card.effects.heal}</p>}
                {card.effects?.cleanse && <p className="flex items-center gap-1"><GiBandageRoll /></p>}
                {card.effects?.burnDamage && <p className="flex items-center gap-1"><GiFireflake /> {card.effects.burnDamage}</p>}
                {card.cardType === 'ammo' && <p className="text-xs text-amber-200 uppercase">Carica +1 {card.ammoType}</p>}
            </div>
            {/* === FINE SEZIONE: Footer Effetti Carta === */}
        </div>
    );
}
// === FINE SEZIONE: Componente Singola Carta Giocabile ===


