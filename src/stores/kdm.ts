import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'

import { ATTRIBUTE_ORDERS, MS, ZERO_ATTRS, type Survivor } from '@/components/Monster/types'
import * as MONSTERS from '@/components/Monster/monsters'

const STARTING_SURVIVORS: Survivor[] = [{
  type: MS.SURVIVOR,
  name: 'Allister',
  icons: '',
  actions: { cantUse: false, dodge: true },
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  name: 'Ezra',
  icons: '',
  actions: { cantUse: false, dodge: true },
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  name: 'Lucy',
  icons: '',
  actions: { cantUse: false, dodge: true },
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}, {
  type: MS.SURVIVOR,
  name: 'Zachary',
  icons: '',
  actions: { cantUse: false, dodge: true },
  base: { ...ZERO_ATTRS, movement: 5 },
  mod: { ...ZERO_ATTRS },
  weapons: ['FOUNDING_STONE', 'FIST_N_TOOTH']
}] as const

export const useKdmStore = defineStore('kdm', () => {
  const hunters: RemovableRef<number[]> = useStorage('kdm.hunters', [0, 1, 2, 3])
  const survivors: RemovableRef<Survivor[]> = useStorage('kdm.survivors', [...STARTING_SURVIVORS])
  const selectedMonster = useStorage('kdm.selected-mon', 'WHITE_LION_L0') as RemovableRef<keyof typeof MONSTERS>

  const attrOrder = useStorage('kdm.attr-order', 0)
  function changeOrder() {
    attrOrder.value = ++attrOrder.value % ATTRIBUTE_ORDERS.length
  }

  const showMods = useStorage('kdm.show-mods', true)
  // const toggleGrayscale


  return { hunters, survivors, selectedMonster, settings: { attrOrder, showMods, changeOrder } }
})
