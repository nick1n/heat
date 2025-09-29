import * as WEAPONS from "@/components/Monster/weapons";

// Monster or Survivor
export const enum MS {
  MONSTER,
  SURVIVOR,
  ALL,
  NONAME,
}

export const ATTRIBUTE_ORDERS: (keyof Attributes)[][] = [
  ['movement', 'acc', 'str', 'eva', 'luck', 'speed'],
  ['movement', 'speed', 'acc', 'str', 'luck', 'eva']
]

export const ZERO_ATTRS: Attributes = {
  movement: 0,
  acc: 0,
  perf: 0,
  str: 0,
  eva: 0,
  luck: 0,
  speed: 0,
  hp: 0,
  toughness: 0,
}

export type Monster = {
  img?: string | undefined;
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
  perf: number;
  str: number;
  eva: number;
  luck: number;
  speed: number;
  hp: number;
  toughness: number;
}

export type WeaponType = {
  name: string;
  icon: string;
  speed: number;
  acc: number;
  str: number;
  deadly?: number;
  perfection?: number;
}

export type WEAPON_IDS = keyof typeof WEAPONS

export type Survivor = {
  type: MS;
  dead: boolean;
  retired: boolean;
  name: string;
  icons: string;
  actions: Actions;
  // survival: number;
  base: Attributes;
  mod: Attributes;
  // attr: Attributes;
  weapons: WEAPON_IDS[];
}

export const enum HunterStatus {
  STANDING = 0,
  KNOCKDOWN = 1,
  KNOCKDOWN_MON = 2,
}

export type Hunter = {
  survivorId: number;
  used: Actions;
  status: HunterStatus;
}

export const ACTIONS = {
  ACT: '🎭',
  DODGE: '💨',
  ENCOURAGE: '🙌',
  DASH: '🏃',
  SURGE: '⚡',
  ENDURE: '💔',
} as const

export type Action = keyof typeof ACTIONS
export type Actions = Action[]
//  = {
//   canUse?: boolean;
//   dodge?: boolean;
//   encourage?: boolean;
//   surge?: boolean;
//   dash?: boolean;
//   endure?: boolean;
//   fistBump?: boolean;
//   overcharge?: boolean;
//   embolden?: boolean;
// }
