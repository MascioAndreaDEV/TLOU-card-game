9---
name: tlou-card-ui
description: >-
Usare per progettare o rifinire l'interfaccia utente (UI/UX) di TLOU Survival Card Battler:
disposizione a ventaglio delle carte (Card Fanning / Arc Layout), micro-interazioni hover,
animazioni di giocata/impatto, barra vita dinamica e atmosfera estetica dell'Arena post-apocalittica.

---

<!-- ================================================================= -->
<!-- INIZIO SEZIONE: Skill TLOU Card UI/UX                             -->
<!-- ================================================================= -->

# TLOU Card UI/UX & Arena Aesthetics Skill

Questa skill fornisce formule, pattern di layout CSS/React e linee guida visive per trasformare la UI del battler in un'esperienza tattica, immersiva e visivamente cinematografica in stile _The Last of Us_.

---

## 1. Il Ventaglio di Carte (Card Fanning / Arc Layout)

Invece di disporre le carte su una riga orizzontale piatta (`flex-wrap gap-4`), i migliori deckbuilder (es. _Hearthstone_, _Balatro_, _Slay the Spire_) distribuiscono le carte su un **arco curvo**.

### Matematica dell'Arco (Rotazione + Traslazione Y)

Dato l'indice `index` e il totale carte in mano `totalCards`:

1. **Calcolo della distanza dal centro:**

   ```javascript
   // === INIZIO SEZIONE: Calcolo Arc Layout Carte ===
   const centerIndex = (totalCards - 1) / 2;
   const offsetFromCenter = index - centerIndex; // Valore negativo a sinistra, 0 al centro, positivo a destra

   // Angolo di rotazione graduale (es. da -12deg a +12deg)
   const maxRotation = Math.min(15, totalCards * 2.5);
   const rotation =
     totalCards > 1 ? (offsetFromCenter / centerIndex) * maxRotation : 0;

   // Incurvamento verticale verso il basso per le carte laterali (effetto arco)
   const arcDrop = Math.abs(offsetFromCenter) * (offsetFromCenter * 3.5);
   // === FINE SEZIONE: Calcolo Arc Layout Carte ===
   ```

2. **Sovrapposizione e z-index:**
   - Le carte devono sovrapporsi leggermente (`margin-left: -20px` o `-30px` per le mani piene).
   - `z-index: index` di base, ma in hover deve saltare a `z-index: 50`.

3. **Stato Hover (Sollevamento & Raddrizzamento):**
   - Quando il mouse va sopra una carta:
     - Raddrizzare la rotazione a `0deg` o quasi.
     - Sollevare la carta con `translateY(-40px)` o `-50px`.
     - Ingrandire leggermente (`scale(1.1)`).
     - Farla scattare in primo piano (`z-index: 50`).

---

## 2. Stati Visivi delle Carte (Affordance & Game Feel)

Una carta non deve solo essere bella, deve comunicare lo stato del gioco a colpo d'occhio:

1. **Stamina Insufficiente (Unplayable State):**
   - Se `playerStamina < card.cost`:
     - Opacità ridotta (`opacity-50`).
     - Filtro desaturato (`grayscale-[40%]`).
     - Badge del costo evidenziato in rosso o pulsante lievemente.
     - Cursore `cursor-not-allowed`.

2. **Stamina Sufficiente (Playable State):**
   - Bordo con lieve bagliore tenue dorato/ambra (`shadow-[0_0_12px_rgba(245,158,11,0.25)]`).
   - Cursore `cursor-pointer`.

3. **Carte con Durabilità (Armi Bianche):**
   - Indicatore a tacche / pallini (es. 2/2, 1/2) in basso a destra per mostrare quanti colpi mancano prima della rottura.
   - Quando l'arma è al suo ultimo colpo, bordo leggermente scheggiato/rosso.

4. **Carte con Requisito Munizioni:**
   - Badge con icona del calibro (`.12`, `.9mm`). Se le munizioni non sono disponibili, barra il badge con una linea rossa diagonale.

---

## 3. Direzione Artistica dell'Arena (Post-Apocalittico Tattico)

L'atmosfera deve trasudare tensione, sporcizia e isolamento, fedele al franchise TLOU:

1. **Palette Cromatica:**
   - **Sfondo / Pareti**: `stone-950`, `zinc-900`, `neutral-900` con trama grunge o vignettatura scura sui bordi (`radial-gradient`).
   - **Accenti Fungini / Sopravvivenza**: Toni verde muschio (`emerald-800`), giallo spore/ambra sporco (`amber-600`), ruggine (`orange-900`).
   - **Danno & Allerta**: Rosso sangue opaco (`rose-700`, `red-800`).

2. **La Barra Vita con "Damage Ghost" (Buffer Bar):**
   - Una barra vita standard che cala di colpo è poco soddisfacente.
   - **Buffer Bar (Pattern Game Dev)**:
     - Barra rossa immediata (gli HP effettivi calano all'istante).
     - Sotto la barra rossa, una barra bianca o arancione ritardata di 300ms che scende lentamente, mostrando chiaramente l'entità del colpo subito.

3. **Shield Badge (Scudo Integrato):**
   - Invece di mostrare lo scudo come testo separato, renderizzarlo come una barra azzurra/grigia sovrapposta alla barra vita o un distintivo a placca metallica accanto al nome.

---

## 4. Telegrafo dell'Intento Nemico (Intent Badge)

Sopra l'infetto o cacciatore, mostrare sempre chiaramente l'intenzione:

- **Attacco**: Icona artigli/coltello + numero danni previsti (es. `⚔️ 8`).
- **Difesa**: Icona scudo + valore (es. `🛡️ 5`).
- **Preparazione Speciale (Spore/Morso)**: Icona teschio/infezione con tooltip di avviso.

---

## 5. Micro-Animazioni di Feedback

1. **Colpo a Segno (Hit Impact):**
   - Quando il nemico subisce danno: classe CSS con animazione keyframe di screen-shake / tremolio rapido (3 frame da 50ms) e flash rosso temporaneo.
2. **Numeri di Danno Fluttuanti (Floating Combat Text):**
   - Un piccolo componente animato che fa salire verso l'alto il numero del danno (`-12`) sfumando in opacità verso lo zero.

<!-- ================================================================= -->
<!-- FINE SEZIONE: Skill TLOU Card UI/UX                               -->
<!-- ================================================================= -->
