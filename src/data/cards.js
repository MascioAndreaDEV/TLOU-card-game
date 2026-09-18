export const CARD_DATABASE = [

    //carta lancio bottiglia
    {

        //dati statici della carta
        id: 'bottle_throw',
        cardType: 'action',
        retainable: false,
        name: 'glass bottle',
        cost: 1,

        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {
            stun: true,
            bleedChance: 0.5,
        }
    },

    //-------------------------------------------------

    // 2. carta: Copertura

    {
        id: 'cover',
        cardType: 'action',
        retainable: false,
        name: 'cover',
        cost: 1,
        effects: {
            shield: 5,
        }
    },

    //3.carta Melee Attacck --------------------------


    {
        id: 'melee_attack',
        cardType: 'attack',
        retainable: false,
        name: 'Melee',
        cost: 1,

        effects: {
            damage: 6,
        }
    },


    //4.Carta Dodge -------------------------------------
    {
        id: 'dodge',
        cardType: 'defense',
        retainable: false,
        name: 'Dodge',
        cost: 0,
        effects: {
            shield: 4
        }
    },

    //carta mazza chiodata
    {

        //dati statici della carta
        id: 'spine-wood',
        cardType: 'weapon',
        retainable: true,
        name: 'spine-wood',
        cost: 2,
        durability: 2,

        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {
            damage: 12,
            bleedChance: 1,
        }
    },

    {
        id: 'shotgun',
        cardType: 'weapon',
        retainable: true,
        name: 'shotgun',
        cost: 1,
        durability: 2,
        ammoType: 'calibro12',

        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {
            damage: 25,
            bleedChance: 1,
            dismemberChance: 0.4
        }
    },


]