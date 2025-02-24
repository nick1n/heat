import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'

import { ATTRIBUTE_ORDERS, HunterStatus, MS, ZERO_ATTRS, type Action, type Hunter, type Survivor, type WEAPON_IDS } from '@/components/Monster/types'
import * as MONSTERS from '@/components/Monster/monsters'

const STARTING_SURVIVORS: Survivor[] = [{
  type: MS.NONAME,
  dead: false,
  retired: false,
  name: 'NONAME',
  icons: '',
  actions: [],
  base: { ...ZERO_ATTRS },
  mod: { ...ZERO_ATTRS },
  weapons: []
}, {
  type: MS.ALL,
  dead: false,
  retired: false,
  name: 'All',
  icons: '',
  actions: [],
  base: { ...ZERO_ATTRS },
  mod: { ...ZERO_ATTRS },
  weapons: []
}, {
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Allister',
  icons: '',
  actions: ['ACT', 'DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Ezra',
  icons: '',
  actions: ['ACT', 'DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Lucy',
  icons: '',
  actions: ['ACT', 'DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Zachary',
  icons: '',
  actions: ['ACT', 'DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}] as const

const NAMES = ['Allister', 'Lucy', 'Zachary', 'Ezra', 'Titus', 'Morgan', 'Jackel', 'Brave', 'Wendy', 'Hollow', 'Morg', 'Aya', 'Xell', 'Zelda', 'Willow', 'Elsbeth', 'Glow', 'Lune'] as const

const HUNTER: Hunter = { survivorId: 0, used: [], status: HunterStatus.STANDING } as const

export const START_SURVIVOR_ID = 2 as const
const PREFIX = 'kdm.v1.' as const

export const useKdmStore = defineStore('kdm', () => {

  // Current Hunt/Showdown
  const selectedMonster = useStorage(PREFIX + 'selected-mon', 'WHITE_LION_L0') as RemovableRef<keyof typeof MONSTERS>
  const hunters = useStorage(PREFIX + 'hunters', [
    { ...HUNTER, survivorId: START_SURVIVOR_ID },
    { ...HUNTER, survivorId: START_SURVIVOR_ID + 1 },
    { ...HUNTER, survivorId: START_SURVIVOR_ID + 2 },
    { ...HUNTER, survivorId: START_SURVIVOR_ID + 3 },
  ]) as RemovableRef<Hunter[]>

  function addHunter(id: number, survivorId: number) {
    hunters.value[id] = { ...HUNTER, survivorId }
  }

  const monController = useStorage(PREFIX + 'mon-controller', 0)

  function useSurvivalAction(hunterId: number, action: Action) {
    const i = hunters.value[hunterId].used.indexOf(action)
    if (i !== -1) {
      hunters.value[hunterId].used.splice(i, 1)
    } else {
      hunters.value[hunterId].used.push(action)
    }
  }

  function hasUsedAction(hunterId: number, action: Action) {
    const hunter = hunters.value[hunterId]
    return hunter.used.includes(action) || (hunter.status !== HunterStatus.STANDING && action !== 'DODGE')
  }

  function nextRound() {
    hunters.value.forEach((hunter) => {
      hunter.used = []
      if (hunter.status > HunterStatus.STANDING) {
        hunter.status--
      }
    })
    monController.value = ++monController.value % 4
  }

  function knockedDown(hunterId: number) {
    hunters.value[hunterId].status = (hunters.value[hunterId].status + 2) % 3
  }

  // Survivors:
  const survivors = useStorage(PREFIX + 'survivors', [...STARTING_SURVIVORS])

  function addSurvivor() {
    survivors.value.push({
      type: MS.SURVIVOR,
      dead: false,
      retired: false,
      name: NAMES[survivors.value.length % NAMES.length],
      icons: '',
      actions: ['ACT', 'DODGE'],
      base: { ...ZERO_ATTRS, movement: 5 },
      mod: { ...ZERO_ATTRS },
      weapons: ['FIST_N_TOOTH']
    })
  }

  function removeSurvivor(survivorId: number) {
    if (survivors.value.length <= 1) return

    hunters.value.forEach((h) => {
      if (h.survivorId > survivorId) h.survivorId--
      else if (h.survivorId === survivorId) h.survivorId = 0
    })
    survivors.value.splice(survivorId, 1)
  }

  function addWeapon(survivorId: number, weaponId: WEAPON_IDS | '') {
    if (weaponId) {
      survivors.value[survivorId].weapons.unshift(weaponId)
    }
  }

  function removeWeapon(survivorId: number, index: number) {
    survivors.value[survivorId].weapons.splice(index, 1)
  }

  function iconsInput(survivorId: number, e: Event) {
    survivors.value[survivorId].icons = (e.target as HTMLInputElement).value
  }

  // Settings:
  const attrOrder = useStorage(PREFIX + 'attr-order', 1)
  function changeOrder() {
    attrOrder.value = ++attrOrder.value % ATTRIBUTE_ORDERS.length
  }

  const showMods = useStorage(PREFIX + 'show-mods', true)
  function toggleMods() {
    showMods.value = !showMods.value
  }

  const grayscale = useStorage(PREFIX + 'icon-grayscale', 100)
  function setGrayscale(e: Event) {
    const value = +(e.target as HTMLInputElement).value
    if (0 <= value && value <= 100) {
      grayscale.value = value
    }
  }

  const opacity = useStorage(PREFIX + 'icon-opacity', 0.05)
  function setOpacity(e: Event) {
    const value = +(e.target as HTMLInputElement).value
    if (0 <= value && value <= 1) {
      opacity.value = value
    }
  }

  return {
    selectedMonster,
    hunters,
    addHunter,

    monController,
    useSurvivalAction,
    hasUsedAction,
    nextRound,
    knockedDown,

    survivors,
    iconsInput,
    addSurvivor,
    removeSurvivor,
    addWeapon,
    removeWeapon,

    settings: {
      attrOrder,
      changeOrder,
      showMods,
      toggleMods,
      grayscale,
      setGrayscale,
      opacity,
      setOpacity,
    }
  }
})
