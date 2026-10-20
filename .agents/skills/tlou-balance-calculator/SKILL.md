---
name: tlou-balance-calculator
description: >-
  Usare quando si vuole analizzare il bilanciamento di carte e nemici del TLOU card
  battler: danno atteso, efficienza per Stamina, turni per uccidere un nemico, carte
  fuori scala. Esegue uno script Node che legge src/data/cards.js e enemies.js.
---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Skill Balance Calculator                          -->
<!-- ================================================================= -->

# TLOU Balance Calculator

## Uso
1. Dalla root del progetto esegui:
   `node .agents/skills/tlou-balance-calculator/scripts/balance.mjs`
2. Leggi le tabelle prodotte:
   - **Carte**: danno atteso (incl. `burnDamage`), costo, DPS per Stamina, flag outlier.
   - **Nemici**: HP, danno medio per mossa, turni stimati per ucciderli con la
     carta migliore per Stamina.
3. Interpreta e proponi modifiche numeriche motivate (mentor mode: spiega il perché,
   non riscrivere interi file).

## Assunzioni del modello (dichiararle all'utente)
- Danno atteso = `damage + burnDamage` (bleed/dismember non quantificati: segnalati come bonus).
- Stamina per turno = parametro `STAMINA` nello script (default 3, adatta al gioco).
- Armi con costo 0 vengono considerate con efficienza infinita -> segnalate a parte.
- Outlier: efficienza > 1.5x o < 0.5x la mediana.

## Verifica
Lo script deve terminare senza errori e stampare entrambe le tabelle. Se `cards.js`
cambia formato (nuovi campi), aggiornare `balance.mjs`.

<!-- FINE SEZIONE: Skill Balance Calculator -->
