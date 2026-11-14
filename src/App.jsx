// === INIZIO SEZIONE: Import Componenti, Motion e Database Principali App ===
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AppHeader from "./components/AppHeader";
import Arena from "./components/Arena";
import Compendium from "./components/Compendium";
import MainMenu from "./components/MainMenu";
import RunMap from "./components/RunMap";
import { CARD_DATABASE } from "./data/cards";
import { ENEMIES_DATABASE } from "./data/enemies";
import { shuffleDeck } from "./hooks/useCombatEngine";
// === FINE SEZIONE: Import Componenti, Motion e Database Principali App ===

// === INIZIO SEZIONE: Generatori Starter Deck con Signature Eroe, Grafo 7 Piani e Draft Rewards ===
function findCardById(id) {
    return CARD_DATABASE.find((c) => c.id === id);
}

function findEnemyById(id) {
    return ENEMIES_DATABASE.find((e) => e.id === id) || ENEMIES_DATABASE[0];
}

function pickRandomFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function createStarterDeck(survivor = null) {
    const baseIds = [
        "melee_attack",
        "melee_attack",
        "cover",
        "cover",
        "dodge",
        "bottle_throw",
        "Glock9mm",
        "Ammo.9mm",
        "straccio",
        "listen_mode",
    ];
    const sigId = survivor?.starterSignatureId;
    const allIds = sigId ? [...baseIds, sigId, sigId] : [...baseIds, "dodge", "Ammo.9mm"];
    return allIds.map(findCardById).filter(Boolean);
}

function generateBranchingMap() {
    return [
        // Piano 0 (Ingresso QZ - 2 nodi iniziali)
        {
            id: "f0_top",
            col: 0,
            row: 0,
            type: "combat",
            title: "Varco Nord QZ",
            description: "Sentiero secondario invaso da infetti veloci.",
            enemy: findEnemyById("runner"),
            nextIds: ["f1_top", "f1_mid"],
        },
        {
            id: "f0_bot",
            col: 0,
            row: 2,
            type: "combat",
            title: "Canale di Scolo",
            description: "Pattuglia con segugi da guardia WLF.",
            enemy: findEnemyById("wlf_guard_dog"),
            nextIds: ["f1_mid", "f1_bot"],
        },

        // Piano 1 (Settore Urbano - 3 nodi)
        {
            id: "f1_top",
            col: 1,
            row: 0,
            type: "combat",
            title: "Uffici Abbandonati",
            description: "Uno Stalker tende agguati nell'ombra.",
            enemy: findEnemyById("stalker"),
            nextIds: ["f2_top"],
        },
        {
            id: "f1_mid",
            col: 1,
            row: 1,
            type: "mystery",
            title: "Segnale Radio Luci",
            description: "Frequenza d'emergenza: scegli tra rifornimenti medici, equipaggiamento eroico o cassa armamenti.",
            enemy: null,
            nextIds: ["f2_top", "f2_bot"],
        },
        {
            id: "f1_bot",
            col: 1,
            row: 2,
            type: "combat",
            title: "Galleria Metro",
            description: "Un Clicker blocca i binari sotterranei.",
            enemy: findEnemyById("clicker"),
            nextIds: ["f2_bot"],
        },

        // Piano 2 (Zona Rifornimento - 2 nodi)
        {
            id: "f2_top",
            col: 2,
            row: 0,
            type: "rest",
            title: "Rifugio Sicuro",
            description: "Falò acceso in una soffitta blindata: cura le ferite o recupera la tua Reliquia Signature.",
            enemy: null,
            nextIds: ["f3_top", "f3_mid"],
        },
        {
            id: "f2_bot",
            col: 2,
            row: 2,
            type: "scavenge",
            title: "Convoglio FEDRA",
            description: "Blindato militare abbandonato carico di casse tattiche.",
            enemy: null,
            nextIds: ["f3_mid", "f3_bot"],
        },

        // Piano 3 (Blocco Stradale - 3 nodi)
        {
            id: "f3_top",
            col: 3,
            row: 0,
            type: "combat",
            title: "Avamposto WLF",
            description: "Soldato WLF armato di fucile d'assalto e granate.",
            enemy: findEnemyById("wlf_soldier"),
            nextIds: ["f4_top"],
        },
        {
            id: "f3_mid",
            col: 3,
            row: 1,
            type: "combat",
            title: "Piazza Blindata",
            description: "Enforcer in tenuta antisommossa pesante.",
            enemy: findEnemyById("wlf_enforcer"),
            nextIds: ["f4_top", "f4_bot"],
        },
        {
            id: "f3_bot",
            col: 3,
            row: 2,
            type: "rest",
            title: "Serra Botanica",
            description: "Zona silenziosa per fasciare le ferite o preparare armi.",
            enemy: null,
            nextIds: ["f4_bot"],
        },

        // Piano 4 (Settore Rosso Elite - 2 nodi)
        {
            id: "f4_top",
            col: 4,
            row: 0,
            type: "elite",
            title: "Tunnel Acido",
            description: "Minaccia Elite: Shambler avvolto da nubi di spore acide.",
            enemy: findEnemyById("shambler"),
            nextIds: ["f5_top", "f5_bot"],
        },
        {
            id: "f4_bot",
            col: 4,
            row: 2,
            type: "elite",
            title: "Villaggio in Fiamme",
            description: "Minaccia Elite: Bruto Serafita armato di martello da guerra.",
            enemy: findEnemyById("seraphite_brute"),
            nextIds: ["f5_top", "f5_bot"],
        },

        // Piano 5 (Bivio Pre-Boss - 2 nodi)
        {
            id: "f5_top",
            col: 5,
            row: 0,
            type: "rest",
            title: "Ultimo Falò",
            description: "Ultima sosta prima del Nido Centrale.",
            enemy: null,
            nextIds: ["f6_boss"],
        },
        {
            id: "f5_bot",
            col: 5,
            row: 2,
            type: "scavenge",
            title: "Armeria Segreta",
            description: "Deposito d'élite prima dello scontro finale.",
            enemy: null,
            nextIds: ["f6_boss"],
        },

        // Piano 6 (Boss Finale - 1 nodo)
        {
            id: "f6_boss",
            col: 6,
            row: 1,
            type: "boss",
            title: "Nido Centrale",
            description: "Boss Finale della Zona di Quarantena.",
            enemy: findEnemyById("bloater"),
            nextIds: [],
        },
    ];
}

function generateRewardChoices(survivor = null, count = 3) {
    const lootPool = CARD_DATABASE.filter((card) => {
        if (card.tier === "starter") return false;
        if (card.tier === "signature") {
            return survivor && card.heroId === survivor.id;
        }
        return true;
    });
    return shuffleDeck(lootPool).slice(0, count);
}

function createFreshRunState() {
    const nodes = generateBranchingMap();
    return {
        survivor: null,
        currentHp: 0,
        deck: createStarterDeck(null),
        nodes,
        visitedNodeIds: [],
        availableNodeIds: ["f0_top", "f0_bot"],
        pendingCombatNode: null,
        activeEventNode: null,
        activeEnemy: findEnemyById("runner"),
        rewardChoices: generateRewardChoices(null, 3),
        isRunCompleted: false,
    };
}
// === FINE SEZIONE: Generatori Starter Deck con Signature Eroe, Grafo 7 Piani e Draft Rewards ===

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
        const nextNodes = generateBranchingMap();
        setRunState({
            survivor: chosenSurvivor,
            currentHp: chosenSurvivor.hp,
            deck: createStarterDeck(chosenSurvivor),
            nodes: nextNodes,
            visitedNodeIds: [],
            availableNodeIds: ["f0_top", "f0_bot"],
            pendingCombatNode: null,
            activeEventNode: null,
            activeEnemy: nextNodes[0].enemy,
            rewardChoices: generateRewardChoices(chosenSurvivor, 3),
            isRunCompleted: false,
        });
    }

    function handleSelectMapNode(node) {
        if (node.type === "combat" || node.type === "elite" || node.type === "boss") {
            setRunState((prev) => ({
                ...prev,
                pendingCombatNode: node,
                activeEventNode: null,
                activeEnemy: node.enemy,
                rewardChoices: generateRewardChoices(prev.survivor, 3),
            }));
            setBattleSessionKey((prev) => prev + 1);
            setHasActiveBattle(true);
            setCurrentView("arena");
        } else {
            setRunState((prev) => ({
                ...prev,
                activeEventNode: node,
            }));
        }
    }

    function handleResolveEventChoice(choiceType) {
        setRunState((prev) => {
            if (!prev.survivor || !prev.activeEventNode) return prev;
            const node = prev.activeEventNode;
            let nextHp = prev.currentHp;
            let nextDeck = [...prev.deck];

            if (choiceType === "heal") {
                nextHp = Math.min(prev.survivor.hp, prev.currentHp + 25);
            } else if (choiceType === "signature_relic") {
                const relicCard = findCardById(prev.survivor.unlockableSignatureId);
                if (relicCard) {
                    nextDeck.push(relicCard);
                }
                nextHp = Math.min(prev.survivor.hp, prev.currentHp + 8);
            } else if (choiceType === "rare_loot") {
                const rarePool = CARD_DATABASE.filter(
                    (c) => c.tier === "rare" || c.tier === "uncommon"
                );
                const bonusCard = pickRandomFrom(rarePool);
                if (bonusCard) {
                    nextDeck.push(bonusCard);
                }
                nextHp = Math.min(prev.survivor.hp, prev.currentHp + 10);
            }

            return {
                ...prev,
                currentHp: nextHp,
                deck: nextDeck,
                visitedNodeIds: [...prev.visitedNodeIds, node.id],
                availableNodeIds: node.nextIds || [],
                activeEventNode: null,
            };
        });
    }

    function handleCompleteVictory(remainingHp, chosenRewardCard) {
        setRunState((prev) => {
            const completedNode = prev.pendingCombatNode;
            const nextVisited = completedNode
                ? [...prev.visitedNodeIds, completedNode.id]
                : prev.visitedNodeIds;
            const nextAvailable = completedNode ? completedNode.nextIds || [] : prev.availableNodeIds;
            const isFinished = completedNode?.type === "boss" || nextAvailable.length === 0;

            return {
                ...prev,
                currentHp: Math.max(1, remainingHp),
                deck: chosenRewardCard ? [...prev.deck, chosenRewardCard] : prev.deck,
                visitedNodeIds: nextVisited,
                availableNodeIds: nextAvailable,
                pendingCombatNode: null,
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
        <div className="game-container tlou-vignette flex-1 flex flex-col items-center justify-between min-h-screen w-full overflow-x-hidden">
            {/* === INIZIO SEZIONE: Header di Navigazione Globale === */}
            <AppHeader currentView={currentView} onNavigate={handleNavigate} />
            {/* === FINE SEZIONE: Header di Navigazione Globale === */}

            {/* === INIZIO SEZIONE: Transizioni Animate Viste Principali === */}
            <AnimatePresence mode="wait">
                {currentView === "menu" && (
                    <motion.div
                        key="view-menu"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.22 }}
                        className="w-full flex-1 flex flex-col items-center justify-center"
                    >
                        <MainMenu
                            runState={runState}
                            hasActiveBattle={Boolean(runState.survivor)}
                            onStartNewBattle={handleStartNewRun}
                            onResumeBattle={() =>
                                setCurrentView(hasActiveBattle ? "arena" : "map")
                            }
                            onOpenCompendium={() => setCurrentView("compendium")}
                        />
                    </motion.div>
                )}

                {currentView === "map" && (
                    <motion.div
                        key="view-map"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.22 }}
                        className="w-full flex-1 flex flex-col items-center"
                    >
                        <RunMap
                            runState={runState}
                            onSelectSurvivor={handleSelectSurvivor}
                            onSelectMapNode={handleSelectMapNode}
                            onResolveEventChoice={handleResolveEventChoice}
                            onStartNewRun={handleStartNewRun}
                        />
                    </motion.div>
                )}

                {currentView === "compendium" && (
                    <motion.div
                        key="view-compendium"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.22 }}
                        className="w-full flex-1 flex flex-col items-center"
                    >
                        <Compendium />
                    </motion.div>
                )}
            </AnimatePresence>
            {/* === FINE SEZIONE: Transizioni Animate Viste Principali === */}

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
        </div>
    );
}
// === FINE SEZIONE: Componente Radice App ===
