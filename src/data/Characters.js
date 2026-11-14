// === INIZIO SEZIONE: Import Immagini Personaggi ===
import joel from '../assets/img/Joel.jpg';
import tommy from '../assets/img/Tommy.jpg';
import ellie from '../assets/img/Ellie.jpg';
import dina from '../assets/img/Dina.jpg';
import abby from '../assets/img/Abby.jpg';
import lev from '../assets/img/Lev.jpg';
// === FINE SEZIONE: Import Immagini Personaggi ===

// === INIZIO SEZIONE: Database Sopravvissuti con Passive Lore e Carte Signature ===
export const CHARACTERS_DATABASE = [
    // === INIZIO SEZIONE: Personaggio Joel Miller ===
    {
        id: 'Joel',
        name: 'Joel Miller',
        hp: 85,
        image: joel,
        starterSignatureId: 'joel_brutal_punch',
        unlockableSignatureId: 'sarah_watch',
        passive: {
            id: 'hardened_veteran',
            name: 'Veterano Indurito',
            description: 'Inizia ogni scontro con +4 Scudo.',
        },
        status: {
            isStun: false,
            isBleeding: false,
        },
    },
    // === FINE SEZIONE: Personaggio Joel Miller ===

    // === INIZIO SEZIONE: Personaggio Tommy Miller ===
    {
        id: 'Tommy',
        name: 'Tommy Miller',
        hp: 90,
        image: tommy,
        starterSignatureId: 'tommy_spotter',
        unlockableSignatureId: 'tommy_custom_rifle',
        passive: {
            id: 'sniper_eye',
            name: 'Occhio del Cecchino',
            description: 'Le armi da fuoco infliggono +3 Danni extra.',
        },
        status: {
            isStun: false,
            isBleeding: false,
        },
    },
    // === FINE SEZIONE: Personaggio Tommy Miller ===

    // === INIZIO SEZIONE: Personaggio Ellie Williams ===
    {
        id: 'Ellie',
        name: 'Ellie Williams',
        hp: 75,
        image: ellie,
        starterSignatureId: 'ellie_switchblade',
        unlockableSignatureId: 'seattle_fury',
        passive: {
            id: 'cordyceps_immunity',
            name: 'Immunità Cordyceps',
            description: 'Completamente immune agli effetti di Veleno/Spore.',
        },
        status: {
            isStun: false,
            isBleeding: false,
        },
    },
    // === FINE SEZIONE: Personaggio Ellie Williams ===

    // === INIZIO SEZIONE: Personaggio Dina ===
    {
        id: 'Dina',
        name: 'Dina',
        hp: 75,
        image: dina,
        starterSignatureId: 'dina_sound_lure',
        unlockableSignatureId: 'dina_radio_trap',
        passive: {
            id: 'tactical_engineer',
            name: 'Ingegnera Tattica',
            description: 'Ogni volta che assembli un oggetto (Crafting) ottieni +4 Scudo.',
        },
        status: {
            isStun: false,
            isBleeding: false,
        },
    },
    // === FINE SEZIONE: Personaggio Dina ===

    // === INIZIO SEZIONE: Personaggio Abby Anderson ===
    {
        id: 'Abby',
        name: 'Abby Anderson',
        hp: 100,
        image: abby,
        starterSignatureId: 'abby_shoulder_charge',
        unlockableSignatureId: 'abby_combat_adrenaline',
        passive: {
            id: 'wlf_brawler',
            name: 'Forza Bruta WLF',
            description: 'Tutte le carte Attacco corpo a corpo infliggono +2 Danni.',
        },
        status: {
            isStun: false,
            isBleeding: false,
        },
    },
    // === FINE SEZIONE: Personaggio Abby Anderson ===

    // === INIZIO SEZIONE: Personaggio Lev ===
    {
        id: 'Lev',
        name: 'Lev',
        hp: 65,
        image: lev,
        starterSignatureId: 'lev_rapid_shot',
        unlockableSignatureId: 'lev_incendiary_arrows',
        passive: {
            id: 'silent_step',
            name: 'Passo Silenzioso',
            description: 'Pesca +1 Carta extra (6 carte) nel primo turno di ogni scontro.',
        },
        status: {
            isStun: false,
            isBleeding: false,
        },
    },
    // === FINE SEZIONE: Personaggio Lev ===
];
// === FINE SEZIONE: Database Sopravvissuti con Passive Lore e Carte Signature ===
