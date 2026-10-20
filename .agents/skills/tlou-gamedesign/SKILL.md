---
name: tlou-gamedesign
description: >-
  Usare quando si progetta o implementa una meccanica del TLOU Survival Card Battler
  (combat loop, turni, carte, nemici, status, durabilità, munizioni, mazzo/scarti),
  o quando si fa debug/review della logica di combattimento. Fornisce architettura,
  glossario, checklist edge case e template per nuove carte/nemici.
---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Skill Game Design TLOU                            -->
<!-- ================================================================= -->

# TLOU Game Design Skill

Lavora in coerenza con la regola `mentorGDEV` (mentoring didattico, italiano,
niente file giganti copia-incolla se non richiesti, commenti `INIZIO/FINE SEZIONE`).

## 1. Glossario
- **Stamina**: risorsa per turno, ripristinata a inizio Player Turn.
- **Draw Pile / Discard Pile**: mazzo di pesca / scarti (rimescolo scarti se Draw vuoto).
- **retainable**: la carta resta in mano a fine turno.
- **durability**: usi residui di arma/oggetto; a 0 -> rottura/scarto.
- **ammoType**: arma da fuoco richiede carta munizione compatibile (`calibro.9`, `.12`, `.308`...).
- **Status**: `isStun`, `isBleeding`, `isDismember`, `isPoisoned` (+ `duration`, danno per tick).
- **Intent**: mossa nemica telegrafata, risolta nell'Enemy Turn.

## 2. Architettura da rispettare
1. **Blueprint vs Runtime**: `src/data/*.js` sono immutabili. Mano, durabilità residua,
   HP, status vivono nello stato dell'Arena (copie/istanze con id univoco).
2. **State machine**: Player Start -> Player Action -> Turn Transition -> Enemy Turn -> Reset.
3. **Pipeline danni**: Danno -> Scudo -> HP; poi effetti probabilistici
   (`bleedChance`, `dismemberChance`), poi durabilità.
4. **Immutabilità**: nessuna mutazione dello state; preferire `useReducer` per il combat loop.
5. **Game feel**: feedback visivo per hit, intent telegrafato, badge status.

## 3. Checklist edge case (da controllare SEMPRE)
- [ ] Stamina insufficiente: carta non giocabile, nessun side-effect.
- [ ] Draw Pile vuoto + Discard vuoto: nessun crash, pescata parziale.
- [ ] Arma da fuoco senza munizioni compatibili.
- [ ] Durabilità a 0: carta rimossa, non rimessa in mano.
- [ ] Nemico stunnato: salta l'attacco e lo stun si resetta.
- [ ] Scudo > danno: HP invariati, scudo residuo corretto.
- [ ] Carte `retainable` non scartate a fine turno.
- [ ] Morte nemico a metà pipeline: nessun tick successivo.
- [ ] Status con `duration` scaduta: rimosso correttamente.
- [ ] Double-click / azioni durante Enemy Turn bloccate (no race condition).

## 4. Template nuova carta (`cards.js`)
```js
// === INIZIO SEZIONE: carta <nome> ===
{
  id: 'nome_univoco',
  cardType: 'attack' | 'defense' | 'action' | 'weapon' | 'ammo' | 'utility',
  retainable: false,
  name: 'Nome',
  cost: 1,
  durability: 2,          // solo weapon/ammo/utility
  ammoType: 'calibro.9',  // solo armi da fuoco e munizioni
  img: importedImage,
  effects: { damage: 0, shield: 0, heal: 0, bleedChance: 0, dismemberChance: 0, stun: false },
},
// === FINE SEZIONE: carta <nome> ===
```

## 5. Template nuovo nemico (`enemies.js`)
```js
// === INIZIO SEZIONE: nemico <NOME> ===
{
  id: 'id_univoco', name: 'NOME', type: 'infected', hp: 40, image: img,
  status: { isStun: false, isBleeding: false, isDismember: false, isPoisoned: false },
  moves: [
    { id: 'mossa', name: 'mossa', damage: 5 },
    { id: 'difesa', name: 'difesa', shield: 4 },
    { id: 'veleno', name: 'veleno', damage: 3,
      effects: [{ isPoisoned: true, damagePoison: 2, duration: 2 }] },
  ],
},
// === FINE SEZIONE: nemico <NOME> ===
```
Nota: ogni `id` mossa/carta deve essere univoco; evitare `name` duplicati copiati per errore.

## 6. Commit suggeriti
`feat(combat): ...`, `fix(combat): ...`, `feat(cards): ...`, `refactor(combat): ...`
Un commit atomico per sotto-fase; salvare prima di refactoring grossi (es. `useReducer`).

<!-- FINE SEZIONE: Skill Game Design TLOU -->
