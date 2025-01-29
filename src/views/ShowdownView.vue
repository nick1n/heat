<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, type Ref, computed, type FunctionalComponent, type Events, type EmitsOptions } from 'vue';
import { useStorage, useTitle, type RemovableRef } from '@vueuse/core';

import Attribute from '@/components/Monster/Attribute.vue';
import Weapon from '@/components/Monster/Weapon.vue';
import { ATTRIBUTE_ORDERS, MS, ZERO_ATTRS, ACTIONS, type Attributes, type Monster, type MonsterStats, type Survivor, type WeaponType, type WEAPON_IDS, HunterStatus } from '@/components/Monster/types';
import * as MONSTERS from '@/components/Monster/monsters';
import * as WEAPONS from '@/components/Monster/weapons'
import { useKdmStore } from '@/stores/kdm';

useTitle('KD:M Showdown')

const store = useKdmStore()

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
    const { base, mod } = store.survivors[i.survivorId]
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

const survivorDialog = ref(false)
const selectedSurvivor = ref(0)
function showSurvivorDialog(survivorId: number) {
  selectedSurvivor.value = survivorId
  survivorDialog.value = true
}

const survivor = computed(() => store.survivors[selectedSurvivor.value])
const selectedWeapon: Ref<WEAPON_IDS | ''> = ref('')

const confirmDelete = ref(false)
function clickDelete() {
  if (confirmDelete.value) {
    survivorDialog.value = false
    confirmDelete.value = false
    store.removeSurvivor(selectedSurvivor.value)
    selectedSurvivor.value = 0
  } else {
    confirmDelete.value = true
  }
}

const settingsDialog = ref(false)

onMounted(() => {
  window.addEventListener('keydown', keydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', keydown)
})
function keydown(e: KeyboardEvent) {
  const key = e.key.toLowerCase()
  if (key === 'k') {
    toggleKnockedDown.value = !toggleKnockedDown.value
  } else if (key === 'b') {
    toggleBlindSpot.value = !toggleBlindSpot.value
  } else if (key === 'm') {
    store.settings.showMods = !store.settings.showMods
  } else if (key === 'o') {
    store.settings.changeOrder()
  } else if (key === 'escape' || key === 'esc') {
    showDialog.value = false
    selectMonster.value = false
    survivorDialog.value = false
    settingsDialog.value = false
  } else if (key === '1' || key === '2' || key === '3' || key === '4') {
    const i = +key - 1
    if (survivorDialog.value) {
      store.hunters[i].survivorId = selectedSurvivor.value
    } else {
      store.monController = i
    }
  }
}

const capitalize = (x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
const GetValue: FunctionalComponent<{ value: any }, EmitsOptions> = (props, { slots }) => slots?.default?.(props)
</script>

<template>
  <div
    class="font-kdm-text select-none bg-stone-950 bg-contain bg-top bg-no-repeat p-4 text-center font-bold text-stone-300"
    :style="`background-image: url(/img/${mon.img})`">
    <div class="relative min-h-screen">
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
        <div class="grid grid-cols-3 justify-center p-2">
          <button class="rounded-l-lg border-2 border-stone-800 px-4 py-2 text-xl font-medium"
            :class="toggleBlindSpot ? 'bg-stone-800 hover:bg-stone-900' : 'hover:bg-stone-800'"
            @click.prevent="toggleBlindSpot = !toggleBlindSpot">
            Blind Spot
          </button>
          <button class="border-2 border-l-0 border-stone-800 px-4 py-2 text-xl font-medium"
            :class="toggleKnockedDown ? 'bg-stone-800 hover:bg-stone-900' : 'hover:bg-stone-800'"
            @click.prevent="toggleKnockedDown = !toggleKnockedDown">
            Knocked Down
          </button>
          <button class="rounded-r-lg border-2 border-l-0 border-stone-800 px-4 py-2 text-xl font-medium"
            :class="toggleKnockedDown ? 'bg-stone-800 hover:bg-stone-900' : 'hover:bg-stone-800'"
            @click.prevent="store.nextRound">
            Next Round <span class="grayscale"
              :style="`--tw-grayscale:grayscale(${store.settings.grayscale}%)`">🔄</span>
          </button>
        </div>
      </div>

      <div class="grid gap-2 text-3xl lg:grid-cols-2">
        <div v-for="hunter, i in store.hunters" :key="store.survivors[hunter.survivorId].name"
          :class="{ 'lg:order-4': i === 2, 'lg:order-3': i === 3 }">
          <h2 class="mx-auto flex min-w-[50%] justify-center gap-2 text-4xl leading-normal">
            <button
              class="my-2 min-w-0 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-4 hover:bg-sky-950"
              :class="store.survivors[hunter.survivorId].dead ? 'text-stone-600' : store.survivors[hunter.survivorId].retired ? 'text-stone-400' : ''"
              @click.prevent="showSurvivorDialog(hunter.survivorId)">
              {{ store.monController === i ? '🎮 ' : '' }}
              {{ store.survivors[hunter.survivorId].dead ? '💀 ' : '' }}
              {{ store.survivors[hunter.survivorId].name }}
              <span class="grayscale" :style="`--tw-grayscale:grayscale(${store.settings.grayscale}%)`">
                {{ store.survivors[hunter.survivorId].icons }}
              </span>
            </button>
            <div v-if="!store.survivors[hunter.survivorId].dead" class="flex items-center gap-1">
              <button class="relative h-10 w-10 rounded-lg border-4 text-xl leading-10"
                :class="hunter.status === HunterStatus.STANDING ? 'border-emerald-800' : hunter.status === HunterStatus.KNOCKDOWN ? 'border-yellow-800' : 'border-rose-800'"
                :title="hunter.status === HunterStatus.STANDING ? 'Standing' : hunter.status === HunterStatus.KNOCKDOWN ? 'Knocked down during survivor phase' : 'Knocked down during monster phase'"
                @click.prevent="store.knockedDown(i)">
                <div
                  class="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center grayscale">
                  {{ hunter.status === HunterStatus.STANDING ? '🆗' :
                    hunter.status === HunterStatus.KNOCKDOWN ? '🔽' : '⏬' }}
                </div>
                <div>&nbsp;</div>
              </button>

              <button v-for="action in store.survivors[hunter.survivorId].actions.sort()"
                :key="hunter.survivorId + '-action-' + action"
                class="relative h-10 w-10 rounded-full border-4 text-xl leading-10"
                :class="store.survivors[hunter.survivorId].dead || store.hasUsedAction(i, action) ? 'border-stone-600' : 'border-stone-300'"
                :title="capitalize(action)" @click.prevent="store.useSurvivalAction(i, action)">
                <div class="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center"
                  :class="store.survivors[hunter.survivorId].dead || store.hasUsedAction(i, action) ? 'grayscale opacity-50' : ''">
                  {{ ACTIONS[action] }}
                </div>
                <div>&nbsp;</div>
              </button>
            </div>
          </h2>
          <div class="text-2xl sm:text-3xl">
            <Attribute v-for="attr in ATTRIBUTE_ORDERS[store.settings.attrOrder]" :key="'surv-' + attr" :attr
              :base="store.survivors[hunter.survivorId].base[attr]" :mod="store.survivors[hunter.survivorId].mod[attr]"
              @click="dialog(store.survivors[hunter.survivorId], attr)" />
          </div>
          <div class="grid grid-cols-[repeat(4,_auto)] justify-center text-xl font-normal leading-normal">
            <Weapon v-for="weaponId in store.survivors[hunter.survivorId].weapons" :key="weaponId" :weaponId
              :monAttr="mon.attr" :survAttr="survivorAttrs[i]" :toggleBlindSpot :toggleKnockedDown />
          </div>
        </div>
      </div>

      <div class="absolute right-1 top-1">
        <button class="rounded-lg border-2 border-stone-600 px-2 text-4xl leading-tight"
          @click.prevent="settingsDialog = true">
          <span class="grayscale" :style="`--tw-grayscale:grayscale(${store.settings.grayscale}%)`">⚙</span>
        </button>
        <button
          class="hidden rounded-lg border-2 border-stone-900 p-2 leading-normal outline-sky-950 hover:bg-stone-900 focus:outline-2 active:bg-black"
          @click.prevent="store.settings.toggleMods">Mods</button>
        <button
          class="mt-1 hidden rounded-lg border-2 border-stone-900 p-2 leading-normal outline-sky-950 hover:bg-stone-900 focus:outline-2 active:bg-black"
          @click.prevent="store.settings.changeOrder">Order</button>
      </div>
    </div>

    <div class="min-h-screen">
      <h1 class="pt-4 text-4xl font-bold leading-loose">Survivors</h1>

      <div class="flex justify-center">
        <div class="grid grid-cols-12 text-4xl">
          <template v-for="survivor, i in store.survivors" :key="'list-' + survivor.name">
            <div class="col-span-6 my-2 min-w-0 text-right">
              <button
                class="mr-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-4 text-right leading-normal hover:bg-sky-950"
                :class="survivor.dead ? 'text-stone-600' : survivor.retired ? 'text-stone-400' : ''"
                @click.prevent="showSurvivorDialog(i)">
                <span class="grayscale" :style="`--tw-grayscale:grayscale(${store.settings.grayscale}%)`">
                  {{ survivor.icons }}
                </span>
                <span v-if="survivor.dead" class="grayscale"
                  :style="`--tw-grayscale:grayscale(${store.settings.grayscale}%)`">💀</span>
                <span v-else-if="survivor.retired" class="grayscale"
                  :style="`--tw-grayscale:grayscale(${store.settings.grayscale}%)`">👴</span>
                {{ survivor.name }}
              </button>
            </div>
            <Attribute v-for="attr in ATTRIBUTE_ORDERS[store.settings.attrOrder]" :key="'list-surv-' + attr" :attr
              :base="survivor.base[attr]" :mod="survivor.mod[attr]" :justBase="true" :bottomBorder="true"
              @click="dialog(survivor, attr, 'base')" />
          </template>
        </div>
      </div>

      <button class="mt-2 w-16 rounded-lg px-1 text-center text-4xl leading-normal hover:bg-slate-800"
        @click.prevent="store.addSurvivor">
        ➕
      </button>
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
                <h3 class="text-4xl font-bold leading-normal">
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
                <h3 class="text-4xl font-bold leading-normal">
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

    <div class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-10 overflow-y-auto"
      :class="survivorDialog ? '' : 'hidden'" @click="survivorDialog = false; confirmDelete = false">
      <dialog
        class="flex min-h-screen items-center justify-center bg-transparent px-4 pb-20 pt-4 text-center sm:block sm:p-0">

        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-stone-900 opacity-75"></div>
        </div>

        <div
          class="max-w-full transform overflow-hidden rounded-lg bg-stone-900 p-4 text-center text-stone-300 shadow-xl transition-all sm:my-8 sm:w-full"
          @click.stop>
          <h3 class="my-2 flex justify-between gap-2 text-4xl font-bold leading-normal">
            <button class="rounded-lg border-2 border-stone-800 px-1 hover:bg-slate-800"
              @click.prevent="survivor.retired = !survivor.retired">
              <span :class="survivor.retired ? '' : 'opacity-5'">👴</span>
            </button>
            <input type="text" class="bg-transparent text-center" :value="survivor.name"
              @input="event => survivor.name = (event.target as HTMLInputElement).value" />
            <button class="rounded-lg border-2 border-stone-800 px-1 hover:bg-slate-800"
              @click.prevent="survivor.dead = !survivor.dead">
              <span :class="survivor.dead ? '' : 'opacity-5'">💀</span>
            </button>
          </h3>

          <input type="text" placeholder="Reminder Icons (👂🦵)" :value="survivor.icons"
            @input="(e) => store.iconsInput(selectedSurvivor, e)"
            class="rounded-lg border-2 border-stone-500 bg-transparent px-4 py-2 text-center text-3xl leading-none text-stone-500 outline-sky-950 placeholder:text-stone-500 hover:border-stone-500 hover:bg-stone-900 focus:outline-2 active:bg-black" />

          <div class="mt-2 flex justify-center gap-2 text-4xl">
            <button v-for="i in 4" :key="i"
              class="rounded-lg border-2 px-4 py-2 leading-none outline-sky-950 hover:border-stone-500 hover:bg-stone-900 focus:outline-2 active:bg-black"
              :class="store.hunters[i - 1].survivorId === selectedSurvivor ? 'text-stone-500 border-stone-500' : 'border-stone-800 text-stone-800'"
              @click.prevent="store.hunters[i - 1] = selectedSurvivor">
              {{ i }}
            </button>
          </div>

          <div class="mt-2 flex justify-center gap-2 text-4xl">
            <button v-for="icon, key in ACTIONS" :key :title="capitalize(key)"
              class="rounded-lg border-2 p-2 leading-none outline-sky-950 hover:border-stone-500 hover:bg-stone-900 focus:outline-2 active:bg-black"
              :class="survivor.actions.includes(key) ? 'text-stone-500 border-stone-500' : 'border-stone-800 text-stone-800'"
              @click.prevent="survivor.actions.includes(key) ? survivor.actions.splice(survivor.actions.indexOf(key), 1) : survivor.actions.push(key)">
              {{ icon }}
            </button>
          </div>

          <div class="mt-2 grid justify-center text-xl font-normal leading-normal">
            <div class="flex border-t-2 border-stone-500">
              <select class="block cursor-pointer bg-transparent px-2" v-model="selectedWeapon">
                <option class="bg-stone-800" value="" selected>
                  Select a weapon...
                </option>
                <option v-for="weapon, weaponId in WEAPONS" :key="'add-' + weaponId" class="bg-stone-800"
                  :value="weaponId">
                  {{ weapon.name }} {{ weapon.icon }}: {{ weapon.speed }}❨{{ weapon.acc }}+{{ weapon.str }}❩
                </option>
              </select>
              <button class="w-12 px-2 text-center"
                @click.prevent="store.addWeapon(selectedSurvivor, selectedWeapon); selectedWeapon = ''">➕</button>
            </div>
            <div v-for="weaponId, i in store.survivors[selectedSurvivor].weapons" :key="weaponId + i"
              class="mt-1 flex justify-between border-t-2 border-stone-500">
              <GetValue v-slot="{ weapon }: { weapon: WeaponType }"
                :weapon="WEAPONS[weaponId] ?? WEAPONS['FIST_N_TOOTH']">
                <div class="px-2">
                  {{ weapon.name }} <span class="grayscale"
                    :style="`--tw-grayscale:grayscale(${store.settings.grayscale}%)`">{{ weapon.icon }}</span>:
                  {{ ' ' }}
                  {{ weapon.speed }}❨{{ weapon.acc }}+{{ weapon.str }}❩
                </div>
              </GetValue><!--  ❨1+1❩ ❪1+1❫ ⦇1+1⦈ -->
              <button class="w-12 px-2 text-center" @click.prevent="store.removeWeapon(selectedSurvivor, i)">✖</button>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              class="w-16 rounded-lg border-2 border-stone-800 px-1 text-center text-4xl leading-normal hover:bg-slate-800"
              @click.prevent="clickDelete">
              {{ confirmDelete ? '✔' : '🗑️' }}
            </button>
          </div>
        </div>
      </dialog>
    </div>

    <div class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-10 overflow-y-auto" @click="settingsDialog = false"
      :class="settingsDialog ? '' : 'hidden'">
      <dialog
        class="flex min-h-screen items-center justify-center bg-transparent px-4 pb-20 pt-4 text-center sm:block sm:p-0">

        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-stone-900 opacity-75"></div>
        </div>

        <div
          class="grid max-w-full transform grid-cols-1 gap-2 overflow-hidden rounded-lg bg-stone-900 p-4 text-center text-stone-300 shadow-xl transition-all sm:my-8 sm:w-full"
          @click.stop>
          <h3 class="my-2 text-center text-4xl font-bold leading-normal">
            Settings
          </h3>

          <!-- Icon Order Toggle -->
          <label for="setting-order" class="flex cursor-pointer items-center justify-between">
            <span>Attribute Icon Order</span>
            <div class="relative inline-flex items-center">
              <input id="setting-order" type="checkbox" :value="store.settings.attrOrder"
                @input="store.settings.changeOrder" class="peer sr-only">
              <div
                class="peer h-6 w-11 rounded-full border-gray-600 bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800">
              </div>
            </div>
          </label>

          <!-- Grayscale Range -->
          <div class="space-y-2">
            <label class="flex items-center justify-between" for="setting-grayscale">
              <span>Icon Grayscale</span>
              <span>{{ store.settings.grayscale }}%</span>
            </label>
            <input type="range" min="0" max="100" :value="store.settings.grayscale" @input="store.settings.setGrayscale"
              class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              id="setting-grayscale">
          </div>

          <!-- Opacity Range -->
          <div class="space-y-2">
            <label class="flex items-center justify-between" for="setting-opacity">
              <span>Attribute Icon Opacity</span>
              <span>{{ Math.round(store.settings.opacity * 100) }}%</span>
            </label>
            <input type="range" min="0" max="1" step="0.01" :value="store.settings.opacity"
              @input="store.settings.setOpacity"
              class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              id="setting-opacity">
          </div>
        </div>
      </dialog>
    </div>

  </div>
</template>
