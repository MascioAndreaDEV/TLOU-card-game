<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Intestazione e Panoramica Implementazione         -->
<!-- ================================================================= -->
# 📋 TLOU: Survival Card Battler - Registro di Implementazione

Documento vivo di tracciamento dello stato di avanzamento, delle milestone architetturali e dei progressi di sviluppo del gioco.

- **Stack**: React 19 + Vite + Tailwind CSS v4 + React Icons (`gi`)
- **Architettura**: Data-Driven (Blueprint vs Runtime State) + Combat State Machine
- **Tema**: Post-apocalittico tattico (The Last of Us)

<!-- ================================================================= -->
<!-- FINE SEZIONE: Intestazione e Panoramica Implementazione           -->
<!-- ================================================================= -->

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Tabellone Milestone e Stato                       -->
<!-- ================================================================= -->
## 📊 Tabellone Milestone

| Milestone | Descrizione | Stato | Priorità |
| :--- | :--- | :--- | :--- |
| **M0: Foundation** | Setup Vite, Blueprint `cards.js`, `enemies.js`, `Characters.js`, UI base | 🟢 Completata | Bassa |
| **M1: Damage & Targeting Pipeline** | Correzione bersagli danno/scudo/cura, Win/Loss conditions, Turno Nemico base | 🟢 Completata | Completata |
| **M2: Deck Engine & Piles** | Mazzo di pesca (`drawPile`), Scarti (`discardPile`), Rimescolamento, `retainable` | 🟢 Completata | Completata |
| **M3: Enemy Intent & Telegrafo** | Visualizzazione mossa nemica preventiva (Intent), ciclo fine turno completo | 🟢 Completata | Completata |
| **M4: Survival Mechanics** | Durabilità armi (`durability`), armi da fuoco e consumo munizioni (`ammoType`) | 🟢 Completata | Completata |
| **M5: Status Alterati** | Meccaniche Stun, Bleed, Poison, Dismember e Cleanse | 🟢 Completata | Completata |
| **M6: UI/UX & Card Fanning** | Disposizione a ventaglio mano carte, animazioni di impatto, visual Arena | 🟢 Completata | Completata |
| **M7: State Engine Refactoring** | Pulizia dead code e migrazione a `useReducer` / Custom Hook | 🟢 Completata | Completata |
| **M8: Card Pool & Bestiary Expansion** | Espansione a 32 carte TLOU, 6 Sopravvissuti completi e 9 Minacce Nemiche | 🟢 Completata | Completata |
| **M9: Main Menu & Compendium Hub** | Menu principale (`Nuova Partita`, `Riprendi`, `Compendio`), filtri categoria/rarità e Bestiario | 🟢 Completata | Completata |
| **M10: Event Map & Draft Rewards** | Mappa a nodi/eventi (Scontri, Scavenging, Rifugio, Boss) e scelta ricompensa 1-su-3 | 🟡 In Corso | **Alta (Urgente)** |
| **M11: Full Run & Loadout Integration** | Collegamento completo Starter Deck, Sopravvissuto e progressione Run nell'Arena | ⚪ Da Iniziare | Media-Alta |

*Legenda: 🟢 Completata | 🟡 In Corso | ⚪ Da Iniziare | 🔴 Bloccata*

<!-- ================================================================= -->
<!-- FINE SEZIONE: Tabellone Milestone e Stato                         -->
<!-- ================================================================= -->

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Dettaglio Task per Milestone                      -->
<!-- ================================================================= -->
## 🛠️ Dettaglio Task

### ✅ Milestone 1: Damage & Targeting Pipeline (Completata)
- [x] **Targeting Danni Corretto**: Quando il giocatore gioca una carta attacco in `handlePlayCard`, il danno riduce prima `enemyShield` e il danno residuo colpisce `enemyHp`.
- [x] **Targeting Difesa Corretto**: Le carte scudo aumentano `playerShield`.
- [x] **Targeting Cure**: Le carte cura aumentano `playerHp` con cap a `character.hp` (`Math.min`).
- [x] **Turno Nemico Base (`handleEnemyTurn`)**: Scelta casuale di una mossa da `enemy.moves` con applicazione di danno (mitigato da `shieldHandler`) o scudo nemico.
- [x] **Condizioni di Fine Combattimento**:
  - [x] Calcolo `isVictory` (`enemyHp <= 0`), `isGameOver` (`playerHp <= 0`) e `isBattleOver`.
  - [x] Blocco giocate carte e pulsante "FINE TURNO" disabilitato a fine battaglia.
  - [x] Feedback base di morte su `EnemiesCard` (`DEAD` + grayscale) e `PlayerHUD` (`ELIMINATO.`).

### ✅ Milestone 2: Deck Engine & Piles (Completata)
- [x] Rimozione carta giocata dalla mano (`handleDiscard`) e inserimento in `discardPile`.
- [x] **Fix Sintassi & Riferimenti in `Arena.jsx` (Bloccante)**:
  - [x] Correggere la firma `function drawCards(targetHandSize = 5)`.
  - [x] Sostituire `refillCard()` con `drawCards()` chiamata in `handleEndTurn()`.
- [x] **Inizizzazione Mazzo & Istanza Runtime**:
  - [x] Creare una funzione di *shuffle* (Fisher-Yates) per mescolare il mazzo a inizio partita.
  - [x] Separare `drawPile` iniziale e prima `hand` (le prime carte pescate non restano duplicate in `drawPile`).
  - [x] Assegnare un `instanceId` univoco alle carte per permettere più copie della stessa carta.
- [x] **Logica di Pescata (`drawCards`) & Reshuffle**:
  - [x] Calcolare quante carte mancano per arrivare al limite mano (`targetHandSize - keptCards.length`).
  - [x] Se `drawPile` non ha abbastanza carte, rimescolare `discardPile` per formare il nuovo `drawPile` e svuotare `discardPile`.
- [x] **Gestione Scarto a Fine Turno (`retainable`)**:
  - [x] A fine turno, spostare in `discardPile` le carte rimaste in mano che hanno `retainable: false`, mantenendo in mano quelle con `retainable: true`.

### ✅ Milestone 3: Enemy Intent & Telegrafo (Completata)
- [x] Stato `enemyIntent` calcolato a inizio turno del giocatore e mostrato sopra `EnemiesCard` (icona attacco + valore danno o icona scudo).
- [x] In `handleEndTurn`, eseguire la mossa già telegrafata in `enemyIntent` invece di estrarne una al buio.
- [x] Generare il nuovo `enemyIntent` per il turno successivo dopo l'azione nemica.
- [x] Attivare i feedback visivi già predisposti in `Arena.jsx` e `EnemiesCard.jsx` (`isEnemyAttacking`, `isEnemyHit`).

### ✅ Milestone 4: Survival Mechanics (Durabilità & Munizioni) (Completata)
- [x] **Allineamento Dati `cards.js`**:
  - [x] Aggiungere `ammoType` mancante alle carte munizione `ammo.12` (`'calibro.12'`), `Ammo.357` (`'calibro.357'`), `Ammo.308` (`'calibro.308'`).
  - [x] Collegare le immagini già presenti in `src/assets/img/` (`Cover.png`, `Schivata.png`) alle carte `cover` e `dodge`.
- [x] **Durabilità Armi/Oggetti**:
  - [x] Decrementare `durability` ad ogni utilizzo delle carte `retainable` / `weapon`.
  - [x] Scartare o distruggere la carta solo quando `durability` arriva a `0` (se `durability > 0`, la carta resta utilizzabile/in mano).
- [x] **Sistema Munizioni**:
  - [x] Controllare il requisito `ammoType` per le armi da fuoco prima di permettere la giocata e consumare la relativa risorsa munizione (dalla riserva o direttamente dalla mano).

### ✅ Milestone 5: Status Alterati (Completata)
- [x] Spostare `enemy.status` e `character.status` nello stato runtime di `Arena.jsx` (evitando di mutare il blueprint statico).
- [x] **Stun (`isStun`)**: Se il nemico è stordito, salta il proprio turno e rimuove lo status a fine turno nemico.
- [x] **Bleed (`isBleeding`), Burn & Poison (`isPoisoned`)**: Danno periodico a inizio/fine turno e decremento di `duration`.
- [x] **Cleanse**: Rimozione degli status negativi (es. giocando `MedKit`).

### ✅ Milestone 6: UI/UX, Card Fanning & Visual Arena (Completata)
- [x] Implementazione disposizione a ventaglio per la mano (`PlayerHand.jsx`) con rotazione e traslazione ad arco.
- [x] Elevazione e zoom della carta in hover senza glitch di sovrapposizione (`z-index`).
- [x] Indicatori visivi di stamina e munizioni insufficienti (carta opacizzata/bordo rosso se `stamina < card.cost` o calibro mancante).
- [x] Contatori visivi per `Draw Pile` e `Discard Pile` nell'HUD/Arena.
- [x] Schermata/Banner di Vittoria o Sconfitta con pulsante "Rigioca / Nuovo Scontro".

### ✅ Milestone 7: Pulizia Codice & State Engine Refactoring (Completata)
- [x] Rimuovere le funzioni helper obsolete non più usate in `Arena.jsx` (`handlePlayerHp`, `handleHp`, `handleEnemyShield`, `handlePlayerShield`, `handleStamina`, `shieldHandler`) e import inutilizzati (`SiD`).
- [x] Uniformare il case dei nomi file immagini importati in `cards.js`, `enemies.js` e `Characters.js` (`Bottle.png`, `SpineWood.png`, `Clicker.png`, `Joel.jpg`, `Tommy.jpg`, `Ellie.jpg`, `Abby.jpg`).
- [x] Correggere il typo nel nome funzione `PayerHand` -> `PlayerHand` in `PlayerHand.jsx` e la sintassi import in `SignaturesCards.jsx`.
- [x] Migrazione del combat loop verso `useReducer` e custom hook dedicato (`src/hooks/useCombatEngine.js`).

---

## 🛠️ Fase 2: Espansione Carte, Main Menu, Compendium & Mappa ad Eventi (M8–M11)

### ✅ Milestone 8: Espansione Arsenale Carte & Nuove Meccaniche (Completata - 27 Carte)
- [x] **Approvazione Visual & Lore 1-a-1**: Generazione illustrazione in stile graphic novel TLOU + preview della carta e conferma utente prima dell'inserimento in `cards.js`.
- [x] **Integrazione Asset già presenti**:
  - [x] `.357 Revolver` (`weapon`, `ammoType: 'calibro.357'`, usa `.357Revolver.png`).
  - [x] `Alcool` (`utility`, usa `alcool.png`) e aggiornamento `Straccio` con meccanica Crafting (`Alcool + Straccio` -> `MedKit` o `Molotov`).
- [x] **Nuove Carte Lore TLOU (con illustrazioni dedicate)**:
  - [x] `Coltello a Serramanico (Shiv)` — Esecuzione furtiva (danno raddoppiato su nemico `isStun`, `recipe: ['blade', 'straccio']`).
  - [x] `Mattone (Brick)` — Danno + Stordimento (`stun: true`).
  - [x] `Bomba Chiodata (Nail Bomb)` — Danno esplosivo + Sanguinamento garantito + Mutilazione (`recipe: ['blade', 'explosive']`).
  - [x] `Lama / Forbici (Blade)` — Materiale di crafting + taglio rapido d'emergenza (`selfDamage: 1` perché senza manico taglia la mano).
  - [x] `Polvere Esplosiva / Chimico (Explosive)` — Materiale puro di crafting (`craftOnly: true`, non utilizzabile da sola) per `Nail Bomb` e `Smoke Bomb`.
  - [x] `Modalità Ascolto (Listen Mode)` — Pesca carte (`draw: 2`) + Scudo tattico.
  - [x] `Bomba Fumogena (Smoke Bomb)` — Scudo elevato + Stordimento nemico (`recipe: ['explosive', 'straccio']`).
  - [x] `Integratori / Pillole (Supplements)` — Guadagno Stamina immediato (`staminaGain: 2`) + piccola cura.
  - [x] `Arco da Caccia (Hunting Bow)` — Colpo silenzioso che ignora lo scudo nemico (`pierceShield: true`).
- [x] **Separazione `tier` (`starter` vs `common`/`uncommon`/`rare`)** e collegamento nel `useCombatEngine` di `bonusStunDamage`, `bonusBleedDamage`, `pierceShield`, `selfDamage`, `staminaGain`, `draw`, `craftOnly` e Crafting in-hand (`CRAFT_CARD`).
- [x] **Seconda & Terza Ondata Carte Extra Lore TLOU (32 Carte Totali)**:
  - [x] `Machete` — Arma da taglio pesante con bonus danni contro nemici sanguinanti (`bonusBleedDamage`).
  - [x] `Fucile a Canne Mozze (Shorty)` — Arma compatta `.12` ad alto impatto ravvicinato (`cost: 0`).
  - [x] `Lanciafiamme (Flamethrower)` — Arma speciale che applica ustione estrema (`burnDamage: 15`).
  - [x] `Corazza Tattica FEDRA (FEDRA Vest)` — Difesa pesante non-retainable (`cost: 2`, `shield: 15`).
  - [x] `Razione di Sopravvivenza (Canned Ration)` — Cura + pescata (`cost: 0`, `heal: 6`, `draw: 1`).
  - [x] `El Diablo` — Pistola da caccia `.357` con mirino ottico (`damage: 22`, `pierceShield: true`, `bleedChance: 1`).
  - [x] `Scatto Disperato (Desperate Sprint)` — Azione ad adrenalina (`cost: 0`, `selfDamage: 2`, `staminaGain: 2`, `draw: 1`).
  - [x] `Martello dei Serafiti (Seraphite Hammer)` — Arma pesante (`cost: 2`, `durability: 3`, `damage: 18`, `pierceShield: true`, `dismemberChance: 0.5`).
- [x] **Espansione Ritratti Sopravvissuti & Bestiario Nemici (`Characters.js` & `enemies.js`)**:
  - [x] Generato e collegato ritratto `Lev.jpg` per **Lev** (6/6 Sopravvissuti completi).
  - [x] Generati e collegati ritratti `Runner.jpg`, `Stalker.jpg`, `WlfGuardDog.jpg`, `WlfSoldier.jpg`, `WlfEnforcer.jpg`, `SeraphiteBrute.jpg` e aggiunti i nuovi nemici (**WLF Guard Dog**, **WLF Soldier**, **WLF Enforcer**, **Seraphite Brute**, **Shambler** — 9 Nemici totali; da generare `Bloater.jpg` e `Shambler.jpg` al reset quota immagini).

### ✅ Milestone 9: Main Menu & Compendium Hub (Completata)
- [x] Barra di navigazione in `AppHeader.jsx` e gestione viste in `App.jsx` con preservazione dello scontro attivo in background.
- [x] Creazione schermata **Main Menu** (`MainMenu.jsx`) con pulsanti `Nuova Partita`, `Riprendi Scontro`, `Compendio` e contatori dinamici.
- [x] Espansione `Compendium.jsx` con 3 tab (**Carte (32)**, **Sopravvissuti (6)**, **Minacce (9)**), filtri per tipo/rarità/crafting, ricerca testuale e pattern mosse nemiche.

### 🗺️ Milestone 10: Mappa di Gioco ad Eventi & Ricompense (Draft)
- [ ] Mappa a bivi della Zona di Quarantena con nodi: **Scontro Infetto**, **Evento Scavenging** (Farmacia, Cassa FEDRA, Banco da Lavoro), **Rifugio / Falò** (Cura o Rimozione carta) e **Boss Finale (Bloater)**.
- [ ] Schermata **Ricompensa Post-Scontro**: scelta di 1 nuova carta su 3 dal pool delle carte ottenibili.

### ⚔️ Milestone 11: Integrazione Completa Run & Loadout nell'Arena
- [ ] Collegamento dello Starter Deck, del Sopravvissuto scelto e degli HP persistenti tra i nodi della Mappa e l'`Arena.jsx`.

<!-- ================================================================= -->
<!-- FINE SEZIONE: Dettaglio Task per Milestone                        -->
<!-- ================================================================= -->

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Registro delle Sessioni e Commit                  -->
<!-- ================================================================= -->
## 📝 Registro Attività e Sessioni

### Sessione 3 (Implementazione Completa M2 -> M7 per Checkpoint)
- **Milestone 2**: Implementato deck engine runtime con `instanceId`, shuffle Fisher-Yates, gestione `retainable` e rimescolo automatico degli scarti.
- **Milestone 3**: Implementato sistema `enemyIntent` con badge telegrafo sopra `EnemiesCard` e animazioni `isEnemyAttacking` / `isEnemyHit`.
- **Milestone 4**: Implementata durabilità armi (`durability`), riserva/consumo munizioni (`ammoType`), e collegate le immagini mancanti in `cards.js`.
- **Milestone 5**: Implementato motore status alterati runtime (`isStun`, `isBleeding`, `isPoisoned`, `isDismember`, `burnDuration`, `cleanse`).
- **Milestone 6**: Implementato layout a ventaglio (`PlayerHand.jsx`), indicatori visivi di giocabilità, contatori `Draw Pile` / `Discard Pile` e banner di fine partita con pulsante "Rigioca / Nuovo Scontro".
- **Milestone 7**: Estratto il combat loop in `src/hooks/useCombatEngine.js` basato su `useReducer`, pulito il codice in `Arena.jsx`, allineato il case degli import immagini e corretto `SignaturesCards.jsx`.

### Sessione 2 (Analisi Avanzamento M1 & Pianificazione M2)
- Completata **Milestone 1**: pipeline danni (`enemyShield` -> `enemyHp`), scudo giocatore (`playerShield`), cure con cap (`Math.min`), turno nemico base con `shieldHandler` e condizioni `isVictory`/`isGameOver`/`isBattleOver`.
- Avviata **Milestone 2**: predisposti stati `drawPile` e `discardPile`, scarto singola carta giocata.
- Identificati i prossimi step immediati in `Arena.jsx`: correzione sintassi `drawCards(5)` e `refillCard()`, implementazione pescata con rimescolamento scarti e gestione `retainable`.

### Sessione Iniziale (Setup & Pianificazione)
- Analisi del codice esistente ([Arena.jsx](src/components/Arena.jsx), [card.jsx](src/components/card.jsx), [PlayerHand.jsx](src/components/PlayerHand.jsx)).
- Creazione del piano di implementazione e priorità `mentorGDEV`.
- Creazione della skill front-end `tlou-card-ui`.

<!-- ================================================================= -->
<!-- FINE SEZIONE: Registro delle Sessioni e Commit                    -->
<!-- ================================================================= -->
