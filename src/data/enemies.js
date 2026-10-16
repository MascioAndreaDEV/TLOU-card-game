export const ENEMIES_DATABASE = [

    //COSTRUZIONE ENTITÀ NEMICO RUNNER


    {
        id: 'runner',
        name: 'runner',
        type: 'infected',
        hp: 25,

        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,  
        },

        moves: [
            {
                id:'morso',
                name: 'morso',
                damage: 2,
            },
            {
                id:'aggrappata',
                name: 'aggrappata',
                damage: 3,
            },
            {
                id:'spinta',
                name: 'spinta',
                damage: 1,
            },
            {
                id:'rugito',
                name: 'rugito',
                shield: 3,
            }
        ]
    },

    //COSTRUZIONE ENTITÀ NEMICO CLICKER

    {
        id: 'clicker',
        name: 'clicker',
        type: 'infected',
        hp: 50,

        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,  
        },

        moves: [
            {   
                id:'colpo',
                name: 'colpo',
                damage: 3,
            },
            {   
                id:'presa',
                name: 'presa',
                damage: 7,
            },
            {   
                id:'attacco_velenoso',
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
                id:'ruggito_assordante',
                name: 'ruggito assordante',
                shield: 6
            }
        ]
    },

    //COSTRUZIONE ENTITÀ NEMICO STALKER

    {
        id: 'stalker',
        name: 'stalker',
        type: 'infected',
        hp: 35,
        damage: 2,

        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },

        moves: [
            {   
                id:'artigliata',
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
                id:'presa_infame',
                name: 'presa infame',
                damage: 5,
            },
            {   
                id:'imboscata',
                name: 'imboscata',
                damage: 8,
            },
            {   
                id:'nascosto',
                name: 'nascosto',
                shield: 3
            }
        ]
    },

    //COSTRUZIONE ENTITÀ NEMICO BLOATER

    {
        id: 'bloater',
        name: 'bloater',
        type: 'infected',
        hp: 150,

        status: {
            isStun: false,
            isBleeding: false,
            isDismember: false,
            isPoisoned: false,
        },

        moves: [
            {   
                id:'spinta_brutale',
                name: 'spinta brutale',
                damage: 9,
            },
            {   
                id:'lancio_bombe_acide',
                name: 'lancio di bombe acide',
                damage: 15,
            },
            {   
                id:'spruzzo_acido',
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
                id:'ruggito_terrificante',
                name: 'nascosto',
                shield: 3
            }
        ]
    },

]