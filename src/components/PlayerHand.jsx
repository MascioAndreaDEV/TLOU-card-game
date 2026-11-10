import Card from "./card";

// === INIZIO SEZIONE: Componente Mano del Giocatore ===
export default function PlayerHand({ playedCard, hand }) {
    return (
        <div className="flex justify-center gap-4 p-4 flex-wrap">
            {hand.map((card) => (
                <Card
                    key={card.instanceId || card.id}
                    card={card}
                    playedCard={playedCard}
                />
            ))}
        </div>
    );
}
// === FINE SEZIONE: Componente Mano del Giocatore ===
