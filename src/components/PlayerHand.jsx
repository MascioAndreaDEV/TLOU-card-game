import { CARD_DATABASE } from "../data/cards";
import Card from "./card";

export default function PayerHand() {
    return (
        <div className="flex justify-center gap-4 p-4 flex-wrap"> {CARD_DATABASE.slice(0, 4).map((card => {
            return (<Card key={card.id} card={card}></Card>
            )
        })
        )}</div>
    )
}
