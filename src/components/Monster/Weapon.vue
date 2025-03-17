<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Attributes, WEAPON_IDS } from './types'
import * as WEAPONS from '@/components/Monster/weapons'
import HitProbability from '@/components/Monster/HitProbability.vue'

const { weaponId, monAttr, survAttr, toggleBlindSpot, toggleKnockedDown } = defineProps<{
  weaponId: WEAPON_IDS;
  monAttr: Attributes;
  survAttr: Attributes;
  toggleBlindSpot: boolean;
  toggleKnockedDown: boolean;
}>()

const lantern = (x: number) => x === 10 ? x : x + '+'
const minmax = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max))

const weapon = computed(() => WEAPONS[weaponId] ?? WEAPONS['FIST_N_TOOTH'])
const numOfDice = computed(() => weapon.value.icon.includes('🐢') ? 1 : Math.max(weapon.value.speed + survAttr.speed, 1))
const perfOn = computed(() => Math.max(2, 10 - survAttr.perf - (weapon.value.perfection ?? 0)))
const hitOn = computed(() => toggleKnockedDown ? 3 : minmax(2, weapon.value.acc - survAttr.acc + monAttr.eva - (toggleBlindSpot ? 1 : 0), Math.min(perfOn.value, 10)))
const critOn = computed(() => Math.max(2, 10 - survAttr.luck - (weapon.value.deadly ?? 0) + monAttr.luck))
const woundOn = computed(() => minmax(2, monAttr.toughness - (survAttr.str + weapon.value.str), 10))

const displayProbs = ref(false)
</script>

<template>
  <div
    class="col-span-5 hidden cursor-pointer self-center truncate border-t-2 border-stone-800 px-2 pt-1 text-left lg:block xl:hidden"
    @click="displayProbs = !displayProbs">
    {{ weapon.name }} <span class="tracking-tighter grayscale">{{ weapon.icon }}</span>:
  </div>
  <div class="hidden cursor-pointer self-center border-stone-800 px-2 pb-1 text-left lg:block xl:hidden"
    @click="displayProbs = !displayProbs">
    Roll {{ numOfDice }}
  </div>

  <div dir="rtl"
    class="cursor-pointer self-center truncate border-t-2 border-stone-800 px-2 py-1 text-right lg:hidden xl:block"
    @click="displayProbs = !displayProbs">
    {{ weapon.name }} <span class="tracking-tighter grayscale">{{ weapon.icon }}</span>: Roll {{ numOfDice }}
  </div>

  <div
    class="cursor-pointer self-center border-t-2 border-stone-800 px-2 py-1 lg:border-0 lg:pt-0 xl:border-t-2 xl:pt-0"
    @click="displayProbs = !displayProbs">
    Hit: {{ lantern(hitOn) }}
  </div>
  <div
    class="cursor-pointer self-center border-t-2 border-stone-800 px-2 py-1 lg:border-0 lg:pt-0 xl:border-t-2 xl:pt-0"
    @click="displayProbs = !displayProbs">
    <strong v-if="perfOn > 10">Can't PH</strong>
    <template v-else>
      Perf: {{ lantern(perfOn) }}
    </template>
  </div>
  <div
    class="cursor-pointer self-center border-t-2 border-stone-800 px-2 py-1 lg:border-0 lg:pt-0 xl:border-t-2 xl:pt-0"
    @click="displayProbs = !displayProbs">
    Wnd: {{ lantern(woundOn) }}
  </div>
  <div
    class="cursor-pointer self-center border-t-2 border-stone-800 px-2 py-1 lg:border-0 lg:pt-0 xl:border-t-2 xl:pt-0"
    @click="displayProbs = !displayProbs">
    <strong v-if="critOn > 10">Can't Crit</strong>
    <template v-else>
      Crit: {{ lantern(critOn) }}
    </template>
  </div>
  <HitProbability :rolls="numOfDice" :hit="hitOn" :wound="woundOn" :crit="critOn" v-if="displayProbs" />
</template>
