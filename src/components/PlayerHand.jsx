import Card from "./card";


export default function PayerHand({ handleDiscard, gestioneDanno, gestioneStamina, hand}) {

    

    return (
        <div className="flex justify-center gap-4 p-4 flex-wrap"> {hand.map((card => {
            return (<Card handleDiscard={handleDiscard} gestioneDanno={gestioneDanno} gestioneStamina={gestioneStamina} key={card.id} card={card}></Card>
            )
        })
        )}</div>
    )
}
