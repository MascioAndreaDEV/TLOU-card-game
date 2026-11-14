// === INIZIO SEZIONE: Import Immagini Nemici ===
import runnerImg from '../assets/img/Runner.jpg';
import clickerImg from '../assets/img/Clicker.png';
import stalkerImg from '../assets/img/Stalker.jpg';
import seraphiteBruteImg from '../assets/img/SeraphiteBrute.jpg';
import wlfSoldierImg from '../assets/img/WlfSoldier.jpg';
import wlfGuardDogImg from '../assets/img/WlfGuardDog.jpg';
import wlfEnforcerImg from '../assets/img/WlfEnforcer.jpg';
import shamblerImg from '../assets/img/Shambler.jpg';
import bloaterImg from '../assets/img/Bloater.jpg';
// === FINE SEZIONE: Import Immagini Nemici ===

// === INIZIO SEZIONE: Database Entità Nemiche ===
export const ENEMIES_DATABASE = [

    // === INIZIO SEZIONE: Nemico RUNNER ===
    {
        id: 'runner',
        name: 'RUNNER',
        type: 'infected',
        hp: 45,
        image: runnerImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'morso',
                name: 'morso',
                damage: 2,
            },
            {
                id: 'aggrappata',
                name: 'aggrappata',
                damage: 3,
            },
            {
                id: 'spinta',
                name: 'spinta',
                damage: 1,
            },
            {
                id: 'rugito',
                name: 'rugito',
                shield: 3,
            }
        ]
    },
    // === FINE SEZIONE: Nemico RUNNER ===

    // === INIZIO SEZIONE: Nemico CLICKER ===
    {
        id: 'clicker',
        name: 'CLICKER',
        type: 'infected',
        hp: 80,
        image: clickerImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'colpo',
                name: 'colpo',
                damage: 3,
            },
            {
                id: 'presa',
                name: 'presa',
                damage: 7,
            },
            {
                id: 'attacco_velenoso',
                name: 'attacco velenoso',
                damage: 4,
                effects: [
                    {
                        isPoisoned: true,
                        damagePoison: 2,
                        duration: 2,
                    }
                ]
            },
            {
                id: 'ruggito_assordante',
                name: 'ruggito assordante',
                shield: 6,
            }
        ]
    },
    // === FINE SEZIONE: Nemico CLICKER ===

    // === INIZIO SEZIONE: Nemico STALKER ===
    {
        id: 'stalker',
        name: 'STALKER',
        type: 'infected',
        hp: 60,
        damage: 2,
        image: stalkerImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'artigliata',
                name: 'artigliata',
                damage: 6,
                effects: [
                    {
                        isBleeding: true,
                        duration: 2,
                        damageBleeding: 2,
                    }
                ]
            },
            {
                id: 'presa_infame',
                name: 'presa infame',
                damage: 5,
            },
            {
                id: 'imboscata',
                name: 'imboscata',
                damage: 8,
            },
            {
                id: 'nascosto',
                name: 'nascosto',
                shield: 3,
            }
        ]
    },
    // === FINE SEZIONE: Nemico STALKER ===

    // === INIZIO SEZIONE: Nemico WLF GUARD DOG ===
    {
        id: 'wlf_guard_dog',
        name: 'WLF GUARD DOG',
        type: 'human',
        hp: 55,
        image: wlfGuardDogImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'azzannata_gola',
                name: 'azzannata alla gola',
                damage: 7,
                effects: [
                    {
                        isBleeding: true,
                        duration: 2,
                        damageBleeding: 3,
                    }
                ]
            },
            {
                id: 'balzo_rapido',
                name: 'balzo rapido',
                damage: 4,
                shield: 4,
            },
            {
                id: 'ringhio_feroce',
                name: 'ringhio feroce',
                shield: 5,
            }
        ]
    },
    // === FINE SEZIONE: Nemico WLF GUARD DOG ===

    // === INIZIO SEZIONE: Nemico WLF SOLDIER ===
    {
        id: 'wlf_soldier',
        name: 'WLF SOLDIER',
        type: 'human',
        hp: 90,
        image: wlfSoldierImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'raffica_assalto',
                name: 'raffica fucile',
                damage: 9,
            },
            {
                id: 'tiro_copertura',
                name: 'tiro in copertura',
                damage: 5,
                shield: 6,
            },
            {
                id: 'granata_frammentazione',
                name: 'granata a frammentazione',
                damage: 11,
                effects: [
                    {
                        isBleeding: true,
                        duration: 2,
                        damageBleeding: 2,
                    }
                ]
            }
        ]
    },
    // === FINE SEZIONE: Nemico WLF SOLDIER ===

    // === INIZIO SEZIONE: Nemico WLF ENFORCER ===
    {
        id: 'wlf_enforcer',
        name: 'WLF ENFORCER',
        type: 'human',
        hp: 110,
        image: wlfEnforcerImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'colpo_shotgun',
                name: 'colpo di shotgun',
                damage: 13,
            },
            {
                id: 'assetto_antisommossa',
                name: 'assetto antisommossa',
                shield: 12,
            },
            {
                id: 'fumogeno_tossico',
                name: 'fumogeno tossico',
                damage: 4,
                effects: [
                    {
                        isPoisoned: true,
                        damagePoison: 2,
                        duration: 2,
                    }
                ]
            }
        ]
    },
    // === FINE SEZIONE: Nemico WLF ENFORCER ===

    // === INIZIO SEZIONE: Nemico SERAPHITE BRUTE ===
    {
        id: 'seraphite_brute',
        name: 'SERAPHITE BRUTE',
        type: 'human',
        hp: 135,
        image: seraphiteBruteImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'schianto_martello',
                name: 'schianto col martello',
                damage: 14,
            },
            {
                id: 'fendente_uncinato',
                name: 'fendente uncinato',
                damage: 8,
                effects: [
                    {
                        isBleeding: true,
                        duration: 2,
                        damageBleeding: 3,
                    }
                ]
            },
            {
                id: 'fischio_guerra',
                name: 'fischio di guerra',
                damage: 4,
                shield: 7,
            }
        ]
    },
    // === FINE SEZIONE: Nemico SERAPHITE BRUTE ===

    // === INIZIO SEZIONE: Nemico SHAMBLER ===
    {
        id: 'shambler',
        name: 'SHAMBLER',
        type: 'infected',
        hp: 120,
        image: shamblerImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'nube_acida',
                name: 'nube di spore acide',
                damage: 5,
                effects: [
                    {
                        isPoisoned: true,
                        damagePoison: 4,
                        duration: 2,
                    }
                ]
            },
            {
                id: 'carica_pustolosa',
                name: 'carica pustolosa',
                damage: 11,
            },
            {
                id: 'corazza_fungina',
                name: 'corazza fungina',
                shield: 8,
            }
        ]
    },
    // === FINE SEZIONE: Nemico SHAMBLER ===

    // === INIZIO SEZIONE: Nemico BLOATER ===
    {
        id: 'bloater',
        name: 'BLOATER',
        type: 'infected',
        hp: 180,
        image: bloaterImg,
        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },
        moves: [
            {
                id: 'spinta_brutale',
                name: 'spinta brutale',
                damage: 9,
            },
            {
                id: 'lancio_bombe_acide',
                name: 'lancio di bombe acide',
                damage: 15,
            },
            {
                id: 'spruzzo_acido',
                name: 'spruzzo acido',
                damage: 4,
                effects: [
                    {
                        isPoisoned: true,
                        damagePoison: 3,
                        duration: 2,
                    }
                ]
            },
            {
                id: 'ruggito_terrificante',
                name: 'ruggito terrificante',
                shield: 6,
            }
        ]
    },
    // === FINE SEZIONE: Nemico BLOATER ===
];
// === FINE SEZIONE: Database Entità Nemiche ===
