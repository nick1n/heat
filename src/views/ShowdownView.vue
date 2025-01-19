<script setup lang="ts">
import Attribute from '@/components/Monster/Attribute.vue';
import HitProbability from '@/components/Monster/HitProbability.vue';
import { BUTCHER_L1, ZERO_ATTRS, type Attributes, type Monster, type MonsterStats, type Survivor } from '@/components/Monster/types';
import Weapon from '@/components/Monster/Weapon.vue';
import { BEAST_KNUCKLE, BONE_CLUB, BONE_DARTS, FIST_N_TOOTH, FOUNDING_STONE, KING_SPEAR } from '@/components/Monster/weapons';
import { reactive, ref, type Ref } from 'vue';

const mon: MonsterStats = reactive({
  ...BUTCHER_L1,
  mod: { ...ZERO_ATTRS },
  attr: { ...ZERO_ATTRS }
})

const survivors: Survivor[] = reactive([{
  name: "Bane",
  base: {
    ...ZERO_ATTRS,
    movement: 5,
    acc: 1,
    str: 1,
    eva: 1,
  },
  mod: { ...ZERO_ATTRS },
  attr: { ...ZERO_ATTRS },
  weapons: [
    { ...BONE_CLUB },
    { ...KING_SPEAR },
    { ...FIST_N_TOOTH }
  ]
}, {
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
    { name: 'Cat Gut Bow 🏹', speed: 2, acc: 7, str: 3 },
    { name: 'Cat Gut Bow + Aim 🏹', speed: 1, acc: 5, str: 3 },
    { ...BONE_DARTS },
    { ...FIST_N_TOOTH }
  ]
}, {
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
    { ...BEAST_KNUCKLE },
    { ...BONE_DARTS },
    { ...FIST_N_TOOTH }
  ]
}, {
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
    { ...FIST_N_TOOTH, acc: 8 - 1, str: 0 + 1 },
    { ...FOUNDING_STONE }
  ]
}
])

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

  survivors.forEach((s) => s.attr = {
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
const attrOrder = ref(0)

const showDialog = ref(false)
const attr: Ref<keyof Attributes> = ref('hp')
const who: Ref<MonsterStats | Survivor> = ref(mon)
const counter = ref(0)
function dialog(mod: MonsterStats | Survivor, a: keyof Attributes) {
  showDialog.value = true
  attr.value = a
  who.value = mod
  counter.value = 0
  lastLog.value = "..."
}
function click(x: number) {
  who.value.mod[attr.value] += x
  counter.value += x
  updateAttrs()
  log(`Updated ${who.value.name} ${attr.value} by ${counter.value} to ${who.value.attr[attr.value]}.`)
}
function wheel(e: WheelEvent) {
  click(-Math.abs(e.deltaY) / e.deltaY)
}

const monController = ref(3)
const showMods = ref(true)

const lastLog = ref('...')
function log(str: string) {
  console.log(str)
  lastLog.value = str
}
</script>

<template>
  <div class="min-h-screen select-none bg-stone-950 p-4 text-center font-bold text-stone-300">
    <h1 class="text-4xl font-bold leading-loose">{{ mon.name }} Lvl {{ mon.lvl }}</h1>
    <div class="flex flex-wrap justify-center text-3xl font-bold">
      <div class="grid grid-cols-2 justify-center gap-2 p-2">
        <h2>Health</h2>
        <h2>Toughness</h2>
        <div>
          <Attribute :base="mon.base.hp" :mod="mon.mod.hp" :showMods @click="dialog(mon, 'hp')" />
        </div>
        <div>
          <Attribute :base="mon.base.toughness" :mod="mon.mod.toughness" :showMods @click="dialog(mon, 'toughness')" />
        </div>
      </div>
      <div class="basis-full">
        <Attribute v-for="attr in ATTRIBUTE_ORDERS[attrOrder]" :key="'mon-' + attr"
          :class="attr === 'movement' || attr === 'eva' ? 'bg-slate-950' : ''" :base="mon.base[attr]"
          :mod="mon.mod[attr]" :showMods @click="dialog(mon, attr)" />
      </div>
    </div>

    <div>
      <h1 class="text-4xl font-bold leading-loose">Survivors</h1>
      <div class="grid grid-cols-2 text-3xl">
        <div v-for="surv, i in survivors" :key="surv.name">
          <h2 class="text-4xl leading-loose">
            <span class="cursor-pointer rounded-lg px-2 hover:bg-sky-950" @click="monController = i">
              {{ monController === i ? `👑 ${surv.name} 👑` : surv.name }}
            </span>
          </h2>
          <div>
            <Attribute v-for="attr in ATTRIBUTE_ORDERS[attrOrder]" :key="'surv-' + attr"
              :class="attr === 'movement' || attr === 'eva' ? 'bg-slate-950' : ''" :def="attr === 'movement' ? 5 : 0"
              :base="surv.base[attr]" :mod="surv.mod[attr]" :showMods @click="dialog(surv, attr)" />
          </div>
          <div class="grid grid-cols-[repeat(4,_auto)] justify-center text-xl font-normal leading-normal">
            <Weapon v-for="weapon in surv.weapons" :key="weapon.name" :weapon :mon :survivor="surv" />
          </div>
        </div>
      </div>
    </div>

    <div class="fixed right-1 top-1">
      <button class="rounded-lg border-2 border-stone-900 p-2 leading-normal hover:bg-stone-900"
        @click="showMods = !showMods">Mods</button>
      <br>
      <button class="mt-1 rounded-lg border-2 border-stone-900 p-2 leading-normal hover:bg-stone-900"
        @click="attrOrder = (attrOrder + 1) % ATTRIBUTE_ORDERS.length">Order</button>
    </div>

    <div class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-10 overflow-y-auto" @click="showDialog = false"
      :class="showDialog ? '' : 'hidden'">
      <dialog
        class="flex min-h-screen items-center justify-center bg-transparent px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-stone-900 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block transform overflow-hidden rounded-lg bg-stone-900 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div class="bg-stone-900 p-4">
            <div class="sm:flex sm:items-center sm:justify-center">
              <div class="text-center text-stone-300">
                <h3 class="text-4xl font-bold leading-normal" id="modal-title">
                  {{ who.name }}
                </h3>
                <h2 class="pb-4 text-lg capitalize">{{ attr }}: {{ who.attr[attr] }}</h2>
                <div>
                  <div class="flex items-center justify-center leading-normal">
                    <button @click.prevent.stop="click(-1)"
                      class="rounded-lg rounded-r-none border-2 border-r-0 border-stone-800 px-4 py-6 text-2xl font-bold hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-opacity-50"
                      aria-label="Decrease count">
                      ➖
                    </button>
                    <div class="min-w-52 rounded-lg border-2 border-stone-800 p-6 text-9xl font-bold" aria-live="polite"
                      @wheel.prevent="wheel">
                      {{ who.mod[attr] }}
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

  </div>
</template>
