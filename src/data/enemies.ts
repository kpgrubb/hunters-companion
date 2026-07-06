import type { Enemy } from '../types'

/**
 * Enemy roster taken from the Rules Compendium "Enemy Miniatures" component list.
 * The compendium does NOT publish per-enemy stat blocks (Strength / Agility /
 * Knowledge / Defenses live on the physical enemy cards), so `note` holds
 * flavor / grouping only. Add a `stats` field here later if you transcribe cards.
 */
export const enemies: Enemy[] = [
  // — Human foes —
  { id: 'murderer-for-hire', name: 'Murderer for Hire', group: 'human', count: 4, note: 'Hired blades — cheap, numerous cutthroats.' },
  { id: 'bandit', name: 'Bandit', group: 'human', count: 6, note: 'Common melee brigands of the roads.' },
  { id: 'crossbowman', name: 'Crossbowman', group: 'human', count: 4, note: 'Ranged attacker; crossbows use the Reload trait.' },
  { id: 'handgunner', name: 'Handgunner', group: 'human', count: 4, note: 'Early firearms — ranged, Reload trait.' },
  { id: 'leader-mercenary-captain', name: 'Leader / Mercenary Captain', group: 'human', count: 1, note: 'Elite commander that empowers nearby allies.' },
  { id: 'raubritter', name: 'Raubritter', group: 'human', count: 2, note: 'Robber-knight — armored heavy melee threat.' },
  { id: 'seer', name: 'Seer', group: 'human', count: 1, note: 'Caster wielding Magic Attacks.' },

  // — Beasts —
  { id: 'rat', name: 'Rat', group: 'beast', count: 8, note: 'Swarming vermin; weak but plentiful.' },
  { id: 'wolf', name: 'Wolf', group: 'beast', count: 6, note: 'Fast pack hunter.' },
  { id: 'werewolf', name: 'Werewolf', group: 'supernatural', count: 1, note: 'Savage shapeshifter — a signature horror.' },
  { id: 'hound', name: 'Hound', group: 'beast', count: 2, note: 'Trained attack dog.' },

  // — Supernatural —
  { id: 'wraith', name: 'Wraith', group: 'supernatural', count: 2, note: 'Incorporeal undead haunt.' },
  { id: 'flammeum', name: 'Flammeum', group: 'supernatural', count: 2, note: 'Fiery apparition — associated with the Burn trait.' },

  // — Insectoid horrors —
  { id: 'megaloptera', name: 'Megaloptera', group: 'insectoid', count: 1, note: 'Giant winged insect.' },
  { id: 'androctonus', name: 'Androctonus', group: 'insectoid', count: 1, note: 'Monstrous scorpion.' },
  { id: 'adephaga', name: 'Adephaga', group: 'insectoid', count: 1, note: 'Predatory beetle-thing.' },
  { id: 'nasicornis', name: 'Nasicornis', group: 'insectoid', count: 2, note: 'Horned rhinoceros-beetle brute.' },
  { id: 'blattaria', name: 'Blattaria', group: 'insectoid', count: 1, note: 'Giant roach-kin.' },
  { id: 'lucanus', name: 'Lucanus', group: 'insectoid', count: 1, note: 'Great stag-beetle with crushing mandibles.' },
]

export const enemyGroupLabels: Record<Enemy['group'], string> = {
  human: 'Human Foes',
  beast: 'Beasts',
  supernatural: 'Supernatural',
  insectoid: 'Insectoid Horrors',
}
