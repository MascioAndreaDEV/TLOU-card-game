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
    GiStarFormation,
} from 'react-icons/gi';
// === FINE SEZIONE: Import Icone Effetti e Risorse Survival ===

// === INIZIO SEZIONE: Configurazione Cornici e Colori per Rarità TCG ===
const RARITY_THEMES = {
    starter: {
        border: 'border-zinc-600 hover:border-zinc-400',
        glow: 'shadow-[0_6px_18px_rgba(0,0,0,0.65)]',
        headerBg: 'bg-zinc-900/95 border-zinc-700',
        badgeText: 'text-zinc-300 bg-zinc-800 border-zinc-600',
        label: 'Base',
    },
    common: {
        border: 'border-emerald-600/80 hover:border-emerald-400',
        glow: 'shadow-[0_0_16px_rgba(16,185,129,0.2)]',
        headerBg: 'bg-emerald-950/80 border-emerald-700/70',
        badgeText: 'text-emerald-300 bg-emerald-950 border-emerald-600/60',
        label: 'Comune',
    },
    uncommon: {
        border: 'border-sky-500/80 hover:border-sky-300',
        glow: 'shadow-[0_0_18px_rgba(14,165,233,0.25)]',
        headerBg: 'bg-sky-950/80 border-sky-700/70',
        badgeText: 'text-sky-300 bg-sky-950 border-sky-500/60',
        label: 'Non Comune',
    },
    rare: {
        border: 'border-amber-500 hover:border-amber-300',
        glow: 'shadow-[0_0_22px_rgba(245,158,11,0.32)]',
        headerBg: 'bg-amber-950/85 border-amber-600/80',
        badgeText: 'text-amber-300 bg-amber-950 border-amber-500/70',
        label: 'Rara',
    },
    signature: {
        border: 'border-rose-500 hover:border-rose-300',
        glow: 'shadow-[0_0_25px_rgba(244,63,94,0.42)]',
        headerBg: 'bg-rose-950/90 border-rose-500/80',
        badgeText: 'text-rose-200 bg-rose-950 border-rose-400/80',
        label: 'Signature',
    },
};

const TYPE_LABELS = {
    attack: 'Attacco',
    defense: 'Difesa',
    action: 'Azione',
    weapon: 'Arma',
    utility: 'Utility',
    ammo: 'Munizioni',
};
// === FINE SEZIONE: Configurazione Cornici e Colori per Rarità TCG ===

// === INIZIO SEZIONE: Generatore Descrizione Breve Lore/Effetto ===
function buildEffectSummary(card) {
    if (card.craftOnly) {
        return 'Materiale chimico puro. Usalo nel Crafting per creare ordigni.';
    }
    if (card.cardType === 'ammo') {
        return `Ricarica +1 munizione ${card.ammoType} nella riserva tattica.`;
    }

    const parts = [];
    const eff = card.effects || {};
    if (eff.damage) {
        let dmgStr = `Infligge ${eff.damage} danni`;
        if (eff.pierceShield) dmgStr += ' (ignora Scudo)';
        parts.push(dmgStr);
    }
    if (eff.bonusStunDamage) parts.push(`+${eff.bonusStunDamage} danni se Stordito`);
    if (eff.bonusBleedDamage) parts.push(`+${eff.bonusBleedDamage} danni se Sanguina`);
    if (eff.shield) parts.push(`+${eff.shield} Scudo`);
    if (eff.heal) parts.push(`Cura ${eff.heal} HP`);
    if (eff.stun) parts.push('Stordisce il nemico');
    if (eff.burnDamage) parts.push(`Ustione ${eff.burnDamage}`);
    if (eff.staminaGain) parts.push(`+${eff.staminaGain} Stamina`);
    if (eff.draw) parts.push(`Pesca ${eff.draw}`);
    if (eff.grantAmmo) parts.push(`+1 ${eff.grantAmmo}`);
    if (eff.cleanse) parts.push(`Cura ${eff.cleanse.join('/')}`);
    if (eff.selfDamage) parts.push(`-${eff.selfDamage} HP fatica`);

    return parts.slice(0, 3).join(' • ') || 'Azione tattica di sopravvivenza.';
}
// === FINE SEZIONE: Generatore Descrizione Breve Lore/Effetto ===

// === INIZIO SEZIONE: Componente Singola Carta Giocabile con Frame TCG ===
export default function Card({
    card,
    playedCard,
    isPlayable = true,
    hasEnoughStamina = true,
    hasAmmoForWeapon = true,
}) {
    const theme = RARITY_THEMES[card.tier] || RARITY_THEMES.common;
    const summaryText = buildEffectSummary(card);

    return (
        <div
            onClick={() => isPlayable && playedCard && playedCard(card)}
            className={`font-barlow card relative flex flex-col justify-between w-56 h-86 rounded-2xl p-3 bg-gradient-to-b from-stone-900 via-stone-950 to-black border-2 transition-all duration-200 select-none ${
                isPlayable
                    ? `${theme.border} ${theme.glow} hover:shadow-2xl cursor-pointer`
                    : 'border-red-900/70 text-stone-400 opacity-55 grayscale-[45%] cursor-not-allowed shadow-md'
            }`}
        >
            {/* === INIZIO SEZIONE: Sfera Costo Stamina Circolare (Top-Left) === */}
            <div
                title={`Costo Stamina: ${card.cost}`}
                className={`absolute -top-2.5 -left-2.5 w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-base border-2 shadow-lg z-20 ${
                    hasEnoughStamina
                        ? 'bg-amber-500 text-stone-950 border-amber-200 shadow-amber-500/40'
                        : 'bg-red-700 text-white border-red-300 animate-pulse'
                }`}
            >
                {card.cost}
            </div>
            {/* === FINE SEZIONE: Sfera Costo Stamina Circolare (Top-Left) === */}

            {/* === INIZIO SEZIONE: Badge Eroe / Rarità (Top-Right) === */}
            <div
                className={`absolute -top-2 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border z-20 flex items-center gap-1 ${theme.badgeText}`}
            >
                {card.tier === 'signature' && <GiStarFormation className="text-rose-300" />}
                {card.heroId ? `★ ${card.heroId}` : theme.label}
            </div>
            {/* === FINE SEZIONE: Badge Eroe / Rarità (Top-Right) === */}

            {/* === INIZIO SEZIONE: Header Carta (Nome e Categoria) === */}
            <div className={`card-header mt-2 px-2.5 py-1.5 rounded-lg border flex items-center justify-between gap-1 ${theme.headerBg}`}>
                <h2 className="font-extrabold text-sm uppercase tracking-wide text-stone-100 truncate">
                    {card.name}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 shrink-0">
                    {TYPE_LABELS[card.cardType] || card.cardType}
                </span>
            </div>
            {/* === FINE SEZIONE: Header Carta (Nome e Categoria) === */}

            {/* === INIZIO SEZIONE: Finestra Artwork Ampliata con Overlay Durabilità & Munizioni === */}
            <div className="card-image relative my-1.5 rounded-xl overflow-hidden border border-stone-800 bg-stone-950 h-38 shrink-0">
                {card.img && (
                    <img
                        className="w-full h-full object-cover object-center"
                        src={card.img}
                        alt={card.name}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[11px] font-bold">
                    {card.durability !== undefined ? (
                        <span
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border backdrop-blur-xs ${
                                card.durability === 1
                                    ? 'bg-red-950/90 border-red-500 text-red-200'
                                    : 'bg-stone-900/90 border-amber-600/70 text-amber-200'
                            }`}
                        >
                            <GiAnvilImpact /> {card.durability}/{card.maxDurability ?? card.durability}
                        </span>
                    ) : (
                        <span />
                    )}

                    {card.ammoType && (
                        <span
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border backdrop-blur-xs ${
                                hasAmmoForWeapon
                                    ? 'bg-stone-900/90 border-amber-500/70 text-amber-300'
                                    : 'bg-red-950/90 border-red-500 text-red-300 line-through'
                            }`}
                        >
                            <GiBullets /> {card.ammoType}
                        </span>
                    )}
                </div>
            </div>
            {/* === FINE SEZIONE: Finestra Artwork Ampliata con Overlay Durabilità & Munizioni === */}

            {/* === INIZIO SEZIONE: Box Effetti Testuale + Icone Tattiche === */}
            <div className="card-effects flex-1 flex flex-col justify-between bg-stone-950/90 px-2.5 py-2 rounded-xl border border-stone-800/90">
                <p className="text-[11px] leading-snug text-stone-300 text-center line-clamp-2">
                    {summaryText}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-2 pt-1 border-t border-stone-800/80 text-sm font-bold">
                    {card.effects?.damage && (
                        <span className="flex items-center gap-0.5 text-rose-400" title="Danno">
                            <GiPunch /> {card.effects.damage}
                        </span>
                    )}
                    {card.effects?.shield && (
                        <span className="flex items-center gap-0.5 text-sky-400" title="Scudo">
                            <GiShield /> {card.effects.shield}
                        </span>
                    )}
                    {card.effects?.heal && (
                        <span className="flex items-center gap-0.5 text-emerald-400" title="Cura">
                            <GiFirstAidKit /> {card.effects.heal}
                        </span>
                    )}
                    {card.effects?.stun && <GiKnockout className="text-amber-300" title="Stordimento" />}
                    {card.effects?.bleedChance && (
                        <span className="flex items-center gap-0.5 text-red-500 text-xs" title="Sanguinamento">
                            <GiBlood /> {Math.round(card.effects.bleedChance * 100)}%
                        </span>
                    )}
                    {card.effects?.dismemberChance && (
                        <span className="flex items-center gap-0.5 text-purple-400 text-xs" title="Mutilazione">
                            <GiBrokenBone /> {Math.round(card.effects.dismemberChance * 100)}%
                        </span>
                    )}
                    {card.effects?.cleanse && <GiBandageRoll className="text-teal-300" title="Rimuove Status" />}
                    {card.effects?.burnDamage && (
                        <span className="flex items-center gap-0.5 text-orange-400 text-xs" title="Ustione">
                            <GiFireflake /> {card.effects.burnDamage}
                        </span>
                    )}
                    {card.effects?.staminaGain && (
                        <span className="text-[11px] text-emerald-400">+{card.effects.staminaGain} STM</span>
                    )}
                    {card.effects?.draw && (
                        <span className="text-[11px] text-sky-300">+{card.effects.draw} Carte</span>
                    )}
                </div>

                {card.recipe && (
                    <div className="text-[9px] text-center text-emerald-400/90 uppercase font-bold tracking-wider truncate">
                        🛠️ Craft: {card.recipe.join(' + ')}
                    </div>
                )}
            </div>
            {/* === FINE SEZIONE: Box Effetti Testuale + Icone Tattiche === */}
        </div>
    );
}
// === FINE SEZIONE: Componente Singola Carta Giocabile con Frame TCG ===
