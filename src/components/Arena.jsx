import EnemyHUD from './HUD/EnemyHUD';
import PlayerHUD from './HUD/PlayerHUD';
import PlayerHand from './PlayerHand';

export default function Arena() {
    return (
        <div className="arena-container font- flex-1 flex flex-col items-center justify-between border-2 border-dashed border-neutral-700 rounded-lg m-2 w-screen">

            <EnemyHUD />

            <PlayerHUD />

            {/*Player Hand meglio in HUD ???*/}

            <PlayerHand />

        </div >
    );
}

