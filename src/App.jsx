import AppHeader from "./components/AppHeader";
import Arena from './components/Arena'
import Compendium from './components/Compendium'
export default function App() {
    return (

        <div className="game-container flex-1 flex flex-col items-center justify-center m-2 h-screen">

            <AppHeader />

            <Arena />

        </div>)
}