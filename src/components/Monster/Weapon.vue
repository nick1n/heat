<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Monster, MonsterStats, Survivor, Weapon } from './types';
import HitProbability from '@/components/Monster/HitProbability.vue';

const { weapon, mon, survivor, toggleBlindSpot, toggleKnockedDown } = defineProps<{
  weapon: Weapon;
  mon: MonsterStats;
  survivor: Survivor;
  toggleBlindSpot: boolean;
  toggleKnockedDown: boolean;
}>()

const lantern = (x: number) => x === 10 ? x : x + '+'
const minmax = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max))

const numOfDice = computed(() => Math.max(weapon.speed + survivor.attr.speed, 1))
const hitOn = computed(() => toggleKnockedDown ? 3 : minmax(2, weapon.acc - survivor.attr.acc + mon.attr.eva - (toggleBlindSpot ? 1 : 0), 10))
const critOn = computed(() => Math.max(2, 10 - survivor.attr.luck - (weapon.deadly ?? 0) + mon.attr.luck))
const woundOn = computed(() => minmax(2, mon.attr.toughness - (survivor.attr.str + weapon.str), Math.min(critOn.value, 10)))

const displayProbs = ref(false)
</script>

<template>
  <div class="col-span-4 cursor-pointer border-t-2 border-stone-800 px-2 text-left sm:hidden lg:block xl:hidden"
    @click="displayProbs = !displayProbs">
    {{ weapon.name }} <span class="grayscale">{{ weapon.icon }}</span>:
  </div>
  <div class="cursor-pointer border-stone-800 px-2 text-left sm:hidden lg:block xl:hidden"
    @click="displayProbs = !displayProbs">
    Roll {{ numOfDice }}
  </div>

  <div class="hidden cursor-pointer truncate border-t-2 border-stone-800 px-2 text-right sm:block lg:hidden xl:block"
    style="direction: rtl" @click="displayProbs = !displayProbs">
    {{ weapon.name }} <span class="grayscale">{{ weapon.icon }}</span>: Roll {{ numOfDice }}
  </div>

  <div class="cursor-pointer border-stone-800 px-2 sm:border-t-2 lg:border-0 xl:border-t-2"
    @click="displayProbs = !displayProbs">
    Hit: {{ lantern(hitOn) }}
  </div>
  <div class="cursor-pointer border-stone-800 px-2 sm:border-t-2 lg:border-0 xl:border-t-2"
    @click="displayProbs = !displayProbs">
    Wound: {{ lantern(woundOn) }}
  </div>
  <div class="cursor-pointer border-stone-800 px-2 sm:border-t-2 lg:border-0 xl:border-t-2"
    @click="displayProbs = !displayProbs">
    <strong v-if="critOn > 10">Can't Crit</strong>
    <template v-else>
      Crit: {{ lantern(critOn) }}
    </template>
  </div>
  <HitProbability :rolls="numOfDice" :hit="hitOn" :wound="woundOn" :crit="critOn" v-if="displayProbs" />
</template>
