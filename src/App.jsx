// === INIZIO SEZIONE: Import Componenti Principali App ===
import AppHeader from "./components/AppHeader";
import Arena from './components/Arena';
// === FINE SEZIONE: Import Componenti Principali App ===

// === INIZIO SEZIONE: Componente Radice App ===
export default function App() {
    return (
        <div className="game-container flex-1 flex flex-col items-center justify-center m-2 h-screen">
            <AppHeader />
            <Arena />
        </div>
    );
}
// === FINE SEZIONE: Componente Radice App ===