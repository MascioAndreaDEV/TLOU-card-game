<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Intestazione e Descrizione del Progetto           -->
<!-- ================================================================= -->
# 🌿 The Last of Us - Survival Card Battler

Un gioco di carte tattico a turni (Roguelike Deckbuilder) ispirato all'universo e alle atmosfere survival di **The Last of Us**, sviluppato con **React** e **Vite**.

Il progetto reinterpreta la tensione, la brutalità e la scarsità di risorse del videogioco originale attraverso meccaniche deckbuilding: ogni carta rappresenta un'azione, un'arma improvvisata o una risorsa preziosa.

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Pilastri del Game Design                          -->
<!-- ================================================================= -->
## 🎯 Pilastri del Game Design

1. **Gestione Rigorosa delle Risorse (Survival)**:
   - Le munizioni sono rare e limitate.
   - Le armi bianche hanno una **durabilità** e si rompono con l'uso.
   - Punti Stamina/Energia limitati per turno per costringere a scelte tattiche tra attacco e difesa.

2. **Dati Snelli e Modulari (Data-Driven Architecture)**:
   - Modello delle carte basato su effetti attivi (`effects` contiene solo ciò che la carta applica davvero, evitando oggetti pieni di zeri inutilizzati).
   - Separazione netta tra **Dati Statici (Blueprint)** e **Stato a Runtime (Gameplay State)**.

3. **Status e Probabilità Contestuali**:
   - Meccaniche di combattimento basate sull'impatto: **Stordimento (Stun)**, **Sanguinamento (Bleed Chance)** e **Smembramento (Dismember Chance)**.

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Struttura Dati e Modelli                          -->
<!-- ================================================================= -->
## 🃏 Modello Dati

### 1. Le Carte (`src/data/cards.js`)
Ogni carta possiede metadati identificativi e un blocco dinamico `effects`:

```javascript
// Esempio: Mazza Chiodata (Arma con durabilità e persistenza)
{
    id: 'spine-wood',
    name: 'spine-wood',
    cardType: 'weapon',
    retainable: true,      // Conservabile nella mano tra i turni
    cost: 2,               // Costo in stamina
    durability: 2,         // Cariche/colpi prima della rottura
    effects: {
        damage: 12,
        bleedChance: 1     // 100% probabilità di sanguinamento
    }
}
```

### Categorie di Carte
- **Action / Utility**: Azioni immediate usa e getta (es. *Glass Bottle* con stordimento, *Cover* con scudo).
- **Melee Weapons**: Armi da corpo a corpo con durabilità limitata e danno elevato (es. *Spine-Wood*).
- **Ranged Weapons**: Armi da fuoco potenti che richiedono proiettili compatibili (es. *Shotgun* con requisito `ammoType: 'calibro12'`).
- **Defense**: Manovre evasive e di protezione a basso costo (es. *Dodge*).

---

### 2. I Nemici (`src/data/enemies.js`)
I nemici rappresentano le minacce del mondo post-apocalittico (Infetti e Cacciatori):

```javascript
// Esempio: Il Runner
{
    id: 'runner',
    name: 'runner',
    type: 'infected',
    hp: 30,
    damage: 2,
    status: {
        isStun: false,
        isBleeding: false,
        isDismember: false
    }
}
```

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Architettura Software                             -->
<!-- ================================================================= -->
## 🏗️ Architettura dell'Applicazione

L'applicazione è strutturata su tre livelli logici:

1. **Core Combat Engine**:
   - Gestione del turno del Giocatore e del Nemico.
   - Risoluzione effetti carte (danni, armature, status alterati).
   - Calcolo probabilistico a runtime per status (Bleed / Dismember).

2. **Player & Run State**:
   - Vita del Giocatore e Stamina per turno.
   - Mazzo di pesca (Draw Pile), Mano (Hand), Pila degli scarti (Discard Pile).
   - Inventario materiali (munizioni, risorse mediche).

3. **Overworld & Scavenging System (Roadmap)**:
   - Mappa a nodi per avanzamento tra le zone.
   - Eventi di esplorazione casuali e scelte di rischio/rendimento a tema *The Last of Us*.

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Roadmap di Sviluppo                               -->
<!-- ================================================================= -->
## 🗺️ Roadmap di Sviluppo

- [x] Setup ambiente Vite + React.
- [x] Definizione architettura dati carte (`cards.js`).
- [x] Definizione architettura dati nemici di base (`enemies.js`).
- [ ] Componente visuale `<Card />` con stile e badge dinamici.
- [ ] Componente visuale `<Enemy />` con barra vita e status attivi.
- [ ] Combat Loop a turni con gestione dello stato React (`useState` / `useReducer`).
- [ ] Sistema di inventario e consumo munizioni per armi da fuoco.
- [ ] Sistema mappa, eventi e scavenging casuale.

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Come Avviare il Progetto                          -->
<!-- ================================================================= -->
## 🚀 Come Avviare il Progetto

### Prerequisiti
- Node.js (v18 o superiore)
- Gestore pacchetti `pnpm` o `npm`

### Installazione e Avvio
```bash
# Installazione delle dipendenze
pnpm install

# Avvio del server di sviluppo locale
pnpm dev
```
