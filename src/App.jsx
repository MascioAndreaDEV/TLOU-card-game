// === INIZIO SEZIONE: Import Componenti e Database Principali App ===
import { useState } from "react";
import AppHeader from "./components/AppHeader";
import Arena from "./components/Arena";
import Compendium from "./components/Compendium";
import MainMenu from "./components/MainMenu";
import RunMap from "./components/RunMap";
import { CARD_DATABASE } from "./data/cards";
import { ENEMIES_DATABASE } from "./data/enemies";
import { shuffleDeck } from "./hooks/useCombatEngine";
// === FINE SEZIONE: Import Componenti e Database Principali App ===

// === INIZIO SEZIONE: Generatori Starter Deck, Mappa Run e Ricompense Draft ===
function findCardById(id) {
    return CARD_DATABASE.find((c) => c.id === id);
}

function findEnemyById(id) {
    return ENEMIES_DATABASE.find((e) => e.id === id) || ENEMIES_DATABASE[0];
}

function pickRandomFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function createStarterDeck() {
    const starterIds = [
        "melee_attack",
        "melee_attack",
        "cover",
        "cover",
        "dodge",
        "dodge",
        "bottle_throw",
        "Glock9mm",
        "Ammo.9mm",
        "Ammo.9mm",
        "straccio",
        "listen_mode",
    ];
    return starterIds.map(findCardById).filter(Boolean);
}

function generateRunNodes() {
    const stage1Enemy = findEnemyById(pickRandomFrom(["runner", "wlf_guard_dog"]));
    const stage2Enemy = findEnemyById(pickRandomFrom(["stalker", "clicker"]));
    const stage4Enemy = findEnemyById(pickRandomFrom(["wlf_soldier", "wlf_enforcer"]));
    const stage5Enemy = findEnemyById(pickRandomFrom(["shambler", "seraphite_brute"]));
    const bossEnemy = findEnemyById("bloater");

    return [
        {
            id: "node_1",
            type: "combat",
            title: "Perimetro Zona di Quarantena",
            description: "Pattuglia esterna tra le macerie. Elimina la minaccia per entrare nel settore urbano.",
            enemy: stage1Enemy,
        },
        {
            id: "node_2",
            type: "combat",
            title: "Stazione Metropolitana",
            description: "Corridoi bui invasi dalle spore. Presta attenzione agli attacchi con stato alterato.",
            enemy: stage2Enemy,
        },
        {
            id: "node_3",
            type: "event",
            title: "Avamposto Abbandonato FEDRA",
            description: "Un momento di tregua: riposa accanto al falò per curarti o forza una cassa militare.",
            enemy: null,
        },
        {
            id: "node_4",
            type: "combat",
            title: "Blocco Stradale di Seattle",
            description: "Ronda armata pesante. Sfrutta coperture, perforazione scudo e crafting.",
            enemy: stage4Enemy,
        },
        {
            id: "node_5",
            type: "combat",
            title: "Settore Rosso (Scontro Elite)",
            description: "Minaccia d'élite ad alta letalità prima del nido principale.",
            enemy: stage5Enemy,
        },
        {
            id: "node_6",
            type: "boss",
            title: "Nido Centrale — Boss Finale",
            description: "Scontro decisivo per la sopravvivenza contro il colosso corazzato dal Cordyceps.",
            enemy: bossEnemy,
        },
    ];
}

function generateRewardChoices(count = 3) {
    const lootPool = CARD_DATABASE.filter((card) => card.tier !== "starter");
    return shuffleDeck(lootPool).slice(0, count);
}

function createFreshRunState() {
    return {
        survivor: null,
        currentHp: 0,
        deck: createStarterDeck(),
        nodes: generateRunNodes(),
        currentNodeIndex: 0,
        activeEnemy: findEnemyById("runner"),
        rewardChoices: generateRewardChoices(3),
        isRunCompleted: false,
    };
}
// === FINE SEZIONE: Generatori Starter Deck, Mappa Run e Ricompense Draft ===

// === INIZIO SEZIONE: Componente Radice App ===
export default function App() {
    // === INIZIO SEZIONE: Stato Navigazione e Stato della Run ===
    const [currentView, setCurrentView] = useState("menu");
    const [hasActiveBattle, setHasActiveBattle] = useState(false);
    const [battleSessionKey, setBattleSessionKey] = useState(0);
    const [runState, setRunState] = useState(createFreshRunState);

    function handleStartNewRun() {
        setRunState(createFreshRunState());
        setHasActiveBattle(false);
        setCurrentView("map");
    }

    function handleSelectSurvivor(chosenSurvivor) {
        const nextNodes = generateRunNodes();
        setRunState({
            survivor: chosenSurvivor,
            currentHp: chosenSurvivor.hp,
            deck: createStarterDeck(),
            nodes: nextNodes,
            currentNodeIndex: 0,
            activeEnemy: nextNodes[0].enemy,
            rewardChoices: generateRewardChoices(3),
            isRunCompleted: false,
        });
    }

    function handleEnterCombatNode(node) {
        setRunState((prev) => ({
            ...prev,
            activeEnemy: node.enemy,
            rewardChoices: generateRewardChoices(3),
        }));
        setBattleSessionKey((prev) => prev + 1);
        setHasActiveBattle(true);
        setCurrentView("arena");
    }

    function handleResolveRestNode() {
        setRunState((prev) => {
            if (!prev.survivor) return prev;
            const healedHp = Math.min(prev.survivor.hp, prev.currentHp + 25);
            return {
                ...prev,
                currentHp: healedHp,
                currentNodeIndex: prev.currentNodeIndex + 1,
            };
        });
    }

    function handleResolveScavengeNode() {
        setRunState((prev) => {
            if (!prev.survivor) return prev;
            const rarePool = CARD_DATABASE.filter(
                (c) => c.tier === "rare" || c.tier === "uncommon"
            );
            const bonusCard = pickRandomFrom(rarePool);
            const healedHp = Math.min(prev.survivor.hp, prev.currentHp + 8);
            return {
                ...prev,
                currentHp: healedHp,
                deck: bonusCard ? [...prev.deck, bonusCard] : prev.deck,
                currentNodeIndex: prev.currentNodeIndex + 1,
            };
        });
    }

    function handleCompleteVictory(remainingHp, chosenRewardCard) {
        setRunState((prev) => {
            const nextIndex = prev.currentNodeIndex + 1;
            const isFinished = nextIndex >= prev.nodes.length;
            return {
                ...prev,
                currentHp: Math.max(1, remainingHp),
                deck: chosenRewardCard ? [...prev.deck, chosenRewardCard] : prev.deck,
                currentNodeIndex: nextIndex,
                isRunCompleted: isFinished,
            };
        });
        setHasActiveBattle(false);
        setCurrentView("map");
    }

    function handleNavigate(targetView) {
        if (targetView === "arena" && !runState.survivor) {
            setCurrentView("map");
            return;
        }
        if (targetView === "arena" && !hasActiveBattle) {
            setHasActiveBattle(true);
        }
        setCurrentView(targetView);
    }
    // === FINE SEZIONE: Stato Navigazione e Stato della Run ===

    return (
        <div className="game-container flex-1 flex flex-col items-center justify-between min-h-screen w-full overflow-x-hidden">
            {/* === INIZIO SEZIONE: Header di Navigazione Globale === */}
            <AppHeader currentView={currentView} onNavigate={handleNavigate} />
            {/* === FINE SEZIONE: Header di Navigazione Globale === */}

            {/* === INIZIO SEZIONE: Vista Menu Principale === */}
            {currentView === "menu" && (
                <MainMenu
                    hasActiveBattle={Boolean(runState.survivor)}
                    onStartNewBattle={handleStartNewRun}
                    onResumeBattle={() =>
                        setCurrentView(hasActiveBattle ? "arena" : "map")
                    }
                    onOpenCompendium={() => setCurrentView("compendium")}
                />
            )}
            {/* === FINE SEZIONE: Vista Menu Principale === */}

            {/* === INIZIO SEZIONE: Vista Mappa della Run === */}
            {currentView === "map" && (
                <RunMap
                    runState={runState}
                    onSelectSurvivor={handleSelectSurvivor}
                    onEnterCombatNode={handleEnterCombatNode}
                    onResolveRestNode={handleResolveRestNode}
                    onResolveScavengeNode={handleResolveScavengeNode}
                    onStartNewRun={handleStartNewRun}
                />
            )}
            {/* === FINE SEZIONE: Vista Mappa della Run === */}

            {/* === INIZIO SEZIONE: Vista Arena Persistente collegata alla Run === */}
            {hasActiveBattle && runState.survivor && (
                <div
                    className={
                        currentView === "arena"
                            ? "w-full flex-1 flex flex-col items-center"
                            : "hidden"
                    }
                >
                    <Arena
                        key={battleSessionKey}
                        character={runState.survivor}
                        enemy={runState.activeEnemy}
                        deck={runState.deck}
                        initialPlayerHp={runState.currentHp}
                        rewardChoices={runState.rewardChoices}
                        onCompleteVictory={handleCompleteVictory}
                        onReturnToMap={() => setCurrentView("map")}
                    />
                </div>
            )}
            {/* === FINE SEZIONE: Vista Arena Persistente collegata alla Run === */}

            {/* === INIZIO SEZIONE: Vista Compendio Carte === */}
            {currentView === "compendium" && <Compendium />}
            {/* === FINE SEZIONE: Vista Compendio Carte === */}
        </div>
    );
}
// === FINE SEZIONE: Componente Radice App ===
