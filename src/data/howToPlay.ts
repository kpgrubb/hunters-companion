export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'steps'; items: string[] }
  | { kind: 'list'; items: string[] }
  | { kind: 'note'; text: string }

export interface HowToSection {
  id: string
  title: string
  blocks: Block[]
}

/**
 * A concise "how to play" walk-through assembled from the Rules Compendium
 * (turn structure, the attack sequence, morale, defense, the campaign loop).
 * Every rules term in the text is auto-linked to its glossary definition.
 */
export const howToPlay: HowToSection[] = [
  {
    id: 'overview',
    title: 'What is The Hunters?',
    blocks: [
      {
        kind: 'p',
        text: 'The Hunters A.D. 1492 is a cooperative campaign game. Each player controls a hero, and together you play through a series of quests — fighting enemies, exploring, and growing stronger between missions. There are no character levels; heroes improve by spending experience.',
      },
      {
        kind: 'note',
        text: 'Learning your very first game? Use the printed How To Play rulebook. This companion is a fast reference for everything else — tap any underlined term for its rule.',
      },
    ],
  },
  {
    id: 'travel',
    title: 'Traveling the map',
    blocks: [
      {
        kind: 'p',
        text: 'Between quests you explore a realm of 20 map cards (4 rows of 5), revealed as the campaign unfolds. The Hunters marker shows where your party is. Each move to an adjacent map card — orthogonally or diagonally — takes 1 day, so advance the days marker (the main plot runs on a 60-day clock).',
      },
      {
        kind: 'list',
        items: [
          'Road encounters — right after moving to a new map card, roll the Travel Die (2 of its 6 sides show the event icon). On an event, draw and read a road card. Each map card shows a threat level (I, II or III) that decides which road-card pile you draw from — level III challenges even seasoned Hunters.',
          'Traveling by river — from a map card with a Port icon you may sail to any other Port card in a single day and skip road cards entirely. It costs half a ducat per hero — fast and safe, but not free.',
          'Plot cards — small plot cards sit on map cards; flip them when you arrive (some, marked with a red quill, must be read at once). Large plot cards handle conversations with NPCs and dialogue choices.',
          'Task cards — side quests you can read anywhere on the map; each shows a difficulty (easy, medium or hard) and a promised reward you collect on completion.',
        ],
      },
      {
        kind: 'note',
        text: 'Some quests are fought after dark. During a Nighttime Quest, every hero’s Line of Sight is cut to the 2 nearest spaces.',
      },
    ],
  },
  {
    id: 'settlements',
    title: 'Settlements & downtime',
    blocks: [
      {
        kind: 'p',
        text: 'Towns and settlements are special places on the map. Enter one and you move among its location cards instead of map cards — and that travel costs no days: everything inside a settlement happens on the same day (though moving between locations can still trigger a town card event).',
      },
      {
        kind: 'list',
        items: [
          'Trade — every location lists a buy price and a sell price for equipment and resources; deal in as much as is listed and available.',
          'Services — a location may offer work (earn gold each day at the Inn), rest (pay per day to regain 1 morale), or heal (pay to regain Health or remove a poison token).',
          'New quests — settlements are where heroes take on new quests before heading back out onto the map.',
        ],
      },
    ],
  },
  {
    id: 'rounds',
    title: 'The flow of a quest',
    blocks: [
      {
        kind: 'p',
        text: 'A quest is played over a number of rounds shown in its Quest Goal. Move the round marker one space along the round track after each round. Every round has three steps:',
      },
      {
        kind: 'steps',
        items: [
          'Draw action cards — each hero refills their hand.',
          'Determine order — set the turn order of heroes and enemies for this round.',
          'Take turns — each hero and each enemy resolves one turn. When everyone has acted, the round ends.',
        ],
      },
      { kind: 'note', text: 'A hero’s turn is up to 2 actions; an enemy’s turn is 1 action.' },
    ],
  },
  {
    id: 'hero-turn',
    title: 'Your turn: 2 actions',
    blocks: [
      {
        kind: 'p',
        text: 'On your turn you take up to 2 actions. For each one you either play an action card from your hand or perform a basic action. You may also choose to do nothing.',
      },
      {
        kind: 'list',
        items: [
          'Action cards — the top half of a card is its action (sometimes several activities in a fixed order; you may skip any of them). Cards you buy during the campaign expand your deck.',
          'Basic actions — instead of a card you may perform Move 1, Melee Attack 1, Ranged Attack 1, or Interact. To do so, discard one card from your hand without using it.',
          'Free actions — some cards grant a “Free action” that does not count against your 2 actions.',
        ],
      },
      {
        kind: 'note',
        text: 'Reactions: the bottom half of an action card is a reaction — play it to interrupt a turn (yours, an ally’s, or an enemy’s). A card used for its action can’t also be used for its reaction, and only one reaction is allowed per action.',
      },
    ],
  },
  {
    id: 'enemy-turn',
    title: 'Enemy turns',
    blocks: [
      {
        kind: 'p',
        text: 'Each enemy takes 1 action on its turn, resolved from its enemy action card. Its enemy card lists attributes, Health, defense, attacks and special abilities — and identical enemies (e.g. several Wolves) all share one card.',
      },
    ],
  },
  {
    id: 'movement',
    title: 'Moving in a quest',
    blocks: [
      {
        kind: 'list',
        items: [
          'Move x lets a miniature move up to x spaces in any direction, including diagonally. You must stop the moment you enter a space containing an opponent.',
          'Engagement — sharing a space with an opponent means you are engaged. While engaged you may only Parting Leap, Melee Attack, or make a Magic Attack that works at range 0.',
          'Parting Leap — used to disengage and move away. It risks a Penalty Attack: the engaged enemy with the highest Strength makes a free Melee Attack 3 — unless your side outnumbers the enemies on that space.',
          'Terrain — difficult terrain, cover, vantage points and other features change how you move and attack; check each feature’s rule.',
        ],
      },
    ],
  },
  {
    id: 'attacks',
    title: 'Making an attack, step by step',
    blocks: [
      {
        kind: 'p',
        text: 'Melee, ranged and magic attacks all follow the same sequence. A Melee Attack needs you engaged; a Ranged Attack needs Line of Sight, needs the target in range, and needs you not engaged; a Magic Attack uses the range printed on the card.',
      },
      {
        kind: 'steps',
        items: [
          'Choose a card (or a basic attack) that lets you attack, and a weapon.',
          'Choose a target you can legally reach.',
          'Roll to hit — roll the attack dice. Each die rolling at or below the card’s Attack value is a hit. Golden Rule: a 1 always hits, a 6 always misses.',
          'Additional rolls — for every die showing a 1, roll it again, and keep re-rolling any new 1s.',
          'Attack strength — add up your hits, then add the matching attribute: Strength for melee, Agility for ranged, Knowledge for magic.',
          'Subtract defense — subtract the target’s defense of the matching type.',
          'Damage — whatever remains is the damage dealt. An enemy reduced to 0 Health is removed; a hero at 0 falls unconscious.',
        ],
      },
      {
        kind: 'note',
        text: 'Enemies attack the same way: the number of dice comes from the enemy card, and the Attack value comes from its enemy action card.',
      },
    ],
  },
  {
    id: 'defense',
    title: 'Defense, Health & damage',
    blocks: [
      {
        kind: 'list',
        items: [
          'There are three defense types — against melee, ranged and magic attacks. A hero’s base defense is 0, raised by armor, helmet, accessories and reactions. An enemy’s defense is the single value on its card.',
          'Defense tokens add +1 each (up to 2 at once), then are discarded.',
          'Health falls as damage is taken. An enemy is removed at 0 Health; a hero at 0 Health is unconscious (in the Hero Elimination variant, killed instead).',
        ],
      },
    ],
  },
  {
    id: 'morale',
    title: 'Morale',
    blocks: [
      {
        kind: 'p',
        text: 'Morale is your hero’s resolve, tracked on the hero board. Spend 1 morale (slide the cube down one space) to add +1 to a test; to add +1 to your Strength, Agility or Knowledge after rolling an attack; or to add +1 to a Move. You can only spend one morale point at a time.',
      },
      {
        kind: 'note',
        text: 'Low morale hurts: at the first red space all of your attributes drop by 1; at the lowest space they drop during between-quest tests too, and any further loss costs you 1 Health instead.',
      },
    ],
  },
  {
    id: 'campaign',
    title: 'Between quests & the campaign',
    blocks: [
      {
        kind: 'list',
        items: [
          'Experience — heroes spend experience points (there are no levels) to raise attributes, buy new action cards for their deck, and open new equipment slots.',
          'The Wagon — your mobile base; upgrade it to construct equipment and to repair armor (1 resource per damaged piece).',
          'Resources — materials, plants and monster trophies you gather; spend them to craft equipment or sell them in trade.',
          'Saving — record progress on the save sheets to continue the campaign in a later session.',
        ],
      },
    ],
  },
  {
    id: 'difficulty',
    title: 'Difficulty levels',
    blocks: [
      {
        kind: 'list',
        items: [
          'Level 2 — Professional: every enemy gains +1 to all of its defense types.',
          'Level 3 — Master: every enemy also gains +1 Strength, Agility and Knowledge.',
          'Hero Elimination: a hero who would fall unconscious is killed instead. Can be combined with any difficulty.',
        ],
      },
    ],
  },
]
