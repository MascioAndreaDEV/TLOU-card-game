import { CARD_DATABASE } from "./data/cards";
import Card from "./components/card";
import AppHeader from "./components/AppHeader";

export default function App() {
    return (

        <div className="game-container">

            <AppHeader />

            <div className="player-hand flex justify-center gap-4 p-6 flex-wrap"> {

                CARD_DATABASE.map((card) => {
                    return (
                        <Card key={card.id} card={card} />)
                })
            } </div>

        </div>)
}