// === INIZIO SEZIONE: Config e caricamento dati ===
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const STAMINA = 3 // Stamina per turno: adattare al gioco

// Carica un file data JS, neutralizzando gli import delle immagini
function loadExport(relPath, exportName) {
  let src = readFileSync(resolve(process.cwd(), relPath), 'utf8')
  const imgNames = [...src.matchAll(/^import\s+(\w+)\s+from\s+.*$/gm)].map(m => m[1])
  src = src.replace(/^import\s+.*$/gm, '').replace(/export\s+const\s+/g, 'const ')
  const stubs = imgNames.map(n => `const ${n} = null;`).join('\n')
  return new Function(`${stubs}\n${src}\nreturn ${exportName};`)()
}

const cards = loadExport('src/data/cards.js', 'CARD_DATABASE')
const enemies = loadExport('src/data/enemies.js', 'ENEMIES_DATABASE')
// === FINE SEZIONE: Config e caricamento dati ===

// === INIZIO SEZIONE: Analisi carte ===
const median = arr => {
  const s = [...arr].sort((a, b) => a - b)
  return s.length ? s[Math.floor(s.length / 2)] : 0
}

const attackCards = cards
  .filter(c => (c.effects?.damage ?? 0) > 0)
  .map(c => {
    const dmg = (c.effects.damage ?? 0) + (c.effects.burnDamage ?? 0)
    const uses = c.durability ?? Infinity
    const eff = c.cost === 0 ? Infinity : dmg / c.cost
    const bonus = [
      c.effects.bleedChance ? `bleed ${c.effects.bleedChance * 100}%` : null,
      c.effects.dismemberChance ? `dismember ${c.effects.dismemberChance * 100}%` : null,
      c.effects.stun ? 'stun' : null,
    ].filter(Boolean).join(', ')
    return { name: c.name, cost: c.cost, dmg, uses, eff, bonus, ammo: c.ammoType ?? '-' }
  })

const med = median(attackCards.map(c => c.eff).filter(Number.isFinite))

console.log('\n=== CARTE OFFENSIVE ===')
console.table(attackCards.map(c => ({
  carta: c.name, costo: c.cost, dannoAtteso: c.dmg,
  dannoPerStamina: Number.isFinite(c.eff) ? c.eff.toFixed(1) : '∞',
  usi: c.uses === Infinity ? '∞' : c.uses,
  munizioni: c.ammo, bonus: c.bonus,
  flag: !Number.isFinite(c.eff) ? 'COSTO 0' : c.eff > med * 1.5 ? 'OVERPOWERED?' : c.eff < med * 0.5 ? 'DEBOLE?' : '',
})))
console.log(`Mediana danno/Stamina: ${med.toFixed(1)}`)
// === FINE SEZIONE: Analisi carte ===

// === INIZIO SEZIONE: Analisi nemici ===
const finite = attackCards.filter(c => Number.isFinite(c.eff))
const bestPerStamina = finite.sort((a, b) => b.eff - a.eff)[0]
const dmgPerTurn = bestPerStamina ? bestPerStamina.eff * STAMINA : 0

console.log('\n=== NEMICI ===')
console.table(enemies.map(e => {
  const hits = e.moves.filter(m => m.damage)
  const avg = hits.length ? hits.reduce((s, m) => s + m.damage, 0) / hits.length : 0
  const max = hits.length ? Math.max(...hits.map(m => m.damage)) : 0
  return {
    nemico: e.name, hp: e.hp, dannoMedioMossa: avg.toFixed(1), dannoMax: max,
    turniPerUccidere: dmgPerTurn ? Math.ceil(e.hp / dmgPerTurn) : 'n/d',
  }
}))
console.log(`Stima basata su "${bestPerStamina?.name}" con ${STAMINA} Stamina/turno (${dmgPerTurn.toFixed(0)} danni/turno).`)
// === FINE SEZIONE: Analisi nemici ===
