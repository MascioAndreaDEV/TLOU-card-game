import { CARD_DATABASE } from "../data/cards";
import Card from "./card";

export default function Compendium() {
    return (
        <div className="compendium flex justify-center gap-4 p-6 flex-wrap"> {

            CARD_DATABASE.map((card) => {
                return (
                    <Card key={card.id} card={card} />)
            })
        } </div>
    )
}
