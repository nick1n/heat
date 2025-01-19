export type Monster = {
  name: string;
  lvl: number;
  base: Attributes;
}

export type MonsterStats = Monster & {
  mod: Attributes;
  attr: Attributes;
}

export type Attributes = {
  movement: number;
  acc: number;
  str: number;
  eva: number;
  luck: number;
  speed: number;
  hp: number;
  toughness: number;
}

export type Weapon = {
  name: string;
  speed: number;
  acc: number;
  str: number;
  deadly?: number;
}

export type Survivor = {
  name: string;
  // survival: number;
  base: Attributes;
  mod: Attributes;
  attr: Attributes;
  weapons: Weapon[];
}

export const ZERO_ATTRS: Attributes = {
  movement: 0,
  acc: 0,
  str: 0,
  eva: 0,
  luck: 0,
  speed: 0,
  hp: 0,
  toughness: 0,
}

export const BUTCHER_L1: Monster = {
  name: "Butcher",
  lvl: 1,
  base: {
    ...ZERO_ATTRS,
    hp: 13,
    toughness: 9,
    movement: 5
  },
}
