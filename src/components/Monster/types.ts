import * as WEAPONS from "@/components/Monster/weapons";

export const enum MS {
  MONSTER,
  SURVIVOR
}

export const ATTRIBUTE_ORDERS: (keyof Attributes)[][] = [
  ['movement', 'acc', 'str', 'eva', 'luck', 'speed'],
  ['movement', 'speed', 'acc', 'str', 'luck', 'eva']
]

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

export type Monster = {
  img: string;
  type: MS;
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
  icon: string;
  speed: number;
  acc: number;
  str: number;
  deadly?: number;
}

export type Survivor = {
  type: MS;
  name: string;
  icons: string;
  actions: Actions;
  // survival: number;
  base: Attributes;
  mod: Attributes;
  // attr: Attributes;
  weapons: (keyof typeof WEAPONS)[];
}

export type Actions = {
  cantUse?: boolean;
  dodge?: boolean; // 💨
  encourage?: boolean; // 🙌
  surge?: boolean; // ⚡
  dash?: boolean; // 🏃
  endure?: boolean; // 💔/🛡️
  fistBump?: boolean; // 🤛
  overcharge?: boolean;
  embolden?: boolean;
}
