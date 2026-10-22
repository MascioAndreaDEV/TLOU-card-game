<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Intestazione e Panoramica Implementazione         -->
<!-- ================================================================= -->
# 📋 TLOU: Survival Card Battler - Registro di Implementazione

Documento vivo di tracciamento dello stato di avanzamento, delle milestone architetturali e dei progressi di sviluppo del gioco.

- **Stack**: React + Vite + Tailwind CSS / Vanilla CSS
- **Architettura**: Data-Driven (Blueprint vs Runtime State) + Combat State Machine
- **Tema**: Post-apocalittico tattico (The Last of Us)

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Tabellone Milestone e Stato                       -->
<!-- ================================================================= -->
## 📊 Tabellone Milestone

| Milestone | Descrizione | Stato | Priorità |
| :--- | :--- | :--- | :--- |
| **M0: Foundation** | Setup Vite, Blueprint `cards.js` & `enemies.js`, bozza UI | 🟢 Completata | Bassa |
| **M1: Damage & Targeting Pipeline** | Correzione bersagli danno/scudo/cura, Win/Loss conditions | 🟡 In Corso | **Alta (Urgente)** |
| **M2: Deck Engine & Piles** | Mazzo di pesca (Draw), Scarti (Discard), Rimescolamento, `retainable` | ⚪ Da Iniziare | **Alta** |
| **M3: Enemy Intent & Telegrafo** | Visualizzazione mossa nemica preventiva, ciclo fine turno | ⚪ Da Iniziare | Media-Alta |
| **M4: Survival Mechanics** | Durabilità armi bianche (`durability`), armi da fuoco e munizioni | ⚪ Da Iniziare | Media |
| **M5: Status Alterati** | Meccaniche Stun (salto turno), Bleed (danno continuo), Dismember | ⚪ Da Iniziare | Media |
| **M6: UI/UX & Card Fanning** | Disposizione a ventaglio mano carte, animazioni di impatto, visual Arena | ⚪ Da Iniziare | Media-Alta |
| **M7: State Engine Refactoring** | Migrazione ad architettura robusta (`useReducer` / Custom Hook) | ⚪ Da Iniziare | Media |

*Legenda: 🟢 Completata | 🟡 In Corso | ⚪ Da Iniziare | 🔴 Bloccata*

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Dettaglio Task per Milestone                      -->
<!-- ================================================================= -->
## 🛠️ Dettaglio Task

### 🎯 Milestone 1: Damage & Targeting Pipeline (Attuale)
- [ ] **Targeting Danni Corretto**: Quando il giocatore gioca una carta attacco, il danno deve colpire `enemyShield` e poi `enemyHp` (non il giocatore).
- [ ] **Targeting Difesa Corretto**: Le carte scudo aumentano `playerShield`.
- [ ] **Targeting Cure**: Le carte cura aumentano `playerHp` senza superare il cap massimo del personaggio.
- [ ] **Condizioni di Fine Combattimento**:
  - [ ] Vittoria se `enemyHp <= 0`.
  - [ ] Game Over se `playerHp <= 0`.

### 🃏 Milestone 2: Deck Engine & Piles
- [ ] Inizializzare `drawPile` come copia mescolata del mazzo iniziale.
- [ ] Pescata dinamica a inizio turno (fino al limite mano, es. 5-6 carte).
- [ ] Sistema di rimescolamento (*reshuffle*): se `drawPile` è vuoto e si richiede una carta, `discardPile` viene mischiato e diventa il nuovo `drawPile`.
- [ ] Gestione scarto a fine turno: le carte giocate o rimaste in mano vanno in `discardPile`, tranne quelle con `retainable: true`.

### 👁️ Milestone 3: Enemy Intent & Telegrafo
- [ ] Calcolo dell'intenzione nemica a inizio turno del giocatore (mostrata sopra il nemico).
- [ ] Risoluzione dell'intento nemico quando si preme "Fine Turno".
- [ ] Generazione del nuovo intento per il turno successivo.

### 🔨 Milestone 4: Survival Mechanics (Durabilità & Munizioni)
- [ ] Decremento durabilità delle armi (`durability - 1`) ad ogni utilizzo.
- [ ] Rottura e scarto dell'arma quando la durabilità raggiunge 0.
- [ ] Controllo requisiti munizioni per le armi da fuoco (`ammoType`).

### 🩸 Milestone 5: Status Alterati
- [ ] Risoluzione Stun: se il nemico è stordito, salta il proprio turno e rimuove lo status.
- [ ] Risoluzione Bleed: danno automatico a fine/inizio turno che ignora lo scudo.

### 🎨 Milestone 6: UI/UX, Card Fanning & Visual Arena
- [ ] Implementazione disposizione a ventaglio per la mano (`PlayerHand.jsx`) con rotazione e traslazione ad arco.
- [ ] Elevazione e zoom della carta in hover senza glitch di sovrapposizione (`z-index`).
- [ ] Indicatori visivi di stamina insufficiente (carta opacizzata/rossa).
- [ ] Feedback visivo dei colpi (`shake`, numeri di danno fluttuanti).
- [ ] Look & Feel post-apocalittico scuro (vignettatura, tinte ruggine/fungine stile cordyceps).

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Registro delle Sessioni e Commit                  -->
<!-- ================================================================= -->
## 📝 Registro Attività e Sessioni

### Sessione Iniziale (Setup & Pianificazione)
- Analisi del codice esistente ([Arena.jsx](src/components/Arena.jsx), [card.jsx](src/components/card.jsx), [PlayerHand.jsx](src/components/PlayerHand.jsx)).
- Creazione del piano di implementazione e priorità `mentorGDEV`.
- Creazione della skill front-end `tlou-card-ui`.

<!-- ================================================================= -->
<!-- FINE SEZIONE: Intestazione e Panoramica Implementazione           -->
<!-- ================================================================= -->
