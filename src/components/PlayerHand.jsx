import Card from "./card";


export default function PayerHand({playedCard, hand}) {

    

    return (
        <div className="flex justify-center gap-4 p-4 flex-wrap"> {hand.map((card => {
            return (<Card key={card.id} card={card} playedCard={playedCard} ></Card>
            )
        })
        )}</div>
    )
}
