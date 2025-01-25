<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, type Ref } from 'vue';
import { useStorage } from '@vueuse/core';

import Attribute from '@/components/Monster/Attribute.vue';
import Weapon from '@/components/Monster/Weapon.vue';
import { ATTRIBUTE_ORDERS, MS, ZERO_ATTRS, type Attributes, type Monster, type MonsterStats, type Survivor } from '@/components/Monster/types';
import * as MONSTERS from '@/components/Monster/monsters';
import { useKdmStore } from '@/stores/kdm';

const store = useKdmStore();

const mon: MonsterStats = reactive({
  ...MONSTERS[store.selectedMonster],
  mod: { ...ZERO_ATTRS },
  attr: { ...ZERO_ATTRS }
})

const selectMonster = ref(false)
function clickMonster(key: keyof typeof MONSTERS, m: Monster) {
  store.selectedMonster = key
  selectMonster.value = false
  mon.img = m.img
  mon.name = m.name
  mon.lvl = m.lvl
  mon.base = m.base
  mon.mod = { ...ZERO_ATTRS }
  updateAttrs()
}

const survivorAttrs: Ref<Attributes[]> = ref([{ ...ZERO_ATTRS }, { ...ZERO_ATTRS }, { ...ZERO_ATTRS }, { ...ZERO_ATTRS }])
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

  survivorAttrs.value = store.hunters.map((i) => {
    const { base, mod } = store.survivors[i]
    return {
      movement: base.movement + mod.movement,
      acc: base.acc + mod.acc,
      str: base.str + mod.str,
      eva: base.eva + mod.eva,
      luck: base.luck + mod.luck,
      speed: base.speed + mod.speed,
      hp: 0,
      toughness: 0,
    }
  })
}
updateAttrs()

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
  log(`Updated ${who.value.name} ${who.value.type === MS.MONSTER && attr.value === 'str' ? 'damage' : attr.value} by ${counter.value} to ${who.value[stat.value][attr.value]}.`)
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
    store.settings.showMods = !store.settings.showMods
  } else if (e.key === 'o') {
    store.settings.changeOrder()
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
            <Attribute :base="mon.base.hp" :mod="mon.mod.hp" :attr="'hp'" @click="dialog(mon, 'hp')" />
          </div>
          <div>
            <Attribute :base="mon.base.toughness" :mod="mon.mod.toughness" :attr="'toughness'"
              @click="dialog(mon, 'toughness')" />
          </div>
        </div>
        <div class="basis-full text-2xl sm:text-3xl">
          <Attribute v-for="attr in ATTRIBUTE_ORDERS[store.settings.attrOrder]" :key="'mon-' + attr" :attr
            :base="mon.base[attr]" :mod="mon.mod[attr]" @click="dialog(mon, attr)" />
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
        <div v-for="survId, i in store.hunters" :key="store.survivors[survId].name">
          <h2 class="text-4xl leading-normal">
            <button class="my-2 cursor-pointer rounded-lg px-4 hover:bg-sky-950" @click.prevent="monController = i">
              {{ monController === i ? `👑 ${store.survivors[survId].name} 👑` : store.survivors[survId].name }}
            </button>
          </h2>
          <div class="text-2xl sm:text-3xl">
            <Attribute v-for="attr in ATTRIBUTE_ORDERS[store.settings.attrOrder]" :key="'surv-' + attr" :attr
              :base="store.survivors[survId].base[attr]" :mod="store.survivors[survId].mod[attr]"
              @click="dialog(store.survivors[survId], attr)" />
          </div>
          <div class="grid grid-cols-[repeat(4,_auto)] justify-center text-xl font-normal leading-normal">
            <Weapon v-for="weaponId in store.survivors[survId].weapons" :key="weaponId" :weaponId :monAttr="mon.attr"
              :survAttr="survivorAttrs[i]" :toggleBlindSpot :toggleKnockedDown />
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-screen">
      <h1 class="text-4xl font-bold leading-loose">Survivors</h1>

      <div class="flex justify-center">
        <div class="grid grid-cols-12 text-4xl">
          <template v-for="surv, i in store.survivors" :key="'list-' + surv.name">
            <h2 class="col-span-6 text-right leading-normal">
              <button class="my-2 cursor-pointer rounded-lg px-4 hover:bg-sky-950" @click.prevent="monController = i">
                <span class="grayscale">{{ surv.icons }}</span> {{ surv.name }}
              </button>
            </h2>
            <Attribute v-for="attr in ATTRIBUTE_ORDERS[store.settings.attrOrder]" :key="'list-surv-' + attr" :attr
              :base="surv.base[attr]" :mod="surv.mod[attr]" :showMods="false" :justBase="true"
              @click="dialog(surv, attr, 'base')" />
          </template>
        </div>
      </div>
    </div>

    <div class="fixed right-1 top-1">
      <button
        class="rounded-lg border-2 border-stone-900 p-2 leading-normal outline-sky-950 hover:bg-stone-900 focus:outline-2 active:bg-black"
        @click.prevent="store.settings.showMods = !store.settings.showMods">Mods</button>
      <br>
      <button
        class="mt-1 rounded-lg border-2 border-stone-900 p-2 leading-normal outline-sky-950 hover:bg-stone-900 focus:outline-2 active:bg-black"
        @click.prevent="store.settings.changeOrder">Order</button>
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
                  {{ who.type === MS.MONSTER && attr === 'str' ? 'damage' : attr }}: {{ who[stat][attr] }}
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
