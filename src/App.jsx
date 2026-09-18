import { CARD_DATABASE } from "./data/cards";
import Card from "./components/card";

export default function App() {
    return (

        <div className="game-container">
            <h1>The Last Of Us: RogueLike DeckBuilder Game</h1>

            <div className="player-hand"> {

                CARD_DATABASE.map((card) => {
                    return (
                        <Card key={card.id} card={card} />)
                })
            } </div>

        </div>)
}