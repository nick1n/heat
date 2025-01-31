<script setup lang="ts">
import { computed } from 'vue';

const { rolls, hit, wound, crit } = defineProps<{
  rolls: number;
  hit: number;
  wound: number;
  crit: number;
}>()

const s = (i: number) => i !== 1 ? 's' : ''
const percent = (i: number) => i < 0.009 ? '<1%' : Math.round(i * 100) + '%'

function factorial(n: number) {
  let r = 1;
  for (let i = 2; i <= n; i++) {
    r = r * i;
  }
  return r;
}

const hitOn = computed(() => Math.min(hit - 1, 9))
const woundOn = computed(() => Math.min(wound - 1, 9))
const critOn = computed(() => crit - 1)

function prob(numOfDice: number, numOfHits: number, on: number) {
  const combinations = factorial(numOfDice) / (factorial(numOfHits) * factorial(numOfDice - numOfHits));
  const p = (10 - on) / 10;
  return percent(combinations * Math.pow(p, numOfHits) * Math.pow(1 - p, numOfDice - numOfHits));
}
</script>

<template>
  <div v-for="(_, i) in rolls + 1" :key="i" class="col-span-4 leading-tight" :class="i === rolls ? 'mb-2' : ''">
    <template v-if="i === 0">
      Complete miss: <strong>{{ percent(Math.pow(hitOn / 10, rolls)) }}</strong>
    </template>
    <template v-else>
      {{ i }} hit{{ s(i) }}:
      {{ prob(rolls, i, hitOn) }}
      |
      {{ i }} wound{{ s(i) }}: {{ prob(i, i, woundOn) }}
      |
      <strong v-if="critOn >= 10">Can't Crit</strong>
      <template v-else>
        {{ i }} crit{{ s(i) }}: {{ prob(i, i, critOn) }}
      </template>
    </template>
  </div>
</template>
