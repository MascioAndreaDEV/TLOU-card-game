import { CARD_DATABASE } from "../data/cards";
import Card from "./card";


export default function PayerHand({ gestioneDanno, gestioneStamina }) {


    

    return (
        <div className="flex justify-center gap-4 p-4 flex-wrap"> {CARD_DATABASE.slice(0, 4).map((card => {
            return (<Card gestioneDanno={gestioneDanno} gestioneStamina={gestioneStamina} key={card.id} card={card}></Card>
            )
        })
        )}</div>
    )
}
