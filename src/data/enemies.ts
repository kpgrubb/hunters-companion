import type { Enemy } from '../types'

/**
 * Enemy data transcribed from photographs of the 27 physical enemy cards.
 *
 * Card anatomy (deciphered against the Rules Compendium):
 *  - Stat row: Health (heart) then four attributes, left→right (confirmed against
 *    close-up photos): eye = PERCEPTION, sword = STRENGTH, arrow = AGILITY,
 *    scepter = KNOWLEDGE.
 *  - `ref` = the Enemy Action Card range printed under the name (e.g. "A18-20").
 *  - Attacks (bottom colour bar): red = melee, blue = ranged, purple = magic.
 *      `attackValue` = the "Attack x" to-hit target (each die ≤ x is a hit; lower
 *      is better); `dice` = number of attack dice rolled. Successes + the relevant
 *      attribute (Strength for melee/ranged, Knowledge for magic) = attack strength.
 *  - `count` = miniatures of that sculpt in the box. Several enemies have a base
 *      card and a tougher "Veteran/Giant/Mutated" card for higher difficulty; both
 *      use the same miniatures.
 *
 * Ability texts are transcribed faithfully; a few reference small in-text icons
 * that were hard to read — those are flagged in the text.
 */
export const enemies: Enemy[] = [
  // ————————————————————————— HUMAN FOES —————————————————————————
  {
    id: 'bandit',
    name: 'Bandit',
    group: 'human',
    count: 6,
    ref: 'A7-9',
    note: 'Common melee brigand of the roads.',
    stats: { health: 5, perception: 0, strength: 2, agility: 1, knowledge: 0 },
    attacks: [{ type: 'melee', attackValue: 1, dice: 2 }],
    abilities: [],
  },
  {
    id: 'veteran-bandit',
    name: 'Veteran Bandit',
    group: 'human',
    count: 6,
    ref: 'A7-9',
    note: 'Hardened bandit (difficulty variant — same sculpt as the Bandit).',
    stats: { health: 8, perception: 0, strength: 2, agility: 2, knowledge: 1 },
    attacks: [{ type: 'melee', attackValue: 1, dice: 3 }],
    abilities: [
      { name: 'Wooden Shield', text: 'Convert 1 Strength or 1 Agility into 1 defense die.' },
    ],
  },
  {
    id: 'murderer-for-hire',
    name: 'Murderer for Hire',
    group: 'human',
    count: 4,
    ref: 'A18-20',
    note: 'Hired blade — a swift, evasive cutthroat.',
    stats: { health: 10, perception: 3, strength: 2, agility: 2, knowledge: 2 },
    attacks: [{ type: 'melee', attackValue: 2, dice: 5 }],
    abilities: [
      {
        name: 'Dodge',
        text: 'When the Murderer for Hire is the target of an attack, X of the attacker’s attack dice become defense dice (X = the opponent’s total Agility).',
      },
    ],
  },
  {
    id: 'crossbowman',
    name: 'Crossbowman',
    group: 'human',
    count: 4,
    ref: 'A21-23',
    note: 'Ranged skirmisher; crossbows use the Reload trait.',
    stats: { health: 5, perception: 2, strength: 1, agility: 1, knowledge: 0 },
    attacks: [
      { type: 'melee', attackValue: 0, dice: 2 },
      { type: 'ranged', attackValue: 1, dice: 2, note: 'Cannot be fired while engaged.' },
    ],
    abilities: [
      {
        name: 'Cornered',
        text: 'If, after performing a Parting Leap, it would still be engaged, it performs Melee Attack 1 instead.',
      },
    ],
  },
  {
    id: 'veteran-crossbowman',
    name: 'Veteran Crossbowman',
    group: 'human',
    count: 4,
    ref: 'A21-23',
    note: 'Elite marksman (difficulty variant — same sculpt as the Crossbowman).',
    stats: { health: 8, perception: 3, strength: 1, agility: 1, knowledge: 0 },
    attacks: [
      { type: 'melee', attackValue: 0, dice: 2 },
      { type: 'ranged', attackValue: 2, dice: 3, note: 'Cannot be fired while engaged.' },
    ],
    abilities: [
      {
        name: 'Cornered',
        text: 'If, after performing a Parting Leap, it would still be engaged, it performs Melee Attack 1 instead.',
      },
    ],
  },
  {
    id: 'handgunner',
    name: 'Handgunner',
    group: 'human',
    count: 4,
    ref: 'A24-26',
    note: 'Early firearms — ranged, Reload trait.',
    stats: { health: 9, perception: 0, strength: 1, agility: 1, knowledge: 1 },
    attacks: [
      { type: 'melee', attackValue: 1, dice: 2 },
      { type: 'ranged', attackValue: 2, dice: 4, note: 'Cannot be fired while engaged.' },
    ],
    abilities: [
      {
        name: 'Cornered',
        text: 'If, after performing a Parting Leap, it would still be engaged, it performs Melee Attack 1 instead.',
      },
    ],
  },
  {
    id: 'veteran-handgunner',
    name: 'Veteran Handgunner',
    group: 'human',
    count: 4,
    ref: 'A24-26',
    note: 'Seasoned gunner (difficulty variant — same sculpt as the Handgunner).',
    stats: { health: 11, perception: 1, strength: 1, agility: 1, knowledge: 1 },
    attacks: [
      { type: 'melee', attackValue: 1, dice: 2 },
      { type: 'ranged', attackValue: 3, dice: 4, note: 'Cannot be fired while engaged.' },
    ],
    abilities: [
      {
        name: 'Cornered',
        text: 'If, after performing a Parting Leap, it would still be engaged, it performs Melee Attack 1 instead.',
      },
    ],
  },
  {
    id: 'raubritter',
    name: 'Raubritter',
    group: 'human',
    count: 2,
    ref: 'A10-12',
    note: 'Robber-knight — armored heavy melee threat.',
    stats: { health: 8, perception: 1, strength: 5, agility: 5, knowledge: 3 },
    attacks: [{ type: 'melee', attackValue: 2, dice: 3 }],
    abilities: [{ name: 'Training', text: 'Ignores defense tokens when attacking.' }],
  },
  {
    id: 'veteran-raubritter',
    name: 'Veteran Raubritter',
    group: 'human',
    count: 2,
    ref: 'A10-12',
    note: 'Veteran robber-knight (difficulty variant — same sculpt as the Raubritter).',
    stats: { health: 10, perception: 1, strength: 6, agility: 6, knowledge: 4 },
    attacks: [{ type: 'melee', attackValue: 3, dice: 3 }],
    abilities: [
      { name: 'Training', text: 'Ignores defense tokens when attacking.' },
      { name: 'Steel Shield', text: 'Convert 2 Strength or 2 Agility into 2 defense dice.' },
    ],
  },
  {
    id: 'chief',
    name: 'Chief',
    group: 'human',
    count: 1,
    ref: 'A13-17',
    note: 'Warband leader (uses the Leader / Mercenary Captain miniature).',
    stats: { health: 12, perception: 2, strength: 4, agility: 3, knowledge: 2 },
    attacks: [{ type: 'melee', attackValue: 4, dice: 3 }],
    abilities: [
      {
        name: 'Iron Fist',
        text: 'All allies within range 0–1 gain +1 Strength / +1 Agility / +1 Knowledge.',
      },
      { name: 'Parry', text: 'The opponent cannot perform any Reaction.', activated: true },
    ],
  },
  {
    id: 'mercenary-captain',
    name: 'Mercenary Captain',
    group: 'human',
    count: 1,
    ref: 'A13-17',
    note: 'Elite commander (Leader / Mercenary Captain miniature).',
    stats: { health: 10, perception: 3, strength: 3, agility: 3, knowledge: 2 },
    attacks: [{ type: 'melee', attackValue: 3, dice: 3 }],
    abilities: [
      {
        name: 'Disarm',
        text: 'The target of the attack must choose and discard 1 card from their hand.',
      },
      { name: 'Parry', text: 'The opponent cannot perform any Reaction.', activated: true },
    ],
  },
  {
    id: 'seer',
    name: 'Seer',
    group: 'human',
    count: 1,
    ref: 'A27-31',
    note: 'Caster wielding Magic Attacks and battlefield healing.',
    stats: { health: 15, perception: 2, strength: 2, agility: 2, knowledge: 4 },
    attacks: [
      { type: 'melee', attackValue: 1, dice: 2 },
      { type: 'magic', attackValue: 2, dice: 2 },
    ],
    abilities: [
      {
        name: 'Healing Mist',
        text: 'At the end of every Seer’s Action, each ally within range 0–2 regains 1 Health.',
      },
      {
        name: 'Anointed by the Mist',
        text: 'All Seer’s Actions other than Move and Parting Leap are treated as spells.',
      },
    ],
  },

  // ————————————————————————— BEASTS —————————————————————————
  {
    id: 'rat',
    name: 'Mutated Rat',
    group: 'beast',
    count: 8,
    ref: 'A1-3',
    note: 'Swarming vermin — weak alone, dangerous in numbers.',
    stats: { health: 2, perception: 0, strength: 0, agility: 0, knowledge: 0 },
    attacks: [{ type: 'melee', attackValue: 1, dice: 1 }],
    abilities: [
      {
        name: 'Pack',
        text: 'Gains +1 attack die (to a maximum of 3) on a Melee Attack for every other rat within range 0–1.',
      },
      { name: 'Nimble', text: 'Ignores difficult terrain.' },
    ],
  },
  {
    id: 'giant-rat',
    name: 'Giant Rat',
    group: 'beast',
    count: 8,
    ref: 'A1-3',
    note: 'A larger rat (difficulty variant — same sculpts as the rats).',
    stats: { health: 4, perception: 1, strength: 1, agility: 2, knowledge: 1 },
    attacks: [{ type: 'melee', attackValue: 2, dice: 1 }],
    abilities: [
      {
        name: 'Pack',
        text: 'Gains +1 attack die (to a maximum of 3) on a Melee Attack for every other rat within range 0–1.',
      },
      { name: 'Nimble', text: 'Ignores difficult terrain.' },
    ],
  },
  {
    id: 'wolf',
    name: 'Wolf',
    group: 'beast',
    count: 6,
    ref: 'A4-6',
    note: 'Fast pack hunter.',
    stats: { health: 3, perception: 2, strength: 0, agility: 0, knowledge: 0 },
    attacks: [{ type: 'melee', attackValue: 1, dice: 2 }],
    abilities: [],
  },
  {
    id: 'giant-wolf',
    name: 'Giant Wolf',
    group: 'beast',
    count: 6,
    ref: 'A4-6',
    note: 'A monstrous wolf (difficulty variant — same sculpts as the wolves).',
    stats: { health: 6, perception: 3, strength: 0, agility: 0, knowledge: 0 },
    attacks: [{ type: 'melee', attackValue: 2, dice: 3 }],
    abilities: [],
  },
  {
    id: 'hound',
    name: 'Hound',
    group: 'beast',
    count: 2,
    ref: 'A47-50',
    note: 'Unnatural attack dog that feeds on the wounded.',
    stats: { health: 12, perception: 2, strength: 3, agility: 3, knowledge: 4 },
    attacks: [{ type: 'melee', attackValue: 3, dice: 2 }],
    abilities: [
      {
        name: 'Drain Life',
        text: 'At the end of its Action, deals 1 damage to a randomly chosen hero within range 0–3 and recovers 1 Health.',
      },
    ],
  },

  // ————————————————————————— SUPERNATURAL —————————————————————————
  {
    id: 'werewolf',
    name: 'Werewolf',
    group: 'supernatural',
    count: 1,
    ref: 'A38-41',
    note: 'Savage shapeshifter — a signature horror of the campaign.',
    stats: { health: 15, perception: 4, strength: 3, agility: 3, knowledge: 4 },
    attacks: [{ type: 'melee', attackValue: 4, dice: 3 }],
    abilities: [
      {
        name: 'Unnaturally Fast',
        text: 'The Agility of every hero attacking the Werewolf is halved (rounding down).',
      },
      {
        name: 'Terrifying',
        text: 'The Strength of every hero attacking the Werewolf is halved (rounding down).',
      },
    ],
  },
  {
    id: 'wraith',
    name: 'Wraith',
    group: 'supernatural',
    count: 2,
    ref: 'A32-34',
    note: 'Incorporeal undead that strikes with magic and dread.',
    stats: { health: 18, perception: 4, strength: 7, agility: 7, knowledge: 6 },
    attacks: [{ type: 'magic', attackValue: 3, dice: 3 }],
    abilities: [
      { name: 'Demonic Protection', text: 'Ignores the status effects listed on its card.' },
      {
        name: 'Aura of Fear',
        text: 'The Wraith’s melee, ranged and magic defense are each lowered by the attacking hero’s Perception value.',
      },
      { name: 'Immaterial', text: 'Ignores difficult terrain.' },
    ],
  },
  {
    id: 'flammeum',
    name: 'Flammeum',
    group: 'supernatural',
    count: 2,
    ref: 'A35-37',
    note: 'Fiery apparition tied to the Burn trait.',
    stats: { health: 10, perception: 2, strength: 5, agility: 5, knowledge: 3 },
    attacks: [
      { type: 'melee', attackValue: 1, dice: 2 },
      { type: 'magic', attackValue: 2, dice: 2 },
    ],
    abilities: [
      { name: 'Fire Immunity', text: 'Ignores Burn.' },
      {
        name: 'Inner Flame',
        text: 'Immediately after an attack that kills the Flammeum, all heroes within range 0–1 suffer a Magic Attack 3 with Burn.',
      },
      {
        name: 'Teleportation',
        text: 'Ignores obstacles, walls and difficult terrain while moving.',
      },
    ],
  },
  {
    id: 'beast',
    name: 'The Beast',
    group: 'supernatural',
    count: 1,
    ref: 'A73-82',
    note: 'A campaign boss — regenerates from the heroes’ own wounds and summons vermin.',
    stats: { health: 30, perception: 3, strength: 8, agility: 6, knowledge: 6 },
    attacks: [{ type: 'melee', attackValue: 5, dice: 5 }],
    abilities: [
      {
        name: 'Dark Regeneration',
        text: 'The Beast recovers 1 Health for each 1 damage suffered by any hero.',
      },
      {
        name: 'Mind Bind',
        text: 'A randomly chosen hero within range 1–4 suffers 2 damage.',
        activated: true,
      },
      {
        name: 'Call of the Beast',
        text: '2 Giant Rats appear on the Beast’s space and become active the following round.',
        activated: true,
      },
    ],
  },

  // ————————————————————————— INSECTOID HORRORS —————————————————————————
  {
    id: 'megaloptera',
    name: 'Megaloptera',
    group: 'insectoid',
    count: 1,
    ref: 'A42-46',
    note: 'Giant amphibious winged insect.',
    stats: { health: 15, perception: 1, strength: 2, agility: 1, knowledge: 1 },
    attacks: [
      { type: 'melee', attackValue: 2, dice: 1 },
      { type: 'ranged', attackValue: 2, dice: 2 },
    ],
    abilities: [
      { name: 'Slime-covered', text: 'Ignores certain sound and mechanism effects (see card icons).' },
      {
        name: 'Entanglement',
        text: 'Any hero performing a Parting Leap always suffers a Penalty Attack, regardless of cards used or number of heroes.',
      },
      { name: 'Aquatic Creature', text: 'Ignores Water and Swamp difficult terrain.' },
    ],
  },
  {
    id: 'androctonus',
    name: 'Androctonus',
    group: 'insectoid',
    count: 1,
    ref: 'A65-68',
    note: 'Monstrous scorpion with a regenerating carapace.',
    stats: { health: 15, perception: 3, strength: 7, agility: 6, knowledge: 5 },
    attacks: [
      { type: 'melee', attackValue: 2, dice: 3 },
      { type: 'ranged', attackValue: 3, dice: 2 },
    ],
    abilities: [
      { name: 'Enhanced Metabolism', text: 'Ignores Poison.' },
      {
        name: 'Regenerating Carapace',
        text: 'At the end of its round, the Androctonus discards 1 damage.',
      },
      {
        name: 'Cornered',
        text: 'If, after a Parting Leap, it would still be engaged, it performs Melee Attack 3 instead.',
      },
    ],
  },
  {
    id: 'adephaga',
    name: 'Adephaga',
    group: 'insectoid',
    count: 1,
    ref: 'A69-72',
    note: 'Predatory beetle-thing that grows stronger in a swarm.',
    stats: { health: 13, perception: 4, strength: 3, agility: 2, knowledge: 2 },
    attacks: [{ type: 'melee', attackValue: 1, dice: 5 }],
    abilities: [
      {
        name: 'Resilience of the Swarm',
        text: 'Gains +1 Strength / +1 Agility / +1 Knowledge for every ally within range 0–2.',
      },
      { name: 'Reflex', text: 'Heroes cannot perform any Reactions against the Adephaga’s attacks.' },
    ],
  },
  {
    id: 'nasicornis',
    name: 'Nasicornis',
    group: 'insectoid',
    count: 2,
    ref: 'A51-55',
    note: 'Horned rhinoceros-beetle brute with rapid regeneration.',
    stats: { health: 20, perception: 1, strength: 5, agility: 3, knowledge: 5 },
    attacks: [{ type: 'melee', attackValue: 4, dice: 2 }],
    abilities: [
      {
        name: 'Enhanced Regeneration',
        text: 'At the end of its turn, the Nasicornis recovers 2 Health.',
      },
    ],
  },
  {
    id: 'blattaria',
    name: 'Blattaria',
    group: 'insectoid',
    count: 1,
    ref: 'A56-59',
    note: 'Giant roach-kin that wards its space against magic.',
    stats: { health: 18, perception: 3, strength: 4, agility: 4, knowledge: 6 },
    attacks: [{ type: 'melee', attackValue: 3, dice: 3 }],
    abilities: [
      {
        name: 'Magic Resistant',
        text: 'Its space cannot be the target of a spell. If it moves onto a space under a spell’s effect, that spell is cancelled immediately.',
      },
      {
        name: 'Aura of Might',
        text: 'All allies within range 0–1 gain +1 Strength / +1 Agility / +1 Knowledge.',
      },
    ],
  },
  {
    id: 'lucanus',
    name: 'Lucanus',
    group: 'insectoid',
    count: 1,
    ref: 'A60-64',
    note: 'Great stag-beetle with crushing mandibles and a punishing gaze.',
    stats: { health: 17, perception: 1, strength: 3, agility: 3, knowledge: 3 },
    attacks: [{ type: 'melee', attackValue: 3, dice: 2 }],
    abilities: [
      { name: 'Demonic Protection', text: 'Ignores the effects listed on its card.' },
      { name: 'Ethereal Blade', text: 'Ranged and Magic Attacks cannot be used against the Lucanus.' },
      {
        name: 'Demonic Gaze',
        text: 'Each hero who attacks the Lucanus suffers 1 damage at the end of their attack activity.',
      },
    ],
  },
]

export const enemyGroupLabels: Record<Enemy['group'], string> = {
  human: 'Human Foes',
  beast: 'Beasts',
  supernatural: 'Supernatural',
  insectoid: 'Insectoid Horrors',
}
