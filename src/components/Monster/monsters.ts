import { MS, ZERO_ATTRS, type Monster } from "./types"

export const WHITE_LION_L0: Monster = {
  img: 'stencil-white-lion.png',
  type: MS.MONSTER,
  name: "White Lion",
  lvl: 0,
  base: {
    ...ZERO_ATTRS,
    hp: 9,
    toughness: 6,
    movement: 6
  },
}

export const WHITE_LION_L1: Monster = {
  img: 'stencil-white-lion.png',
  type: MS.MONSTER,
  name: "White Lion",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 11,
    toughness: 8,
    movement: 6
  },
}

export const WHITE_LION_L2: Monster = {
  img: 'stencil-white-lion.png',
  type: MS.MONSTER,
  name: "White Lion",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 16,
    toughness: 10,
    movement: 7,
    speed: 1,
    str: 1,
  },
}

export const WHITE_LION_L3: Monster = {
  img: 'stencil-white-lion.png',
  type: MS.MONSTER,
  name: "White Lion",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 22,
    toughness: 14,
    movement: 8,
    speed: 2,
    str: 2,
    acc: 2,
    luck: 1
  },
}

export const SCREAMING_ANTELOPE_L1: Monster = {
  img: 'stencil-antelope.png',
  type: MS.MONSTER,
  name: "Screaming Antelope",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 11,
    movement: 6,
    toughness: 8,
  },
}

export const SCREAMING_ANTELOPE_L2: Monster = {
  img: 'stencil-antelope.png',
  type: MS.MONSTER,
  name: "Screaming Antelope",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 16,
    movement: 8,
    toughness: 10,
    speed: 1,
    str: 1,
  },
}

export const SCREAMING_ANTELOPE_L3: Monster = {
  img: 'stencil-antelope.png',
  type: MS.MONSTER,
  name: "Screaming Antelope",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 23,
    movement: 8,
    toughness: 12,
    speed: 2,
    str: 2,
    eva: 1,
  },
}

export const PHOENIX_L1: Monster = {
  img: 'stencil-phoenix.png',
  type: MS.MONSTER,
  name: "Phoenix",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 13,
    toughness: 10,
    movement: 8
  },
}

export const PHOENIX_L2: Monster = {
  img: 'stencil-phoenix.png',
  type: MS.MONSTER,
  name: "Phoenix",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 18,
    toughness: 12,
    movement: 8,
    speed: 1,
    str: 1,
  },
}

export const PHOENIX_L3: Monster = {
  img: 'stencil-phoenix.png',
  type: MS.MONSTER,
  name: "Phoenix",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 23,
    toughness: 17,
    movement: 8,
    speed: 2,
    str: 3,
    luck: 2
  },
}

export const DUNG_BEETLE_KNIGHT_L1: Monster = {
  img: 'stencil-dbk.png',
  type: MS.MONSTER,
  name: "Dung Beetle Knight",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 10,
    toughness: 12,
    movement: 7,
  },
}

export const DUNG_BEETLE_KNIGHT_L2: Monster = {
  img: 'stencil-dbk.png',
  type: MS.MONSTER,
  name: "Dung Beetle Knight",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 15,
    toughness: 14,
    movement: 7,
    speed: 1,
    str: 1,
  },
}

export const DUNG_BEETLE_KNIGHT_L3: Monster = {
  img: 'stencil-dbk.png',
  type: MS.MONSTER,
  name: "Dung Beetle Knight",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 20,
    toughness: 18,
    movement: 8,
    speed: 2,
    str: 2,
    acc: 1,
    eva: 1,
  },
}

export const BUTCHER_L1: Monster = {
  img: 'stencil-butcher.png',
  type: MS.MONSTER,
  name: "Butcher",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 13,
    toughness: 9,
    movement: 5
  },
}

export const BUTCHER_L2: Monster = {
  img: 'stencil-butcher.png',
  type: MS.MONSTER,
  name: "Butcher",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 16,
    movement: 5,
    toughness: 12,
    speed: 1,
    str: 1,
  },
}

export const BUTCHER_L3: Monster = {
  img: 'stencil-butcher.png',
  type: MS.MONSTER,
  name: "Butcher",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 22,
    movement: 5,
    toughness: 15,
    speed: 2,
    str: 2,
    acc: 2,
  },
}

export const KINGS_MAN_L1: Monster = {
  img: 'stencil-kings-man.png',
  type: MS.MONSTER,
  name: "King's Man",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 13,
    toughness: 12,
    movement: 5
  },
}

export const KINGS_MAN_L2: Monster = {
  img: 'stencil-kings-man.png',
  type: MS.MONSTER,
  name: "King's Man",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 17,
    movement: 6,
    toughness: 15,
    speed: 1,
    str: 1,
  },
}

export const KINGS_MAN_L3: Monster = {
  img: 'stencil-kings-man.png',
  type: MS.MONSTER,
  name: "King's Man",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 20,
    movement: 6,
    toughness: 18,
    speed: 2,
    str: 2,
    acc: 2,
  },
}

export const HAND_L1: Monster = {
  img: 'stencil-hand.png',
  type: MS.MONSTER,
  name: "The Hand",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 11,
    toughness: 14,
    movement: 5
  },
}

export const HAND_L2: Monster = {
  img: 'stencil-hand.png',
  type: MS.MONSTER,
  name: "The Hand",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 12,
    movement: 6,
    toughness: 15,
    speed: 1,
    str: 1,
  },
}

export const HAND_L3: Monster = {
  img: 'stencil-hand.png',
  type: MS.MONSTER,
  name: "The Hand",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 13,
    movement: 6,
    toughness: 30,
    speed: 3,
    str: 6,
  },
}

export const GOLD_SMOKE_KNIGHT_L1: Monster = {
  type: MS.MONSTER,
  name: "Gold Smoke Knight",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 19,
    toughness: 27,
    movement: 8,
  },
}

export const FLOWER_KNIGHT_L1: Monster = {
  img: 'stencil-fk.png',
  type: MS.MONSTER,
  name: "Flower Knight",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 12,
    toughness: 6,
    movement: 7,
  },
}

export const FLOWER_KNIGHT_L2: Monster = {
  img: 'stencil-fk.png',
  type: MS.MONSTER,
  name: "Flower Knight",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 14,
    toughness: 8,
    movement: 8,
    str: 1,
  },
}

export const FLOWER_KNIGHT_L3: Monster = {
  img: 'stencil-fk.png',
  type: MS.MONSTER,
  name: "Flower Knight",
  lvl: 3,
  base: {
    ...ZERO_ATTRS,
    hp: 17,
    toughness: 11,
    movement: 9,
    speed: 1,
    str: 2,
  },
}
