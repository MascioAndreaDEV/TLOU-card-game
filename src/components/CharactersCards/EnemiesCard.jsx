


export default function EnemiesCard({enemy, hpCorrenti, scudo, isAttacking, isHit}) {

const hpPercentage = (hpCorrenti / enemy.hp) * 100;
    
  return (
       <div className={`font-barlow card flex flex-col justify-between w-64 h-95 bg-yellow-900 border border-zinc-700 text-gray-200 rounded-xl p-4 shadow-lg transition-all duration-400 cursor-pointer ${isAttacking ? 'translate-y-6 scale-105 border-red-500' : 'translate-y-0'}
                ${isHit ? 'brightness-150 border-white' : ''}
                ${hpCorrenti <= 0 ? 'grayscale opacity-50 border-zinc-700' : 'border-zinc-700'}
            `}>  

            <div className="">
                <h2>{enemy.name}</h2>
            </div>

            <div className="card-image flex flex-col items-center justify-center">
                <img className="rounded-xl" src={enemy.image} alt={enemy.name} />
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="enemy-hp-bar rounded-full overflow-hidden w-50 h-6 bg-amber-400">
                <div className="enemy-hp h-full transition-all duration-300 ease-out bg-red-700" style={{ width: `${hpPercentage}%` }}></div>
            </div>
                <h4>scudo: {scudo}</h4>




                {hpCorrenti <= 0 ? (
                    <div className="flex items-center justify-center">
                        <h1 className="">DEAD</h1>
                    </div>
                ) :null}



                {enemy.status.isBleeding && (
                    <div className="flex items-center justify-center">
                        <h4>Sanguina</h4>
                    </div>
                )}
                {enemy.status.isStun && (
                    <div className="flex items-center justify-center">
                        <h4>Stordito</h4>
                    </div>
                )}
                {enemy.status.isPoisoned && (
                    <div className="flex items-center justify-center">
                        <h4>Avvelenato</h4>
                    </div>
                )}
                {enemy.status.isDismember && (
                    <div className="flex items-center justify-center">
                        <h4>Mutilato</h4>
                    </div>
                )}
                
            </div>
        </div>
  )
}
