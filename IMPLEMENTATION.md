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
| **M10: Event Map & Draft Rewards** | Mappa a nodi/eventi (Scontri, Scavenging, Rifugio, Boss) e scelta ricompensa 1-su-3 | 🟢 Completata | Completata |
| **M11: Full Run & Loadout Integration** | Collegamento completo Starter Deck, Sopravvissuto e progressione Run nell'Arena | 🟢 Completata | Completata |
| **M12: Hero Signature Cards & Passives** | 12 Carte Signature uniche (2 per eroe: 1 Starter + 1 Evento/Rifugio) + Tratto Passivo Lore | 🟢 Completata | Completata |
| **M13: TCG Card Frame & UI Restyling** | Frame TCG completo (`card.jsx`), bordi per rarità/signature, badge costo circolare e box effetti | 🟢 Completata | Completata |
| **M14: Arena Overhaul & Dynamic Biomes** | Restyling `PlayerHUD` (Damage Ghost, Stamina Orbs), `EnemiesCard`, Floating Text e Sfondi per Nemico | 🟢 Completata | Completata |
| **M15: Branching Map (Slay the Spire)** | Grafo ramificato a 7 piani con linee SVG interattive e scelta multi-sentiero (`RunMap.jsx`) | 🟢 Completata | Completata |
| **M16: Motion Transitions & MainMenu FX** | Transizioni fluide con `motion` (Framer Motion), Spore CSS e Card Spedizione Attiva in `MainMenu.jsx` | 🟢 Completata | Completata |
| **M17: Full-Viewport Arena & Dynamic Hand** | Schermate `Menu` e `Arena` full-screen senza scroll (`100dvh`), rimozione box contenitore Arena e mano adattiva senza tagli | ⚪ Da Iniziare | Alta |
| **M18: End-Turn Discard & Weapon Durability** | Scarto di tutte le carte a fine turno tranne i 4 Materiali di Crafting (`retainable: true`) e persistenza durabilità armi | ⚪ Da Iniziare | Alta |
| **M19: Event Loot Card Reveal Modal** | Schermata animata di reveal della carta ottenuta da Cassa Militare / Signature con pulsante `Continua sulla Mappa` | ⚪ Da Iniziare | Alta |
| **M20: Top-Down Vertical World Map** | Mappa vista dall'alto Sud→Nord (Campagna → Suburbia → Città) con Landmark integrati e sentieri curvi | ⚪ Da Iniziare | Alta |
| **M21: 2D Animated Combat Actors (StS Style)** | Modelli/Sprite 2D animati per Sopravvissuti e Nemici nell'Arena (Idle, Attack Lunge, Hit Recoil, Stun) + Skill `tlou-2d-animator` | ⚪ Da Iniziare | Media |

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
  - [x] Generati e collegati ritratti `Runner.jpg`, `Stalker.jpg`, `WlfGuardDog.jpg`, `WlfSoldier.jpg`, `WlfEnforcer.jpg`, `SeraphiteBrute.jpg`, `Shambler.jpg`, `Bloater.jpg` e aggiunti i nuovi nemici (**WLF Guard Dog**, **WLF Soldier**, **WLF Enforcer**, **Seraphite Brute**, **Shambler** — 9/9 Nemici completi).

### ✅ Milestone 9: Main Menu & Compendium Hub (Completata)
- [x] Barra di navigazione in `AppHeader.jsx` e gestione viste in `App.jsx` con preservazione dello scontro attivo in background.
- [x] Creazione schermata **Main Menu** (`MainMenu.jsx`) con pulsanti `Nuova Partita`, `Riprendi Scontro`, `Compendio` e contatori dinamici.
- [x] Espansione `Compendium.jsx` con 3 tab (**Carte (32)**, **Sopravvissuti (6)**, **Minacce (9)**), filtri per tipo/rarità/crafting, ricerca testuale e pattern mosse nemiche.

### ✅ Milestone 10: Mappa di Gioco ad Eventi & Ricompense (Draft) (Completata)
- [x] Mappa a 6 nodi della Zona di Quarantena (`RunMap.jsx`): **Scontro Base**, **Scontro Medio**, **Evento Avamposto FEDRA (Falò +25 HP o Cassa Scavenging +1 Carta Rara & +8 HP)**, **Scontro Avanzato**, **Scontro Elite** e **Boss Finale (Bloater)**.
- [x] Schermata **Ricompensa Post-Scontro** in `Arena.jsx`: scelta di **1 nuova carta su 3** dal pool delle carte ottenibili (`common`, `uncommon`, `rare`) oppure cura rapida (`+5 HP`).

### ✅ Milestone 11: Integrazione Completa Run & Loadout nell'Arena (Completata)
- [x] Selezione iniziale del **Sopravvissuto** (`RunMap.jsx`), generazione dello **Starter Deck (12 carte)**, visualizzatore zaino carte attuale e persistenza degli **HP residui** (`initialPlayerHp`) tra i nodi della Mappa e l'`Arena.jsx`.

---

## 🎨 Fase 3: Restyling Estetico TCG, Carte Signature Eroi, Mappa a Bivi & Animazioni (M12–M16)

### ✅ Milestone 12: Carte Uniche (Signature Cards) & Passiva Lore per i 6 Sopravvissuti (Completata)
- [x] **Sistema Doppia Carta Signature + Passiva Eroe (`Characters.js` & `cards.js` — 44 Carte Totali)**:
  - Ogni eroe (`Joel`, `Tommy`, `Ellie`, `Dina`, `Abby`, `Lev`) possiede **1 Tratto Passivo Lore** attivo in combattimento e **2 Carte Signature Esclusive** (`tier: 'signature'`, `heroId`):
    - **Signature #1 (Iniziale)**: inclusa in 2 copie nello Starter Deck dell'eroe scelto.
    - **Signature #2 (Reliquia / Avanzata)**: sbloccabile esclusivamente da quell'eroe nei **Rifugi**, negli **Eventi di percorso** o nelle **Ricompense Elite/Post-Scontro**.
- [x] Generazione batch di 9 illustrazioni Signature in stile graphic novel TLOU (`JoelBrutalPunch.jpg`, `SarahWatch.jpg`, `TommySpotter.jpg`, `TommyCustomRifle.jpg`, `EllieSwitchblade.jpg`, `SeattleFury.jpg`, `DinaSoundLure.jpg`, `AbbyShoulderCharge.jpg`, `AbbyCombatAdrenaline.jpg`; da generare al prossimo reset quota `DinaRadioTrap.jpg`, `LevRapidShot.jpg`, `LevIncendiaryArrows.jpg`).

### ✅ Milestone 13: Restyling Frame TCG delle Carte (`card.jsx`) (Completata)
- [x] **Badge Costo Stamina Circolare** in alto a sinistra con feedback visivo giocabile/non giocabile.
- [x] **Cornice e Bagliore per Rarità (`tier`)**: `starter` (Zinco), `common` (Smeraldo), `uncommon` (Ciano), `rare` (Ambra/Oro), `signature` (Cremisi/Rosa Eroico con stella `★ Eroe`).
- [x] **Finestra Artwork Ampliata** con badge Durabilità e Calibro Munizioni sovrapposti in stile TCG moderno.
- [x] **Box Effetti Strutturato** con descrizione testuale concisa + icone + ricetta Crafting.

### ✅ Milestone 14: Restyling Arena, HUD con Damage Ghost, Floating Text & Sfondi Dinamici (Completata)
- [x] **`PlayerHUD.jsx`**: Ritratto eroe incorniciato, indicatori **Stamina Orbs** (pallini luminosi), **Barra Vita con "Damage Ghost"** (buffer bar ritardata che scende gradualmente) e badge **Scudo** integrato.
- [x] **`EnemiesCard.jsx`**: Rimozione del vecchio `bg-yellow-900`, nuovo frame tattico grunge scuro (`stone-950/zinc-900`), badge Intent cinematografico e barra vita con *Damage Ghost*.
- [x] **Floating Combat Text (`Arena.jsx` & `useCombatEngine.js`)**: Numeri fluttuanti animati (`-18 HP`, `+10 Scudo`, `+6 HP`, `STORDITO!`) al centro dello scontro.
- [x] **Sfondi Dinamici per Fazione/Nemico (`Arena.jsx` & `index.css`)**: Atmosfera visiva diversa in base al nemico affrontato (*Galleria Infetta* per Runner/Clicker/Stalker, *Rovine Piovose di Seattle* per WLF Guard Dog/Soldier/Enforcer, *Settore Rosso Allerta Massima* per Shambler/Seraphite Brute/Bloater).

### ✅ Milestone 15: Mappa Ramificata in stile *Slay the Spire* (`RunMap.jsx`) (Completata)
- [x] **Grafo a 7 Piani con Bivi Multipli**: 15 nodi su 7 piani collegati da **sentieri SVG tratteggiati**.
- [x] **Scelta Tattica del Percorso**: Il giocatore sceglie liberamente quale sentiero imboccare ad ogni piano, sbloccando solo i nodi collegati alla propria posizione attuale (`Scontro`, `Elite`, `Rifugio`, `Scavenging`, `Evento`, `Boss Finale`).

### ✅ Milestone 16: Transizioni con `motion` (Framer Motion) & Atmosfera Main Menu (Completata)
- [x] Installazione di `motion` tramite `pnpm add motion` e animazioni di transizione vista in `App.jsx`.
- [x] **`MainMenu.jsx`**: Particelle di Spore fluttuanti in CSS, vignettatura cinematografica e **Card Riepilogativa della Spedizione in Corso** (eroe attivo, piano mappa attuale, HP e dimensione mazzo prima di cliccare *Riprendi Spedizione*).

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Fase 4 - Full-Screen, Scarti, Mappa Top-Down & 2D -->
<!-- ================================================================= -->
## 🗺️ Fase 4: Ottimizzazione Schermate Full-Viewport, Revisione Scarti, Reveal Ricompense, Mappa Top-Down & Attori 2D (M17–M21)

> **Regola Git Obbligatoria**: Eseguire **1 commit atomico dedicato alla chiusura di ogni singola Milestone** (`M17`, `M18`, `M19`, `M20`, `M21`).

### ⚪ Milestone 17: Full-Viewport Lock (`Menu` & `Arena`) e Rimozione Contenitore Arena per Spazio Mano (Da Iniziare)
- [ ] **Schermate Full-Screen Senza Scroll Verticale (`App.jsx`, `MainMenu.jsx`, `Arena.jsx`, `index.css`)**:
  - [ ] Bloccare l'altezza delle viste `menu` e `arena` all'intera viewport (`h-dvh overflow-hidden`) affinché lo sfondo e l'interfaccia occupino esattamente il 100% della pagina senza mai scorrere.
- [ ] **Rimozione del Contenitore Boxato dell'Arena (`Arena.jsx`)**:
  - [ ] Eliminare il box `max-w-7xl rounded-2xl border overflow-hidden` attorno allo scontro: portare lo sfondo dinamico del bioma a tutto schermo (`fixed inset-0`) e lasciare l'area di combattimento libera su tutta la larghezza della finestra.
- [ ] **Espansione Spazio Mano Carte (`PlayerHand.jsx`)**:
  - [ ] Rimuovere i vincoli di larghezza/clipping sulla mano e rendere l'overlap orizzontale (`marginLeft`) e la scala dinamici in base a `hand.length`, così anche con 6–8+ carte in mano tutte le carte entrano comodamente nello schermo senza essere tagliate.

### ⚪ Milestone 18: Revisione Scarto a Fine Turno (`retainable`) & Persistenza Durabilità Armi (Da Iniziare)
- [ ] **Scarto Totale a Fine Turno Eccetto i 4 Materiali di Crafting (`cards.js`)**:
  - [ ] Impostare `retainable: true` **solo** sui 4 Materiali di Crafting (`straccio`, `alcool`, `blade`, `explosive`) per agevolare l'assemblaggio tra i turni.
  - [ ] Impostare `retainable: false` su tutte le altre 40 carte (armi, munizioni, attacchi, difese, azioni, utility consumabili e carte Signature).
- [ ] **Persistenza Durabilità Armi negli Scarti (`useCombatEngine.js` & `card.jsx`)**:
  - [ ] Quando un'arma non viene usata o viene usata parzialmente nel turno (`durability > 0`), a fine turno finisce in `discardPile` conservando la propria `durability` residua per quando verrà ripescata.
  - [ ] Aggiungere il badge visivo `📌 Resta in Mano` su `card.jsx` per le 4 carte `retainable: true`.

### ⚪ Milestone 19: Modale Reveal "Carta Ottenuta" nei Nodi Evento / Cassa Militare (Da Iniziare)
- [ ] **Schermata di Rivelazione Carta (`App.jsx` & `RunMap.jsx`)**:
  - [ ] Quando il giocatore clicca su *"📦 Cassa Militare (+1 Carta Rara/Non Comune)"* o *"★ Sblocca Signature"*, mostrare una schermata/modale animata con la `<Card />` appena estratta, il riepilogo degli HP curati e il pulsante **"🗺️ Continua sulla Mappa →"** prima di passare al piano successivo.

### ⚪ Milestone 20: Mappa Tattica Top-Down Verticale (Sud → Nord: Campagna → Città) (Da Iniziare)
- [ ] **Sfondo Cartografico Top-Down & Sviluppo Verticale Sud → Nord (`RunMap.jsx` & `App.jsx`)**:
  - [ ] Progressione dal **Basso (Sud — Piani 0–2: Campagne, Boschi e Fattorie)** al **Centro (Piani 3–4: Suburbia, Autostrada Crollata e Blocchi WLF)** fino all'**Alto (Nord — Piani 5–6: Centro Città Infetta e Grattacielo Boss)**.
  - [ ] Sentieri curvi organici (`<path>` SVG in curva di Bézier) che seguono strade e tracciati.
  - [ ] Ogni tappa integrata esteticamente nella mappa come **Landmark illustrato/topografico** con pedina del Sopravvissuto e anteprima interattiva.

### ⚪ Milestone 21: Modelli/Sprite 2D Animati per Sopravvissuti e Nemici (Stile *Slay the Spire*) (Da Iniziare)
- [ ] **Creazione Skill `.agents/skills/tlou-2d-animator/SKILL.md`**:
  - [ ] Linee guida architetturali per rigging 2D a livelli (`motion` / CSS Puppet / Sprite scontornati), stati d'animazione (`idle`, `attack`, `hit`, `stun`, `defend`, `death`) e VFX da impatto.
- [ ] **Attori 2D sul Campo di Battaglia (`Arena.jsx`, `FighterStage2D.jsx`)**:
  - [ ] Disposizione faccia a faccia in stile *Slay the Spire* (Sopravvissuto a sinistra e Nemico a destra su pedane tattiche, eliminando l'aspetto da "card statica").
  - [ ] Animazioni continue di **Idle breathing** (respiro, oscillazione arma, ombra dinamica), **Attack Lunge** (scatto in avanti verso il bersaglio), **Hit Recoil** (rinculo + flash + particelle) e **Stun Wobble**.
  - [ ] Completamento delle ultime 3 illustrazioni Signature mancanti (`DinaRadioTrap.jpg`, `LevRapidShot.jpg`, `LevIncendiaryArrows.jpg`).
<!-- ================================================================= -->
<!-- FINE SEZIONE: Fase 4 - Full-Screen, Scarti, Mappa Top-Down & 2D   -->
<!-- ================================================================= -->

<!-- ================================================================= -->
<!-- FINE SEZIONE: Dettaglio Task per Milestone                        -->
<!-- ================================================================= -->

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Registro delle Sessioni e Commit                  -->
<!-- ================================================================= -->
## 📝 Registro Attività e Sessioni

### Sessione 4 (Consolidamento Fase 3 M12–M16 & Pianificazione Fase 4 M17–M21)
- Completate e verificate **Milestone 12–16**: 12 Carte Signature Eroi + Passive Lore, nuovo Frame TCG (`card.jsx`), Arena con Damage Ghost, Stamina Orbs, Floating Combat Text, Sfondi Dinamici, Mappa a bivi su 7 piani e animazioni `motion`.
- Pianificata **Fase 4 (M17–M21)**: ottimizzazione schermate full-viewport (`100dvh` senza scroll) e rimozione contenitore Arena per la mano di carte (M17), scarto totale a fine turno eccetto i 4 materiali di crafting (M18), modale reveal per carta rara ottenuta nei nodi evento (M19), mappa top-down verticale Sud→Nord da Campagna a Città (M20) e modelli 2D animati in stile *Slay the Spire* per personaggi e nemici (M21).

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
