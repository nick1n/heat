import { MS, ZERO_ATTRS, type Monster } from "./types"

export const WHITE_LION_L0: Monster = {
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
  type: MS.MONSTER,
  name: "White Lion",
  lvl: 2,
  base: {
    ...ZERO_ATTRS,
    hp: 16,
    toughness: 8,
    movement: 6,
    speed: 1,
    str: 1,
  },
}

export const WHITE_LION_L3: Monster = {
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

export const BUTCHER_L1: Monster = {
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
