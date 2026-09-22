import bottle from '../assets/img/bottle.png'
import nineAmmo from '../assets/img/.9mmAmmo.png'
import twelveAmmo from '../assets/img/.12Ammo.png'
import thirty57Ammo from '../assets/img/.357Ammo.png'
import thirty08Ammo from '../assets/img/.308Ammo.png'
import MedKit from '../assets/img/KitMedico.png'
import glock19 from '../assets/img/Glock.jpg'
import huntingRifle from '../assets/img/.308Rifle.png'
import mp5 from '../assets/img/MP5.png'
import molotov from '../assets/img/Molotov.png'
import spineWood from '../assets/img/spineWood.png'
import straccio from '../assets/img/straccio.png'
import ascia from '../assets/img/Ascia.png'
import melee from '../assets/img/bottle.png'
import shotgun from '../assets/img/.12Shotgun.png'















export const CARD_DATABASE = [

    //carta lancio bottiglia
    {

        //dati statici della carta
        id: 'bottle_throw',
        cardType: 'action',
        retainable: false,
        name: 'glass bottle',
        cost: 1,
        img: bottle,

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
        img: spineWood,

        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {
            damage: 12,
            bleedChance: 1,
        }
    },
    {
        id: 'straccio',
        cardType: 'weapon',
        retainable: true,
        name: 'straccio',
        cost: 0,
        durability: 1,
        img: straccio,

        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {

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
        img: shotgun,
        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {
            damage: 25,
            bleedChance: 1,
            dismemberChance: 0.4
        }
    },

    {
        id: 'mp5',
        cardType: 'weapon',
        retainable: true,
        name: 'MP5',
        cost: 1,
        durability: 3,
        ammoType: 'calibro.9',
        img: mp5,

        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {
            damage: 3 * 5,
            bleedChance: 0.8,
        }
    },

    {
        id: 'Glock9mm',
        cardType: 'weapon',
        retainable: true,
        name: 'Glock 19',
        cost: 1,
        durability: 7,
        ammoType: 'calibro.9',
        img: glock19,

        // EFFECT dice qualsi osno gli effetti della carta 
        effects: {
            damage: 7,
            bleedChance: 0.8,
        }
    },


    {
        id: 'ammo.12',
        cardType: 'ammo',
        retainable: true,
        name: 'Ammo.12',
        cost: 0,
        durability: 1,
        img: twelveAmmo,
        effects: {}

    },
    {
        id: 'Ammo.9mm',
        cardType: 'ammo',
        retainable: true,
        name: '.9mm',
        cost: 0,
        durability: 1,
        ammoType: 'calibro.9',
        img: nineAmmo,
        effects: {},

    },

    {
        id: 'MedKit',
        cardType: 'utility',
        retainable: true,
        name: 'MediKit',
        cost: 2,
        durability: 1,
        img: MedKit,
        effects: {

            heal: 15,
            cleanse: ['bleed']

        },

    },

    {
        id: 'molotov',
        cardType: 'weapon',
        retainable: true,
        name: 'molotov',
        cost: 2,
        durability: 1,
        img: molotov,
        effects: {
            damage: 13,
            burnDamage: 3 * 3,
        }

    },
]