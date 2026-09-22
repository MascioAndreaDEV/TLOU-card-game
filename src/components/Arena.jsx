import PlayerHand from './PlayerHand';

export default function Arena() {
    return (
        <div className="arena-container font- flex-1 flex flex-col items-center justify-between border-2 border-dashed border-neutral-700 rounded-lg m-2 w-screen">

            <div className="enemy-zone flex flex-col items-center text-center">
                <h3 className>Clicker</h3>
                <div className="enemy-hp-bar rounded-full overflow-hidden w-90 h-6 bg-amber-400">
                    <div className="enemy-hp h-full w-80 bg-red-700"></div>
                </div>
            </div>

            <div className="player-zone flex flex-col items-center text-center">
                <h3>Joel Miller</h3>
                <div className="player-hp-bar w-90 h-6 rounded-full overflow-hidden bg-amber-500">
                    <div className="player-hp w-80 h-full bg-red-800"></div>
                </div>
            </div>

            <PlayerHand />

        </div >
    );
}

