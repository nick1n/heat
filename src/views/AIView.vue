<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const CARDS = [...Array(10).keys()]
const cards = reactive(CARDS)
const index = ref(-1)
const current = computed(() => cards[index.value])

function click(val: number) {
  if (val === -1 && index.value === -1) {
    shuffle(cards)
    shuffle(cards)
    shuffle(cards)
  }

  index.value += val

  if (index.value < -1 || index.value >= cards.length) {
    index.value = -1
  }
}

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
</script>

<template>
  <div
    class="fixed left-0 h-svh w-svw origin-top-left overflow-hidden text-center text-[5vmax] font-bold text-gray-800 portrait:top-full portrait:h-[100svw] portrait:w-[100svh] portrait:-rotate-90"
  >
    <div class="text-shadow fixed bottom-0 left-0 right-0 top-0 z-0" :class="{ 'z-20': index === -1 }">
      Tap on screen to shuffle<br />
      or draw top card
    </div>
    <div v-for="i in CARDS" :key="i" class="fixed bottom-0 left-0 right-0 top-0 z-0 flex items-center justify-center" :class="{ 'z-20': current === i }">
      <img :src="`/img/card-0${i}.png`" class="max-h-full" />
    </div>
    <div class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-slate-100"></div>
    <div class="fixed left-0 top-0 z-30 bg-indigo-400 text-sm text-white transition-all duration-500" :style="`width: ${((index + 1) / cards.length) * 100}%`">
      {{ index === -1 ? '' : index + 1 }}
    </div>
    <div class="fixed bottom-0 left-0 right-0 top-0 z-40 grid grid-cols-2">
      <button @click="click(-1)" class="text-shadow cursor-pointer select-none opacity-10 transition-opacity duration-500 active:opacity-90 active:duration-75">
        {{ index === -1 ? 'Shuffle' : 'Prev' }}
      </button>
      <button @click="click(1)" class="text-shadow cursor-pointer select-none opacity-10 transition-opacity duration-500 active:opacity-90 active:duration-75">
        {{ index < cards.length - 1 ? 'Draw' : 'End' }}
      </button>
    </div>
  </div>
</template>

<style>
.text-shadow {
  text-shadow:
    -2px -2px 0 #fff,
    0 -2px 0 #fff,
    0 2px 0 #fff,
    2px -2px 0 #fff,
    -2px 2px 0 #fff,
    2px 0 0 #fff,
    -2px 0 0 #fff,
    2px 2px 0 #fff;
}
</style>
