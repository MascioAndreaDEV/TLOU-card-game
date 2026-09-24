import joel from '../assets/img/joel.jpg';
import tommy from '../assets/img/tommy.jpg';
import ellie from '../assets/img/ellie.jpg';
import dina from '../assets/img/Dina.jpg';
import abby from '../assets/img/abby.jpg';






export const CHARACTERS_DATABASE = [

    {
        id: 'Joel',
        name: 'Joel Miller',
        hp: 85,
        image: joel,
        status: {
            isStun: false,
            isBleeding: false,
        },
    },

    {
        id: 'Tommy',
        name: 'Tommy Miller',
        hp: 90,
        image: tommy,
        status: {
            isStun: false,
            isBleeding: false,
        },
    },

    {
        id: 'Ellie',
        name: 'Ellie Williams',
        hp: 75,
        image: ellie,
        status: {
            isStun: false,
            isBleeding: false,
        },
    },

    {
        id: 'Dina',
        name: 'Dina',
        image: dina,
        hp: 75,
        status: {
            isStun: false,
            isBleeding: false,
        },
    },

    {
        id: 'Abby',
        name: 'Abby Anderson',
        hp: 100,
        image: abby,
        status: {
            isStun: false,
            isBleeding: false,
        },
    },


    {
        id: 'Lev',
        name: 'Lev',
        hp: 65,
        status: {
            isStun: false,
            isBleeding: false,
        },
    }
]