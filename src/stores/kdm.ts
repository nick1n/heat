import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'

import { ATTRIBUTE_ORDERS, HunterStatus, MS, ZERO_ATTRS, type Action, type Hunter, type Survivor, type WEAPON_IDS } from '@/components/Monster/types'
import * as MONSTERS from '@/components/Monster/monsters'

const STARTING_SURVIVORS: Survivor[] = [{
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Allister',
  icons: '',
  actions: ['DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Ezra',
  icons: '',
  actions: ['DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Lucy',
  icons: '',
  actions: ['DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  dead: false,
  retired: false,
  name: 'Zachary',
  icons: '',
  actions: ['DODGE'],
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}] as const

export const useKdmStore = defineStore('kdm', () => {

  // Current Hunt/Showdown
  const selectedMonster = useStorage('kdm.selected-mon', 'WHITE_LION_L0') as RemovableRef<keyof typeof MONSTERS>
  const hunters = useStorage('kdm.hunters', [
    { survivorId: 0, used: [], status: HunterStatus.STANDING },
    { survivorId: 1, used: [], status: HunterStatus.STANDING },
    { survivorId: 2, used: [], status: HunterStatus.STANDING },
    { survivorId: 3, used: [], status: HunterStatus.STANDING },
  ]) as RemovableRef<Hunter[]>
  const monController = useStorage('kdm.mon-controller', 0)

  function useSurvivalAction(hunterId: number, action: Action) {
    hunters.value[hunterId].used.push(action)
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
    hunters.value[hunterId].status = (hunters.value[hunterId].status + 1) % 3
  }

  // Survivors:
  const survivors = useStorage('kdm.survivors', [...STARTING_SURVIVORS])

  function addSurvivor() {
    survivors.value.push({ ...STARTING_SURVIVORS[survivors.value.length % STARTING_SURVIVORS.length] })
  }

  function removeSurvivor(survivorId: number) {
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
  const attrOrder = useStorage('kdm.attr-order', 0)
  function changeOrder() {
    attrOrder.value = ++attrOrder.value % ATTRIBUTE_ORDERS.length
  }

  const showMods = useStorage('kdm.show-mods', true)
  function toggleMods() {
    showMods.value = !showMods.value
  }

  const grayscale = useStorage('kdm.icon-grayscale', 100)
  function setGrayscale(e: Event) {
    const value = +(e.target as HTMLInputElement).value
    if (0 <= value && value <= 100) {
      grayscale.value = value
    }
  }

  const opacity = useStorage('kdm.icon-opacity', 0.05)
  function setOpacity(e: Event) {
    const value = +(e.target as HTMLInputElement).value
    if (0 <= value && value <= 1) {
      opacity.value = value
    }
  }

  return {
    selectedMonster,
    hunters,
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
