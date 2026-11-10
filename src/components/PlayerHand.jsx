import { useState } from "react";
import Card from "./card";

// === INIZIO SEZIONE: Componente Mano del Giocatore con Disposizione a Ventaglio (Arc Layout) ===
export default function PlayerHand({
    playedCard,
    hand,
    playerStamina = 3,
    ammoReserve = {},
}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const totalCards = hand.length;

    return (
        <div className="relative flex justify-center items-end py-6 px-4 min-h-96 select-none">
            {hand.map((card, index) => {
                // === INIZIO SEZIONE: Calcolo Arc Layout Carte (Rotazione e Traslazione Y) ===
                const centerIndex = (totalCards - 1) / 2;
                const offsetFromCenter = index - centerIndex;
                const maxRotation = Math.min(14, totalCards * 2.4);
                const rotation =
                    totalCards > 1 && centerIndex > 0
                        ? (offsetFromCenter / centerIndex) * maxRotation
                        : 0;
                const arcDrop = Math.pow(Math.abs(offsetFromCenter), 1.65) * 6;
                const isHovered = hoveredIndex === index;

                // Controllo giocabilità carta (Stamina + Munizioni)
                const hasEnoughStamina = playerStamina >= card.cost;
                const hasAmmoForWeapon =
                    card.cardType !== "weapon" ||
                    !card.ammoType ||
                    (ammoReserve[card.ammoType] || 0) > 0 ||
                    hand.some(
                        (c) => c.cardType === "ammo" && c.ammoType === card.ammoType
                    );
                const isPlayable = hasEnoughStamina && hasAmmoForWeapon;
                // === FINE SEZIONE: Calcolo Arc Layout Carte (Rotazione e Traslazione Y) ===

                return (
                    <div
                        key={card.instanceId || card.id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            transform: isHovered
                                ? "translateY(-36px) rotate(0deg) scale(1.08)"
                                : `translateY(${arcDrop}px) rotate(${rotation}deg)`,
                            zIndex: isHovered ? 50 : index + 1,
                            marginLeft: index === 0 ? "0px" : "-24px",
                        }}
                        className="transition-all duration-200 ease-out origin-bottom"
                    >
                        <Card
                            card={card}
                            playedCard={playedCard}
                            isPlayable={isPlayable}
                            hasEnoughStamina={hasEnoughStamina}
                            hasAmmoForWeapon={hasAmmoForWeapon}
                        />
                    </div>
                );
            })}
        </div>
    );
}
// === FINE SEZIONE: Componente Mano del Giocatore con Disposizione a Ventaglio (Arc Layout) ===
