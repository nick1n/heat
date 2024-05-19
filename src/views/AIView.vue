<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const CARDS = [...Array(10).keys()]
const cards = reactive(CARDS)
const index = ref(-1)
const current = computed(() => cards[index.value])
const progress = computed(() => `width: ${((index.value + 1) / cards.length) * 100}%`)

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
  <div class="h-screen w-screen">
    <div class="fixed left-0 top-0 z-0 h-screen w-screen bg-white text-center text-6xl font-bold" :class="{ 'z-10': index === -1 }">
      Tap on screen to shuffle<br />
      or draw top card
    </div>
    <img src="/img/card-00.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 0 }" />
    <img src="/img/card-01.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 1 }" />
    <img src="/img/card-02.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 2 }" />
    <img src="/img/card-03.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 3 }" />
    <img src="/img/card-04.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 4 }" />
    <img src="/img/card-05.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 5 }" />
    <img src="/img/card-06.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 6 }" />
    <img src="/img/card-07.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 7 }" />
    <img src="/img/card-08.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 8 }" />
    <img src="/img/card-09.png" class="fixed left-0 top-0 z-0 h-screen w-screen" :class="{ 'z-10': current === 9 }" />
    <div class="fixed left-0 top-0 z-20 bg-indigo-400 text-center text-sm font-bold text-white transition-all duration-500" :style="progress">
      {{ index === -1 ? '' : index + 1 }}
    </div>
    <div class="fixed left-0 top-0 z-30 grid h-screen w-screen grid-cols-2">
      <button
        @click="click(-1)"
        class="cursor-pointer select-none text-center text-5xl font-bold text-gray-800 opacity-10 transition-opacity duration-500 active:opacity-90 active:duration-0"
      >
        {{ index === -1 ? 'Shuffle' : 'Prev' }}
      </button>
      <button
        @click="click(1)"
        class="cursor-pointer select-none text-center text-5xl font-bold text-gray-800 opacity-10 transition-opacity duration-500 active:opacity-90 active:duration-0"
      >
        {{ index < cards.length - 1 ? 'Draw' : 'End' }}
      </button>
    </div>
  </div>
</template>
