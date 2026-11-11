// === INIZIO SEZIONE: Import Componenti Principali App ===
import { useState } from "react";
import AppHeader from "./components/AppHeader";
import Arena from "./components/Arena";
import Compendium from "./components/Compendium";
import MainMenu from "./components/MainMenu";
// === FINE SEZIONE: Import Componenti Principali App ===

// === INIZIO SEZIONE: Componente Radice App ===
export default function App() {
    // === INIZIO SEZIONE: Stato Navigazione e Sessione Battaglia ===
    const [currentView, setCurrentView] = useState("menu");
    const [hasActiveBattle, setHasActiveBattle] = useState(false);
    const [battleSessionKey, setBattleSessionKey] = useState(0);

    function handleStartNewBattle() {
        setBattleSessionKey((prev) => prev + 1);
        setHasActiveBattle(true);
        setCurrentView("arena");
    }

    function handleNavigate(targetView) {
        if (targetView === "arena" && !hasActiveBattle) {
            setHasActiveBattle(true);
        }
        setCurrentView(targetView);
    }
    // === FINE SEZIONE: Stato Navigazione e Sessione Battaglia ===

    return (
        <div className="game-container flex-1 flex flex-col items-center justify-between min-h-screen w-full overflow-x-hidden">
            {/* === INIZIO SEZIONE: Header di Navigazione Globale === */}
            <AppHeader currentView={currentView} onNavigate={handleNavigate} />
            {/* === FINE SEZIONE: Header di Navigazione Globale === */}

            {/* === INIZIO SEZIONE: Vista Menu Principale === */}
            {currentView === "menu" && (
                <MainMenu
                    hasActiveBattle={hasActiveBattle}
                    onStartNewBattle={handleStartNewBattle}
                    onResumeBattle={() => setCurrentView("arena")}
                    onOpenCompendium={() => setCurrentView("compendium")}
                />
            )}
            {/* === FINE SEZIONE: Vista Menu Principale === */}

            {/* === INIZIO SEZIONE: Vista Arena Persistente === */}
            {hasActiveBattle && (
                <div className={currentView === "arena" ? "w-full flex-1 flex flex-col items-center" : "hidden"}>
                    <Arena key={battleSessionKey} />
                </div>
            )}
            {/* === FINE SEZIONE: Vista Arena Persistente === */}

            {/* === INIZIO SEZIONE: Vista Compendio Carte === */}
            {currentView === "compendium" && <Compendium />}
            {/* === FINE SEZIONE: Vista Compendio Carte === */}
        </div>
    );
}
// === FINE SEZIONE: Componente Radice App ===
