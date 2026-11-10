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
| **M3: Enemy Intent & Telegrafo** | Visualizzazione mossa nemica preventiva (Intent), ciclo fine turno completo | 🟡 In Corso | **Alta (Urgente)** |
| **M4: Survival Mechanics** | Durabilità armi (`durability`), armi da fuoco e consumo munizioni (`ammoType`) | ⚪ Da Iniziare | Media |
| **M5: Status Alterati** | Meccaniche Stun, Bleed, Poison, Dismember e Cleanse | ⚪ Da Iniziare | Media |
| **M6: UI/UX & Card Fanning** | Disposizione a ventaglio mano carte, animazioni di impatto, visual Arena | ⚪ Da Iniziare | Media-Alta |
| **M7: State Engine Refactoring** | Pulizia dead code e migrazione a `useReducer` / Custom Hook | ⚪ Da Iniziare | Media |

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

### 👁️ Milestone 3: Enemy Intent & Telegrafo
- [ ] Stato `enemyIntent` calcolato a inizio turno del giocatore e mostrato sopra `EnemiesCard` (icona attacco + valore danno o icona scudo).
- [ ] In `handleEndTurn`, eseguire la mossa già telegrafata in `enemyIntent` invece di estrarne una al buio.
- [ ] Generare il nuovo `enemyIntent` per il turno successivo dopo l'azione nemica.
- [ ] Attivare i feedback visivi già predisposti in `Arena.jsx` e `EnemiesCard.jsx` (`isEnemyAttacking`, `isEnemyHit`).

### 🔨 Milestone 4: Survival Mechanics (Durabilità & Munizioni)
- [ ] **Allineamento Dati `cards.js`**:
  - [ ] Aggiungere `ammoType` mancante alle carte munizione `ammo.12` (`'calibro.12'`), `Ammo.357` (`'calibro.357'`), `Ammo.308` (`'calibro.308'`).
  - [ ] Collegare le immagini già presenti in `src/assets/img/` (`Cover.png`, `Schivata.png`) alle carte `cover` e `dodge`.
- [ ] **Durabilità Armi/Oggetti**:
  - [ ] Decrementare `durability` ad ogni utilizzo delle carte `retainable` / `weapon`.
  - [ ] Scartare o distruggere la carta solo quando `durability` arriva a `0` (se `durability > 0`, la carta resta utilizzabile/in mano).
- [ ] **Sistema Munizioni**:
  - [ ] Controllare il requisito `ammoType` per le armi da fuoco prima di permettere la giocata e consumare la relativa risorsa munizione.

### 🩸 Milestone 5: Status Alterati
- [ ] Spostare `enemy.status` e `character.status` nello stato runtime di `Arena.jsx` (evitando di mutare il blueprint statico).
- [ ] **Stun (`isStun`)**: Se il nemico è stordito, salta il proprio turno e rimuove lo status a fine turno nemico.
- [ ] **Bleed (`isBleeding`) & Poison (`isPoisoned`)**: Danno periodico a inizio/fine turno e decremento di `duration`.
- [ ] **Cleanse**: Rimozione degli status negativi (es. giocando `MedKit`).

### 🎨 Milestone 6: UI/UX, Card Fanning & Visual Arena
- [ ] Implementazione disposizione a ventaglio per la mano (`PlayerHand.jsx`) con rotazione e traslazione ad arco.
- [ ] Elevazione e zoom della carta in hover senza glitch di sovrapposizione (`z-index`).
- [ ] Indicatori visivi di stamina insufficiente (carta opacizzata/bordo rosso se `stamina < card.cost`).
- [ ] Contatori visivi per `Draw Pile` e `Discard Pile` nell'HUD/Arena.
- [ ] Schermata/Banner di Vittoria o Sconfitta con pulsante "Rigioca / Nuovo Scontro".

### 🧹 Milestone 7: Pulizia Codice & State Engine Refactoring
- [ ] Rimuovere le funzioni helper obsolete non più usate in `Arena.jsx` (`handlePlayerHp`, `handleHp`, `handleEnemyShield`, `handlePlayerShield`, `handleStamina`).
- [ ] Uniformare il case dei nomi file immagini importati in `cards.js`, `enemies.js` e `Characters.js` (es. `Bottle.png`, `SpineWood.png`, `Clicker.png`, `Joel.jpg`).
- [ ] Correggere il typo nel nome funzione `PayerHand` -> `PlayerHand` in `PlayerHand.jsx` e la sintassi import in `SignaturesCards.jsx`.
- [ ] Migrazione del combat loop verso `useReducer` o custom hook dedicato (`useCombatEngine`).

<!-- ================================================================= -->
<!-- FINE SEZIONE: Dettaglio Task per Milestone                        -->
<!-- ================================================================= -->

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Registro delle Sessioni e Commit                  -->
<!-- ================================================================= -->
## 📝 Registro Attività e Sessioni

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
