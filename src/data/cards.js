// === INIZIO SEZIONE: Import Asset Immagini Carte ===
import bottle from '../assets/img/Bottle.png'
import nineAmmo from '../assets/img/.9mmAmmo.png'
import twelveAmmo from '../assets/img/.12Ammo.png'
import thirty57Ammo from '../assets/img/.357Ammo.png'
import thirty08Ammo from '../assets/img/.308Ammo.png'
import MedKit from '../assets/img/KitMedico.png'
import glock19 from '../assets/img/Glock.jpg'
import huntingRifle from '../assets/img/.308Rifle.png'
import mp5 from '../assets/img/MP5.png'
import molotov from '../assets/img/Molotov.png'
import spineWood from '../assets/img/SpineWood.png'
import straccio from '../assets/img/straccio.png'
import ascia from '../assets/img/Ascia.png'
import shotgun from '../assets/img/.12Shotgun.png'
import coverImg from '../assets/img/Cover.png'
import dodgeImg from '../assets/img/Schivata.png'
import revolver357Img from '../assets/img/.357Revolver.png'
import alcoolImg from '../assets/img/alcool.png'
import shivImg from '../assets/img/Shiv.jpg'
import brickImg from '../assets/img/Brick.jpg'
import nailBombImg from '../assets/img/NailBomb.jpg'
import bladeImg from '../assets/img/Blade.jpg'
import explosiveImg from '../assets/img/Explosive.jpg'
import smokeBombImg from '../assets/img/SmokeBomb.jpg'
import supplementsImg from '../assets/img/Supplements.jpg'
import listenModeImg from '../assets/img/ListenMode.jpg'
import huntingBowImg from '../assets/img/HuntingBow.jpg'
import macheteImg from '../assets/img/Machete.jpg'
import shortyImg from '../assets/img/Shorty.jpg'
import flamethrowerImg from '../assets/img/Flamethrower.jpg'
import fedraVestImg from '../assets/img/FedraVest.jpg'
import cannedRationImg from '../assets/img/CannedRation.jpg'
import elDiabloImg from '../assets/img/ElDiablo.jpg'
import desperateSprintImg from '../assets/img/DesperateSprint.jpg'
import seraphiteHammerImg from '../assets/img/SeraphiteHammer.jpg'
import joelBrutalPunchImg from '../assets/img/JoelBrutalPunch.jpg'
import sarahWatchImg from '../assets/img/SarahWatch.jpg'
import tommySpotterImg from '../assets/img/TommySpotter.jpg'
import tommyCustomRifleImg from '../assets/img/TommyCustomRifle.jpg'
import ellieSwitchbladeImg from '../assets/img/EllieSwitchblade.jpg'
import seattleFuryImg from '../assets/img/SeattleFury.jpg'
import dinaSoundLureImg from '../assets/img/DinaSoundLure.jpg'
import abbyShoulderChargeImg from '../assets/img/AbbyShoulderCharge.jpg'
import abbyCombatAdrenalineImg from '../assets/img/AbbyCombatAdrenaline.jpg'
// === FINE SEZIONE: Import Asset Immagini Carte ===















export const CARD_DATABASE = [

    //carta lancio bottiglia
    {
        id: 'bottle_throw',
        cardType: 'action',
        tier: 'starter',
        retainable: false,
        name: 'glass bottle',
        cost: 1,
        img: bottle,
        effects: {
            stun: true,
            bleedChance: 0.5,
        }
    },

    // === INIZIO SEZIONE: Carta Cover (Copertura) ===
    {
        id: 'cover',
        cardType: 'action',
        tier: 'starter',
        retainable: false,
        name: 'cover',
        cost: 1,
        img: coverImg,
        effects: {
            shield: 5,
        }
    },
    // === FINE SEZIONE: Carta Cover (Copertura) ===

    //3.carta Melee Attacck --------------------------
    {
        id: 'melee_attack',
        cardType: 'attack',
        tier: 'starter',
        retainable: false,
        name: 'Melee',
        cost: 1,
        img: ascia,
        effects: {
            damage: 6,
        }
    },

    // === INIZIO SEZIONE: Carta Dodge (Schivata) ===
    {
        id: 'dodge',
        cardType: 'defense',
        tier: 'starter',
        retainable: false,
        name: 'Dodge',
        cost: 0,
        img: dodgeImg,
        effects: {
            shield: 4
        }
    },
    // === FINE SEZIONE: Carta Dodge (Schivata) ===

    // === INIZIO SEZIONE: Carta Mazza Chiodata (Spine-Wood) con Ricetta Crafting ===
    {
        id: 'spine-wood',
        cardType: 'weapon',
        tier: 'uncommon',
        retainable: true,
        name: 'spine-wood',
        cost: 2,
        durability: 2,
        recipe: ['melee_attack', 'blade'],
        img: spineWood,
        effects: {
            damage: 12,
            bleedChance: 1,
        }
    },
    // === FINE SEZIONE: Carta Mazza Chiodata (Spine-Wood) con Ricetta Crafting ===

    // === INIZIO SEZIONE: Carta Straccio (Rag) con Effetto Medicazione/Crafting ===
    {
        id: 'straccio',
        cardType: 'utility',
        tier: 'starter',
        retainable: true,
        name: 'Straccio',
        cost: 0,
        durability: 1,
        img: straccio,
        effects: {
            heal: 3,
            cleanse: ['bleed'],
            craftWith: 'alcool',
        }
    },
    // === FINE SEZIONE: Carta Straccio (Rag) con Effetto Medicazione/Crafting ===


    //carta Shotgun ------------------------------------------
    {
        id: 'shotgun',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        name: 'shotgun',
        cost: 1,
        durability: 2,
        ammoType: 'calibro.12',
        img: shotgun,
        effects: {
            damage: 25,
            bleedChance: 1,
            dismemberChance: 0.4
        }
    },

    //carta MP5 ------------------------------------------
    {
        id: 'mp5',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        name: 'MP5',
        cost: 1,
        durability: 3,
        ammoType: 'calibro.9',
        img: mp5,
        effects: {
            damage: 3 * 5,
            bleedChance: 0.8,
        }
    },

    //carta Glock ------------------------------------------
    {
        id: 'Glock9mm',
        cardType: 'weapon',
        tier: 'starter',
        retainable: true,
        name: 'Glock 19',
        cost: 1,
        durability: 7,
        ammoType: 'calibro.9',
        img: glock19,
        effects: {
            damage: 7,
            bleedChance: 0.8,
        }
    },

    // === INIZIO SEZIONE: Carta Munizioni Calibro .12 ===
    {
        id: 'ammo.12',
        cardType: 'ammo',
        tier: 'common',
        retainable: true,
        name: 'Ammo.12',
        cost: 0,
        durability: 1,
        ammoType: 'calibro.12',
        img: twelveAmmo,
        effects: {}
    },
    // === FINE SEZIONE: Carta Munizioni Calibro .12 ===

    //carta ammo 9 ------------------------------------------
    {
        id: 'Ammo.9mm',
        cardType: 'ammo',
        tier: 'starter',
        retainable: true,
        name: '.9mm',
        cost: 0,
        durability: 1,
        ammoType: 'calibro.9',
        img: nineAmmo,
        effects: {},
    },

    // === INIZIO SEZIONE: Carte Craftabili MedKit e Molotov con Ricetta ===
    {
        id: 'MedKit',
        cardType: 'utility',
        tier: 'uncommon',
        retainable: true,
        name: 'MediKit',
        cost: 2,
        durability: 1,
        recipe: ['straccio', 'alcool'],
        img: MedKit,
        effects: {
            heal: 15,
            cleanse: ['bleed']
        },
    },

    {
        id: 'molotov',
        cardType: 'weapon',
        tier: 'uncommon',
        retainable: true,
        name: 'molotov',
        cost: 1,
        durability: 1,
        recipe: ['straccio', 'alcool'],
        img: molotov,
        effects: {
            damage: 13,
            burnDamage: 3 * 3,
        }
    },
    // === FINE SEZIONE: Carte Craftabili MedKit e Molotov con Ricetta ===

    // === INIZIO SEZIONE: Carte Munizioni Calibro .357 e .308 ===
    {
        id: 'Ammo.357',
        cardType: 'ammo',
        tier: 'common',
        retainable: true,
        name: 'Ammo.357',
        cost: 0,
        durability: 1,
        ammoType: 'calibro.357',
        img: thirty57Ammo,
        effects: {}
    },

    {
        id: 'Ammo.308',
        cardType: 'ammo',
        tier: 'common',
        retainable: true,
        name: 'Ammo.308',
        cost: 0,
        durability: 1,
        ammoType: 'calibro.308',
        img: thirty08Ammo,
        effects: {}
    },
    // === FINE SEZIONE: Carte Munizioni Calibro .357 e .308 ===

    {
        id: 'huntingRifle',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        name: 'Hunting Rifle',
        cost: 2,
        durability: 3,
        ammoType: 'calibro.308',
        img: huntingRifle,
        effects: {
            damage: 20,
            bleedChance: 1,
            dismemberChance: 0.4
        }
    },
    {
        id: 'ascia',
        cardType: 'weapon',
        tier: 'uncommon',
        retainable: true,
        name: 'Ascia',
        cost: 1,
        durability: 3,
        img: ascia,
        effects: {
            damage: 20,
            bleedChance: 1,
            dismemberChance: 0.5
        }
    },

    // === INIZIO SEZIONE: Carta .357 Revolver ===
    {
        id: 'revolver_357',
        cardType: 'weapon',
        tier: 'uncommon',
        retainable: true,
        name: '.357 Revolver',
        cost: 1,
        durability: 4,
        ammoType: 'calibro.357',
        img: revolver357Img,
        effects: {
            damage: 14,
            bleedChance: 0.6,
        }
    },
    // === FINE SEZIONE: Carta .357 Revolver ===

    // === INIZIO SEZIONE: Carta Alcool (Disinfettante / Crafting) ===
    {
        id: 'alcool',
        cardType: 'utility',
        tier: 'common',
        retainable: true,
        name: 'Alcool',
        cost: 0,
        durability: 1,
        img: alcoolImg,
        effects: {
            heal: 4,
            cleanse: ['bleed', 'poison'],
            craftWith: 'straccio',
        }
    },
    // === FINE SEZIONE: Carta Alcool (Disinfettante / Crafting) ===

    // === INIZIO SEZIONE: Carta Coltello a Serramanico (Shiv) ===
    {
        id: 'shiv',
        cardType: 'weapon',
        tier: 'common',
        retainable: true,
        name: 'Shiv',
        cost: 0,
        durability: 1,
        recipe: ['blade', 'straccio'],
        img: shivImg,
        effects: {
            damage: 8,
            bonusStunDamage: 8,
            bleedChance: 0.7,
        }
    },
    // === FINE SEZIONE: Carta Coltello a Serramanico (Shiv) ===

    // === INIZIO SEZIONE: Carta Mattone (Brick) ===
    {
        id: 'brick_throw',
        cardType: 'attack',
        tier: 'common',
        retainable: false,
        name: 'Brick',
        cost: 1,
        img: brickImg,
        effects: {
            damage: 5,
            stun: true,
        }
    },
    // === FINE SEZIONE: Carta Mattone (Brick) ===

    // === INIZIO SEZIONE: Carta Bomba Chiodata (Nail Bomb) ===
    {
        id: 'nail_bomb',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        name: 'Nail Bomb',
        cost: 2,
        durability: 1,
        recipe: ['blade', 'explosive'],
        img: nailBombImg,
        effects: {
            damage: 16,
            bleedChance: 1,
            dismemberChance: 0.6,
        }
    },
    // === FINE SEZIONE: Carta Bomba Chiodata (Nail Bomb) ===

    // === INIZIO SEZIONE: Carta Lama / Forbici (Blade - Materiale Crafting) ===
    {
        id: 'blade',
        cardType: 'utility',
        tier: 'common',
        retainable: true,
        name: 'Blade',
        cost: 0,
        durability: 1,
        img: bladeImg,
        effects: {
            damage: 4,
            selfDamage: 1,
            bleedChance: 0.5,
            craftWith: ['straccio', 'explosive', 'melee_attack'],
        }
    },
    // === FINE SEZIONE: Carta Lama / Forbici (Blade - Materiale Crafting) ===

    // === INIZIO SEZIONE: Carta Polvere Esplosiva (Explosive - Solo Materiale Crafting) ===
    {
        id: 'explosive',
        cardType: 'utility',
        tier: 'common',
        retainable: true,
        craftOnly: true,
        name: 'Explosive',
        cost: 0,
        durability: 1,
        img: explosiveImg,
        effects: {
            craftWith: ['blade', 'straccio'],
        }
    },
    // === FINE SEZIONE: Carta Polvere Esplosiva (Explosive - Solo Materiale Crafting) ===

    // === INIZIO SEZIONE: Carta Bomba Fumogena (Smoke Bomb) ===
    {
        id: 'smoke_bomb',
        cardType: 'utility',
        tier: 'uncommon',
        retainable: true,
        name: 'Smoke Bomb',
        cost: 1,
        durability: 1,
        recipe: ['explosive', 'straccio'],
        img: smokeBombImg,
        effects: {
            shield: 8,
            stun: true,
        }
    },
    // === FINE SEZIONE: Carta Bomba Fumogena (Smoke Bomb) ===

    // === INIZIO SEZIONE: Carta Integratori / Pillole (Supplements) ===
    {
        id: 'supplements',
        cardType: 'utility',
        tier: 'uncommon',
        retainable: true,
        name: 'Supplements',
        cost: 0,
        durability: 1,
        img: supplementsImg,
        effects: {
            staminaGain: 2,
            heal: 3,
        }
    },
    // === FINE SEZIONE: Carta Integratori / Pillole (Supplements) ===

    // === INIZIO SEZIONE: Carta Modalità Ascolto (Listen Mode) ===
    {
        id: 'listen_mode',
        cardType: 'action',
        tier: 'starter',
        retainable: false,
        name: 'Listen Mode',
        cost: 0,
        img: listenModeImg,
        effects: {
            draw: 2,
            shield: 2,
        }
    },
    // === FINE SEZIONE: Carta Modalità Ascolto (Listen Mode) ===

    // === INIZIO SEZIONE: Carta Arco da Caccia (Hunting Bow) ===
    {
        id: 'hunting_bow',
        cardType: 'weapon',
        tier: 'uncommon',
        retainable: true,
        name: 'Hunting Bow',
        cost: 1,
        durability: 3,
        img: huntingBowImg,
        effects: {
            damage: 11,
            bleedChance: 0.8,
            pierceShield: true,
        }
    },
    // === FINE SEZIONE: Carta Arco da Caccia (Hunting Bow) ===

    // === INIZIO SEZIONE: Carta Machete ===
    {
        id: 'machete',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        name: 'Machete',
        cost: 1,
        durability: 3,
        img: macheteImg,
        effects: {
            damage: 14,
            bonusBleedDamage: 6,
            bleedChance: 0.9,
            dismemberChance: 0.4,
        }
    },
    // === FINE SEZIONE: Carta Machete ===

    // === INIZIO SEZIONE: Carta Fucile a Canne Mozze (Shorty) ===
    {
        id: 'shorty',
        cardType: 'weapon',
        tier: 'uncommon',
        retainable: true,
        name: 'Shorty',
        cost: 0,
        durability: 2,
        ammoType: 'calibro.12',
        img: shortyImg,
        effects: {
            damage: 16,
            bleedChance: 0.9,
            dismemberChance: 0.35,
        }
    },
    // === FINE SEZIONE: Carta Fucile a Canne Mozze (Shorty) ===

    // === INIZIO SEZIONE: Carta Lanciafiamme (Flamethrower) ===
    {
        id: 'flamethrower',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        name: 'Flamethrower',
        cost: 2,
        durability: 2,
        img: flamethrowerImg,
        effects: {
            damage: 15,
            burnDamage: 5 * 3,
        }
    },
    // === FINE SEZIONE: Carta Lanciafiamme (Flamethrower) ===

    // === INIZIO SEZIONE: Carta Corazza Tattica FEDRA (FEDRA Vest) ===
    {
        id: 'fedra_vest',
        cardType: 'defense',
        tier: 'uncommon',
        retainable: false,
        name: 'FEDRA Vest',
        cost: 2,
        img: fedraVestImg,
        effects: {
            shield: 15,
        }
    },
    // === FINE SEZIONE: Carta Corazza Tattica FEDRA (FEDRA Vest) ===

    // === INIZIO SEZIONE: Carta Razione di Sopravvivenza (Canned Ration) ===
    {
        id: 'canned_ration',
        cardType: 'utility',
        tier: 'common',
        retainable: true,
        durability: 1,
        name: 'Canned Ration',
        cost: 0,
        img: cannedRationImg,
        effects: {
            heal: 6,
            draw: 1,
        }
    },
    // === FINE SEZIONE: Carta Razione di Sopravvivenza (Canned Ration) ===

    // === INIZIO SEZIONE: Carta El Diablo (Pistola da Caccia .357 Ottica) ===
    {
        id: 'el_diablo',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        durability: 3,
        ammoType: 'calibro.357',
        name: 'El Diablo',
        cost: 1,
        img: elDiabloImg,
        effects: {
            damage: 22,
            pierceShield: true,
            bleedChance: 1,
        }
    },
    // === FINE SEZIONE: Carta El Diablo (Pistola da Caccia .357 Ottica) ===

    // === INIZIO SEZIONE: Carta Scatto Disperato (Desperate Sprint) ===
    {
        id: 'desperate_sprint',
        cardType: 'action',
        tier: 'common',
        retainable: false,
        name: 'Desperate Sprint',
        cost: 0,
        img: desperateSprintImg,
        effects: {
            selfDamage: 2,
            staminaGain: 2,
            draw: 1,
        }
    },
    // === FINE SEZIONE: Carta Scatto Disperato (Desperate Sprint) ===

    // === INIZIO SEZIONE: Carta Martello dei Serafiti (Seraphite Hammer) ===
    {
        id: 'seraphite_hammer',
        cardType: 'weapon',
        tier: 'rare',
        retainable: true,
        durability: 3,
        name: 'Seraphite Hammer',
        cost: 2,
        img: seraphiteHammerImg,
        effects: {
            damage: 18,
            pierceShield: true,
            dismemberChance: 0.5,
        }
    },
    // === FINE SEZIONE: Carta Martello dei Serafiti (Seraphite Hammer) ===

    // === INIZIO SEZIONE: Carte Signature Joel Miller (Pugno Brutale & Orologio di Sarah) ===
    {
        id: 'joel_brutal_punch',
        cardType: 'attack',
        tier: 'signature',
        heroId: 'Joel',
        signatureType: 'starter',
        retainable: false,
        name: 'Pugno di Joel',
        cost: 1,
        img: joelBrutalPunchImg,
        effects: {
            damage: 9,
            shield: 4,
            stun: true,
        }
    },
    {
        id: 'sarah_watch',
        cardType: 'utility',
        tier: 'signature',
        heroId: 'Joel',
        signatureType: 'relic',
        retainable: true,
        durability: 2,
        name: 'Orologio di Sarah',
        cost: 0,
        img: sarahWatchImg,
        effects: {
            heal: 10,
            shield: 6,
            staminaGain: 1,
        }
    },
    // === FINE SEZIONE: Carte Signature Joel Miller (Pugno Brutale & Orologio di Sarah) ===

    // === INIZIO SEZIONE: Carte Signature Tommy Miller (Mira Assistita & Fucile di Jackson) ===
    {
        id: 'tommy_spotter',
        cardType: 'action',
        tier: 'signature',
        heroId: 'Tommy',
        signatureType: 'starter',
        retainable: false,
        name: 'Mira Assistita .308',
        cost: 0,
        img: tommySpotterImg,
        effects: {
            shield: 4,
            draw: 1,
            grantAmmo: 'calibro.308',
        }
    },
    {
        id: 'tommy_custom_rifle',
        cardType: 'weapon',
        tier: 'signature',
        heroId: 'Tommy',
        signatureType: 'relic',
        retainable: true,
        durability: 3,
        ammoType: 'calibro.308',
        name: 'Fucile di Jackson',
        cost: 1,
        img: tommyCustomRifleImg,
        effects: {
            damage: 24,
            pierceShield: true,
            bleedChance: 1,
            dismemberChance: 0.5,
        }
    },
    // === FINE SEZIONE: Carte Signature Tommy Miller (Mira Assistita & Fucile di Jackson) ===

    // === INIZIO SEZIONE: Carte Signature Ellie Williams (Coltello a Scatto & Furia di Seattle) ===
    {
        id: 'ellie_switchblade',
        cardType: 'weapon',
        tier: 'signature',
        heroId: 'Ellie',
        signatureType: 'starter',
        retainable: true,
        durability: 3,
        name: 'Coltello di Ellie',
        cost: 0,
        img: ellieSwitchbladeImg,
        effects: {
            damage: 7,
            bonusStunDamage: 6,
            bleedChance: 0.85,
        }
    },
    {
        id: 'seattle_fury',
        cardType: 'attack',
        tier: 'signature',
        heroId: 'Ellie',
        signatureType: 'relic',
        retainable: false,
        name: 'Furia di Seattle',
        cost: 1,
        img: seattleFuryImg,
        effects: {
            damage: 14,
            bonusBleedDamage: 8,
            staminaGain: 1,
            draw: 1,
        }
    },
    // === FINE SEZIONE: Carte Signature Ellie Williams (Coltello a Scatto & Furia di Seattle) ===

    // === INIZIO SEZIONE: Carte Signature Dina (Esca Sonora & Trappola Radio FEDRA) ===
    {
        id: 'dina_sound_lure',
        cardType: 'utility',
        tier: 'signature',
        heroId: 'Dina',
        signatureType: 'starter',
        retainable: false,
        name: 'Esca Sonora',
        cost: 0,
        img: dinaSoundLureImg,
        effects: {
            stun: true,
            shield: 3,
            draw: 1,
        }
    },
    {
        id: 'dina_radio_trap',
        cardType: 'weapon',
        tier: 'signature',
        heroId: 'Dina',
        signatureType: 'relic',
        retainable: true,
        durability: 2,
        name: 'Trappola Radio',
        cost: 1,
        img: explosiveImg,
        effects: {
            damage: 16,
            shield: 5,
            bleedChance: 1,
        }
    },
    // === FINE SEZIONE: Carte Signature Dina (Esca Sonora & Trappola Radio FEDRA) ===

    // === INIZIO SEZIONE: Carte Signature Abby Anderson (Carica a Spallata & Adrenalina WLF) ===
    {
        id: 'abby_shoulder_charge',
        cardType: 'attack',
        tier: 'signature',
        heroId: 'Abby',
        signatureType: 'starter',
        retainable: false,
        name: 'Carica a Spallata',
        cost: 1,
        img: abbyShoulderChargeImg,
        effects: {
            damage: 10,
            shield: 6,
        }
    },
    {
        id: 'abby_combat_adrenaline',
        cardType: 'action',
        tier: 'signature',
        heroId: 'Abby',
        signatureType: 'relic',
        retainable: false,
        name: 'Adrenalina WLF',
        cost: 0,
        img: abbyCombatAdrenalineImg,
        effects: {
            heal: 7,
            staminaGain: 2,
            draw: 1,
        }
    },
    // === FINE SEZIONE: Carte Signature Abby Anderson (Carica a Spallata & Adrenalina WLF) ===

    // === INIZIO SEZIONE: Carte Signature Lev (Scocca Rapida & Frecce Incendiarie) ===
    {
        id: 'lev_rapid_shot',
        cardType: 'attack',
        tier: 'signature',
        heroId: 'Lev',
        signatureType: 'starter',
        retainable: false,
        name: 'Scocca Rapida',
        cost: 0,
        img: huntingBowImg,
        effects: {
            damage: 8,
            pierceShield: true,
            draw: 1,
        }
    },
    {
        id: 'lev_incendiary_arrows',
        cardType: 'weapon',
        tier: 'signature',
        heroId: 'Lev',
        signatureType: 'relic',
        retainable: true,
        durability: 2,
        name: 'Frecce Incendiarie',
        cost: 1,
        img: molotov,
        effects: {
            damage: 14,
            pierceShield: true,
            burnDamage: 9,
        }
    }
    // === FINE SEZIONE: Carte Signature Lev (Scocca Rapida & Frecce Incendiarie) ===
]