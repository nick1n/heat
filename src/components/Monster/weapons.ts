import type { WeaponType } from './types'

const LEGEND: string[] = [
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

export const FIST_N_TOOTH: WeaponType = {
  name: 'Fist & Tooth', icon: '⚔',
  speed: 2, acc: 8, str: 0, deadly: 1
}

export const FIST_N_TOOTH_MONSTER_CLAW: WeaponType = {
  name: 'Fist & Tooth', icon: '🩸⚔',
  speed: 2, acc: 7, str: 1, deadly: 1
}

export const BONE_AXE: WeaponType = {
  name: 'Bone Axe', icon: '🦴🩸⚔',
  speed: 2, acc: 6, str: 3
}

export const BONE_BLADE: WeaponType = {
  name: 'Bone Blade', icon: '🦴⚔',
  speed: 2, acc: 6, str: 2
}

export const BONE_CLUB: WeaponType = {
  name: 'Bone Club', icon: '🏋️‍♂️⚔',
  speed: 2, acc: 6, str: 5,
}

export const BONE_DAGGER: WeaponType = {
  name: 'Bone Dagger', icon: '✨⚔',
  speed: 3, acc: 7, str: 1
}
export const BONE_DARTS: WeaponType = {
  name: 'Bone Darts', icon: '🦴🏹',
  speed: 1, acc: 7, str: 3
}

export const BEAST_KNUCKLE: WeaponType = {
  name: 'Beast Knuckle', icon: '🔻⚔',
  speed: 2, acc: 6, str: 4
}

export const BEAST_KNUCKLE_PAIRED: WeaponType = {
  name: 'Beast Knuckle', icon: '🔗⚔',
  speed: 4, acc: 6, str: 4
}

export const KING_SPEAR: WeaponType = {
  name: 'King Spear', icon: '🏹',
  speed: 2, acc: 6, str: 3
}

export const FOUNDING_STONE: WeaponType = {
  name: 'Founding Stone', icon: '⚔🏹',
  speed: 2, acc: 7, str: 1
}

export const LION_BEAST_KATAR: WeaponType = {
  name: 'Lion Beast Katar', icon: '⚔',
  speed: 2, acc: 7, str: 3, deadly: 1
}

export const LION_BEAST_KATAR_PAIRED: WeaponType = {
  name: 'Lion Beast Katar', icon: '🔗⚔',
  speed: 4, acc: 7, str: 3, deadly: 1
}

export const TWILIGHT_SWORD_0: WeaponType = {
  name: 'Twilight Sword - 0', icon: '🏋️‍♂️🐢🧠⚔',
  speed: 1, acc: 9, str: 9
}

export const TWILIGHT_SWORD_1: WeaponType = {
  name: 'Twilight Sword - 1', icon: '🏋️‍♂️🐢🧠⚔',
  speed: 1, acc: 8, str: 9
}

export const TWILIGHT_SWORD_2: WeaponType = {
  name: 'Twilight Sword - 2', icon: '🐢🧠⚔',
  speed: 1, acc: 7, str: 9
}

export const TWILIGHT_SWORD_3: WeaponType = {
  name: 'Twilight Sword - 3', icon: '🐢🧠⚔',
  speed: 1, acc: 6, str: 9
}

export const TWILIGHT_SWORD_4: WeaponType = {
  name: 'Twilight Sword - 4', icon: '🧠⚔',
  speed: 3, acc: 5, str: 9
}

export const TWILIGHT_SWORD_5: WeaponType = {
  name: 'Twilight Sword - 5', icon: '🧠⚔',
  speed: 3, acc: 4, str: 9
}

export const TWILIGHT_SWORD_6: WeaponType = {
  name: 'Twilight Sword - 6', icon: '🧠⚔',
  speed: 3, acc: 3, str: 9, deadly: 1
}

export const TWILIGHT_SWORD_7: WeaponType = {
  name: 'Twilight Sword - 7', icon: '🧠⚔',
  speed: 3, acc: 2, str: 9, deadly: 1
}

export const BUTCHER_CLEAVER: WeaponType = {
  name: 'Butcher Cleaver', icon: '🧠⚔',
  speed: 2, acc: 5, str: 5
}

export const BUTCHER_CLEAVER_PAIRED: WeaponType = {
  name: 'Butcher Cleaver', icon: '🔗🧠⚔',
  speed: 4, acc: 5, str: 5
}

export const CAT_GUT_BOW: WeaponType = {
  name: 'Cat Gut Bow', icon: '🏋️‍♂️🏹',
  speed: 2, acc: 7, str: 3
}

export const CAT_GUT_BOW_AIM: WeaponType = {
  name: 'Cat Gut Bow', icon: '🎯🏋️‍♂️🏹',
  speed: 1, acc: 5, str: 3
}

export const CLAW_HEAD_ARROW: WeaponType = {
  name: 'Claw Head Arrow', icon: '🐢🔻🏹',
  speed: 1, acc: 6, str: 6
}
