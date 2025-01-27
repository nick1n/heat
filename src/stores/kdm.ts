import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'

import { ATTRIBUTE_ORDERS, MS, ZERO_ATTRS, type Survivor, type WEAPON_IDS } from '@/components/Monster/types'
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
  const hunters = useStorage('kdm.hunters', [0, 1, 2, 3])
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

  const selectedMonster = useStorage('kdm.selected-mon', 'WHITE_LION_L0') as RemovableRef<keyof typeof MONSTERS>

  const attrOrder = useStorage('kdm.attr-order', 0)
  function changeOrder() {
    attrOrder.value = ++attrOrder.value % ATTRIBUTE_ORDERS.length
  }

  const showMods = useStorage('kdm.show-mods', true)
  function toggleMods() {
    showMods.value = !showMods.value
  }
  // const toggleGrayscale

  return {
    hunters,
    survivors,
    addSurvivor,
    removeSurvivor,
    addWeapon,
    removeWeapon,
    selectedMonster,
    settings: {
      attrOrder,
      changeOrder,
      showMods,
      toggleMods,
    }
  }
})
