import type { Weapon } from './types'

export const LEGEND: string[] = [
  '🎯 - Aim',
  '🏋️‍♂️ - Cumbersome',
  '☠️ - Cursed',
  '🦴 - Frail',
  '🖤 - Irreplaceable',
  '⚔️ - Melee',
  '🔗 - Paired',
  '🏹 - Ranage',
  '🩸 - Savage',
  '🧠 - Sentient',
  '🐢 - Slow',
  '🔻 - Weaken Monster',
]

export const FIST_N_TOOTH: Weapon = {
  name: 'Fist & Tooth', icon: '⚔',
  speed: 2, acc: 8, str: 0, deadly: 1
}

export const FIST_N_TOOTH_MONSTER_CLAW: Weapon = {
  name: 'Fist & Tooth', icon: '🩸⚔',
  speed: 2, acc: 7, str: 1, deadly: 1
}

export const BONE_BLADE: Weapon = {
  name: 'Bone Blade', icon: '🦴⚔',
  speed: 2, acc: 6, str: 2
}

export const BONE_CLUB: Weapon = {
  name: 'Bone Club', icon: '🏋️‍♂️⚔',
  speed: 2, acc: 6, str: 5,
}

export const BONE_DARTS: Weapon = {
  name: 'Bone Darts', icon: '🦴🏹',
  speed: 1, acc: 7, str: 3
}

export const BEAST_KNUCKLE: Weapon = {
  name: 'Beast Knuckle', icon: '🔻⚔',
  speed: 2, acc: 6, str: 4
}

export const BEAST_KNUCKLE_PAIRED: Weapon = {
  name: 'Beast Knuckle', icon: '🔗⚔',
  speed: 4, acc: 6, str: 4
}

export const KING_SPEAR: Weapon = {
  name: 'King Spear', icon: '🏹',
  speed: 2, acc: 6, str: 3
}

export const FOUNDING_STONE: Weapon = {
  name: 'Founding Stone', icon: '⚔🏹',
  speed: 2, acc: 7, str: 1
}

export const TWILIGHT_SWORD_0: Weapon = {
  name: 'Twilight Sword - 0', icon: '🏋️‍♂️🐢🧠⚔',
  speed: 1, acc: 9, str: 9
}

export const TWILIGHT_SWORD_1: Weapon = {
  name: 'Twilight Sword - 1', icon: '🏋️‍♂️🐢🧠⚔',
  speed: 1, acc: 8, str: 9
}

export const TWILIGHT_SWORD_2: Weapon = {
  name: 'Twilight Sword - 2', icon: '🐢🧠⚔',
  speed: 1, acc: 7, str: 9
}

export const TWILIGHT_SWORD_3: Weapon = {
  name: 'Twilight Sword - 3', icon: '🐢🧠⚔',
  speed: 1, acc: 6, str: 9
}

export const TWILIGHT_SWORD_4: Weapon = {
  name: 'Twilight Sword - 4', icon: '🧠⚔',
  speed: 3, acc: 5, str: 9
}

export const TWILIGHT_SWORD_5: Weapon = {
  name: 'Twilight Sword - 5', icon: '🧠⚔',
  speed: 3, acc: 4, str: 9
}

export const TWILIGHT_SWORD_6: Weapon = {
  name: 'Twilight Sword - 6', icon: '🧠⚔',
  speed: 3, acc: 3, str: 9, deadly: 1
}

export const TWILIGHT_SWORD_7: Weapon = {
  name: 'Twilight Sword - 7', icon: '🧠⚔',
  speed: 3, acc: 2, str: 9, deadly: 1
}

export const BUTCHER_CLEAVER: Weapon = {
  name: 'Butcher Cleaver', icon: '🧠⚔',
  speed: 2, acc: 5, str: 5
}

export const BUTCHER_CLEAVER_PAIRED: Weapon = {
  name: 'Butcher Cleaver', icon: '🔗🧠⚔',
  speed: 4, acc: 5, str: 5
}

export const CAT_GUT_BOW: Weapon = {
  name: 'Cat Gut Bow', icon: '🏋️‍♂️🏹',
  speed: 2, acc: 7, str: 3
}

export const CAT_GUT_BOW_AIM: Weapon = {
  name: 'Cat Gut Bow', icon: '🎯🏋️‍♂️🏹',
  speed: 1, acc: 5, str: 3
}

export const CLAW_HEAD_ARROW: Weapon = {
  name: 'Claw Head Arrow', icon: '🐢🔻🏹',
  speed: 1, acc: 6, str: 6
}
