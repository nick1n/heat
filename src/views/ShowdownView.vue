<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, type Ref } from 'vue';
import { useStorage, type RemovableRef } from '@vueuse/core';

import Attribute from '@/components/Monster/Attribute.vue';
import Weapon from '@/components/Monster/Weapon.vue';
import { MS, ZERO_ATTRS, type Attributes, type Monster, type MonsterStats, type Survivor } from '@/components/Monster/types';
import * as MONSTERS from '@/components/Monster/monsters';
import * as WEAPONS from '@/components/Monster/weapons';

const hunters: RemovableRef<number[]> = useStorage('kdm.hunters', [0, 1, 2, 3])

const survivors: RemovableRef<Survivor[]> = useStorage('kdm.survivors', [{
  type: MS.SURVIVOR,
  icons: '',
  name: "Lucy",
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    acc: -1,
    str: 1,
    eva: 1,
    luck: 1
  },
  mod: {
    ...ZERO_ATTRS,
    eva: 1
  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.CAT_GUT_BOW },
    { ...WEAPONS.CAT_GUT_BOW_AIM },
    { ...WEAPONS.KING_SPEAR },
    { ...WEAPONS.FOUNDING_STONE },
    { ...WEAPONS.FIST_N_TOOTH }
  ]
}, {
  type: MS.SURVIVOR,
  icons: '',
  name: "Ezra",
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    str: 1,
    eva: 1,
    speed: -1
  },
  mod: {
    ...ZERO_ATTRS,
    str: 2,
    speed: 2
  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.BEAST_KNUCKLE },
    { ...WEAPONS.BONE_DARTS },
    { ...WEAPONS.FIST_N_TOOTH }
  ]
}, {
  type: MS.SURVIVOR,
  icons: '',
  name: "Scarlet",
  base: {
    ...ZERO_ATTRS,
    movement: 3,
    acc: 2,
    str: 1,
  },
  mod: {
    ...ZERO_ATTRS,
    str: 1,
    eva: 1,
    luck: 1
  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.FIST_N_TOOTH, acc: 8 - 1, str: 0 + 1 },
    { ...WEAPONS.BONE_DARTS },
    { ...WEAPONS.FOUNDING_STONE }
  ]
}, {
  type: MS.SURVIVOR,
  icons: '',
  name: "Zachary",
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    eva: 1,
  },
  mod: {
    ...ZERO_ATTRS,
  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.TWILIGHT_SWORD_3 },
    { ...WEAPONS.FIST_N_TOOTH },
  ]
}, {
  type: MS.SURVIVOR,
  name: "Bane",
  icons: '',
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    acc: 1,
    str: 1,
  },
  mod: {
    ...ZERO_ATTRS,
    eva: 1,
    luck: 1,
    str: 1,
  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.BUTCHER_CLEAVER },
    { ...WEAPONS.FIST_N_TOOTH },
  ]
}, {
  type: MS.SURVIVOR,
  name: "Lyn",
  icons: '',
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    str: 1,
    eva: 1,
  },
  mod: {
    ...ZERO_ATTRS,
    str: 1,

  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.KING_SPEAR },
    { ...WEAPONS.CAT_GUT_BOW },
    { ...WEAPONS.CAT_GUT_BOW_AIM },
    { ...WEAPONS.FOUNDING_STONE },
    { ...WEAPONS.FIST_N_TOOTH },
  ]
}, {
  type: MS.SURVIVOR,
  name: "Flint",
  icons: '',
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    str: 1,
    eva: 1,
  },
  mod: {
    ...ZERO_ATTRS,
    str: 3,
    speed: 2,
  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.BEAST_KNUCKLE },
    { ...WEAPONS.BONE_DARTS },
    { ...WEAPONS.FIST_N_TOOTH },
  ]
}, {
  type: MS.SURVIVOR,
  name: "Jade",
  icons: '',
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    str: 1,
    eva: 1,
    acc: 1,
  },
  mod: {
    ...ZERO_ATTRS,
    eva: 1,
    str: 1,
  },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...WEAPONS.BONE_CLUB },
    { ...WEAPONS.BONE_DARTS },
    { ...WEAPONS.FIST_N_TOOTH },
  ]
}
])

const selectedMon = useStorage('kdm.selected-mon', 'WHITE_LION_L0') as RemovableRef<keyof typeof MONSTERS>
const mon: MonsterStats = reactive({
  ...MONSTERS[selectedMon.value],
  mod: { ...ZERO_ATTRS },
  attr: { ...ZERO_ATTRS }
})

const selectMonster = ref(false)
function clickMonster(key: keyof typeof MONSTERS, m: Monster) {
  selectedMon.value = key
  selectMonster.value = false
  mon.img = m.img
  mon.name = m.name
  mon.lvl = m.lvl
  mon.base = m.base
  mon.mod = { ...ZERO_ATTRS }
  updateAttrs()
}

function updateAttrs() {
  mon.attr = {
    hp: mon.base.hp + mon.mod.hp,
    toughness: mon.base.toughness + mon.mod.toughness,
    movement: mon.base.movement + mon.mod.movement,
    acc: mon.base.acc + mon.mod.acc,
    str: mon.base.str + mon.mod.str,
    eva: mon.base.eva + mon.mod.eva,
    luck: mon.base.luck + mon.mod.luck,
    speed: mon.base.speed + mon.mod.speed,
  }

  survivors.value.forEach((s) => s.attr = {
    movement: s.base.movement + s.mod.movement,
    acc: s.base.acc + s.mod.acc,
    str: s.base.str + s.mod.str,
    eva: s.base.eva + s.mod.eva,
    luck: s.base.luck + s.mod.luck,
    speed: s.base.speed + s.mod.speed,
    hp: 0,
    toughness: 0,
  })
}
updateAttrs()

const ATTRIBUTE_ORDERS: (keyof Attributes)[][] = [
  ['movement', 'acc', 'str', 'eva', 'luck', 'speed'],
  ['movement', 'speed', 'acc', 'str', 'luck', 'eva']
]
const attrOrder = useStorage('kdm.attr-order', 0)
function clickOrder() {
  attrOrder.value = ++attrOrder.value % ATTRIBUTE_ORDERS.length
}

const showDialog = ref(false)
const attr: Ref<keyof Attributes> = ref('hp')
const who: Ref<MonsterStats | Survivor> = ref(mon)
const stat: Ref<'base' | 'mod'> = ref('mod')
const counter = ref(0)
function dialog(mod: MonsterStats | Survivor, a: keyof Attributes, key: 'base' | 'mod' = 'mod') {
  showDialog.value = true
  attr.value = a
  who.value = mod
  stat.value = key
  counter.value = 0
  lastLog.value = "..."
}
function click(x: number) {
  who.value[stat.value][attr.value] += x
  counter.value += x
  updateAttrs()
  log(`Updated ${who.value.name} ${who.value.type === MS.MONSTER && attr.value === 'str' ? 'damage' : attr.value} by ${counter.value} to ${who.value.attr[attr.value]}.`)
}
function wheel(e: WheelEvent) {
  click(-Math.abs(e.deltaY) / e.deltaY)
}

const lastLog = ref('...')
function log(str: string) {
  console.log(str)
  lastLog.value = str
}

const toggleBlindSpot = ref(false)
const toggleKnockedDown = ref(false)
const monController = useStorage('kdm.mon-controller', 0)
const showMods = useStorage('kdm.show-mods', true)

onMounted(() => {
  window.addEventListener('keydown', keydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', keydown)
})
function keydown(e: KeyboardEvent) {
  if (e.key === 'k') {
    toggleKnockedDown.value = !toggleKnockedDown.value
  } else if (e.key === 'b') {
    toggleBlindSpot.value = !toggleBlindSpot.value
  } else if (e.key === 'm') {
    showMods.value = !showMods.value
  } else if (e.key === 'o') {
    clickOrder()
  } else if (e.key === 'Escape' || e.key === 'Esc') {
    showDialog.value = false
    selectMonster.value = false
  } else if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
    monController.value = +e.key - 1
  }
}
</script>

<template>
  <div class="select-none bg-stone-950 bg-contain bg-top bg-no-repeat p-4 text-center font-bold text-stone-300"
    :style="`background-image: url(/img/${mon.img})`">
    <div class="min-h-screen">
      <h1 class="text-4xl font-bold leading-loose">
        <button class="rounded-lg px-4 hover:bg-sky-950" @click.prevent="selectMonster = true">
          {{ mon.name }} Lvl {{ mon.lvl }}
        </button>
      </h1>
      <div class="flex flex-wrap justify-center text-4xl font-bold">
        <div class="grid grid-cols-2 justify-center gap-2 p-2">
          <h2 class="hidden">Health</h2>
          <h2 class="hidden">Toughness</h2>
          <div>
            <Attribute :base="mon.base.hp" :mod="mon.mod.hp" :showMods :attr="'hp'" @click="dialog(mon, 'hp')" />
          </div>
          <div>
            <Attribute :base="mon.base.toughness" :mod="mon.mod.toughness" :showMods :attr="'toughness'"
              @click="dialog(mon, 'toughness')" />
          </div>
        </div>
        <div class="basis-full text-2xl sm:text-3xl">
          <Attribute v-for="attr in ATTRIBUTE_ORDERS[attrOrder]" :key="'mon-' + attr" :attr :base="mon.base[attr]"
            :mod="mon.mod[attr]" :showMods @click="dialog(mon, attr)" />
        </div>
        <div class="grid grid-cols-2 justify-center p-2">
          <button class="rounded-l-lg border-2 border-stone-800 px-4 py-2 text-xl font-medium"
            :class="toggleBlindSpot ? 'bg-stone-800 hover:bg-stone-900' : 'hover:bg-stone-800'"
            @click.prevent="toggleBlindSpot = !toggleBlindSpot">
            Blind Spot
          </button>
          <button class="rounded-r-lg border-2 border-l-0 border-stone-800 px-4 py-2 text-xl font-medium"
            :class="toggleKnockedDown ? 'bg-stone-800 hover:bg-stone-900' : 'hover:bg-stone-800'"
            @click.prevent="toggleKnockedDown = !toggleKnockedDown">
            Knocked Down
          </button>
        </div>
      </div>

      <div class="grid text-3xl lg:grid-cols-2">
        <div v-for="surv, i in hunters" :key="survivors[surv].name">
          <h2 class="text-4xl leading-normal">
            <button class="my-2 cursor-pointer rounded-lg px-4 hover:bg-sky-950" @click.prevent="monController = i">
              {{ monController === i ? `👑 ${survivors[surv].name} 👑` : survivors[surv].name }}
            </button>
          </h2>
          <div class="text-2xl sm:text-3xl">
            <Attribute v-for="attr in ATTRIBUTE_ORDERS[attrOrder]" :key="'surv-' + attr" :attr
              :base="survivors[surv].base[attr]" :mod="survivors[surv].mod[attr]" :showMods
              @click="dialog(survivors[surv], attr)" />
          </div>
          <div class="grid grid-cols-[repeat(4,_auto)] justify-center text-xl font-normal leading-normal">
            <Weapon v-for="weapon in survivors[surv].weapons" :key="weapon.name" :weapon :mon
              :survivor="survivors[surv]" :toggleBlindSpot :toggleKnockedDown />
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-screen">
      <h1 class="text-4xl font-bold leading-loose">Survivors</h1>

      <div class="flex justify-center">
        <div class="grid grid-cols-12 text-4xl">
          <template v-for="surv, i in survivors" :key="'list-' + surv.name">
            <h2 class="col-span-6 text-right leading-normal">
              <button class="my-2 cursor-pointer rounded-lg px-4 hover:bg-sky-950" @click.prevent="monController = i">
                {{ surv.name }}
              </button>
            </h2>
            <Attribute v-for="attr in ATTRIBUTE_ORDERS[attrOrder]" :key="'list-surv-' + attr" :attr
              :base="surv.base[attr]" :mod="surv.mod[attr]" :showMods="false" :justBase="true"
              @click="dialog(surv, attr, 'base')" />
          </template>
        </div>
      </div>
    </div>

    <div class="fixed right-1 top-1">
      <button
        class="rounded-lg border-2 border-stone-900 p-2 leading-normal outline-sky-950 hover:bg-stone-900 focus:outline-2 active:bg-black"
        @click.prevent="showMods = !showMods">Mods</button>
      <br>
      <button
        class="mt-1 rounded-lg border-2 border-stone-900 p-2 leading-normal outline-sky-950 hover:bg-stone-900 focus:outline-2 active:bg-black"
        @click.prevent="clickOrder">Order</button>
    </div>

    <div class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-10 overflow-y-auto" @click="showDialog = false"
      :class="showDialog ? '' : 'hidden'">
      <dialog
        class="flex min-h-screen items-center justify-center bg-transparent px-4 pb-20 pt-4 text-center sm:block sm:p-0">

        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-stone-900 opacity-75"></div>
        </div>

        <div
          class="inline-block transform overflow-hidden rounded-lg bg-stone-900 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div class="bg-stone-900 p-4">
            <div class="sm:flex sm:items-center sm:justify-center">
              <div class="text-center text-stone-300">
                <h3 class="text-4xl font-bold leading-normal" id="modal-title">
                  {{ who.name }}
                </h3>
                <h2 class="pb-4 text-lg capitalize">
                  {{ who.type === MS.MONSTER && attr === 'str' ? 'damage' : attr }}: {{ who.attr[attr] }}
                </h2>
                <div>
                  <div class="flex items-center justify-center leading-normal">
                    <button @click.prevent.stop="click(-1)"
                      class="rounded-lg rounded-r-none border-2 border-r-0 border-stone-800 px-4 py-6 text-2xl font-bold hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-opacity-50"
                      aria-label="Decrease count">
                      ➖
                    </button>
                    <div class="min-w-52 rounded-lg border-2 border-stone-800 p-6 text-9xl font-bold" aria-live="polite"
                      @wheel.prevent="wheel">
                      {{ who[stat][attr] }}
                    </div>
                    <button @click.prevent.stop="click(1)"
                      class="rounded-lg rounded-l-none border-2 border-l-0 border-stone-800 px-4 py-6 text-2xl font-bold hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-opacity-50"
                      aria-label="Increase count">
                      ➕
                    </button>
                  </div>
                </div>

                <h3 class="py-4 text-lg font-medium leading-normal">
                  {{ counter === 0 ? 'Nothing changed.' : lastLog }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>

    <div class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-10 overflow-y-auto" @click="selectMonster = false"
      :class="selectMonster ? '' : 'hidden'">
      <dialog
        class="flex min-h-screen items-center justify-center bg-transparent px-4 pb-20 pt-4 text-center sm:block sm:p-0">

        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-stone-900 opacity-75"></div>
        </div>

        <div
          class="inline-block transform overflow-hidden rounded-lg bg-stone-900 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div class="bg-stone-900 p-4">
            <div class="sm:flex sm:items-center sm:justify-center">
              <div class="text-center text-stone-300">
                <h3 class="text-4xl font-bold leading-normal" id="modal-title">
                  Select Monster
                </h3>

                <button v-for="m, key in MONSTERS" :key class="rounded-lg px-6 py-2 text-3xl hover:bg-sky-950"
                  @click.prevent="clickMonster(key, m)">
                  {{ m.name }} Lvl {{ m.lvl }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>

  </div>
</template>
