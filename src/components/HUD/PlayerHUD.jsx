




export default function PlayerHUD() {
    return (
        <div className="player-zone flex flex-col items-center text-center">
            <h3>Joel Miller</h3>
            <div className="player-hp-bar w-90 h-6 rounded-full overflow-hidden bg-amber-500">
                <div className="player-hp w-80 h-full bg-red-800"></div>
            </div>
        </div>)
}
