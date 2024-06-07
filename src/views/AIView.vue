<script setup lang="ts">
import { computed, reactive, ref, onUnmounted } from 'vue'

const CARDS = [...Array(10).keys()]
const cards = reactive(CARDS)
const index = ref(-1)
const current = computed(() => cards[index.value])

function click(val: number) {
  index.value += val
  timerReset()

  if (index.value < -1 || index.value >= cards.length) {
    index.value = -1
  }
}

function shuffleCards() {
  shuffle(cards)
  shuffle(cards)
  shuffle(cards)
}

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const interval = ref(0)
const time = ref('0s')

function timerReset() {
  clearInterval(interval.value)
  time.value = '0s'
  interval.value = window.setInterval(startTimer(), 1000)
}

function startTimer() {
  const start = getTime()
  return () => {
    const delta = Math.floor((getTime() - start) / 1000)
    const minutes = Math.floor(delta / 60)
    const seconds = delta % 60
    let t = ''
    if (minutes > 0) {
      t = minutes + 'm '
    }
    time.value = t + seconds + 's'
  }
}

function getTime() {
  return +new Date()
}

onUnmounted(() => clearInterval(interval.value))
</script>

<template>
  <div
    class="fixed left-0 h-svh w-svw origin-top-left overflow-hidden text-center text-6xl font-bold text-gray-800 portrait:top-full portrait:h-[100svw] portrait:w-[100svh] portrait:-rotate-90"
  >
    <div class="text-shadow fixed bottom-0 left-0 right-0 top-0 z-0" :class="{ 'z-20': index === -1 }">
      Tap on screen to shuffle<br />
      or draw top card
    </div>
    <div v-for="i in CARDS" :key="i" class="fixed bottom-0 left-0 right-0 top-0 z-0 flex items-center justify-center" :class="{ 'z-20': current === i }">
      <img :src="`/img/card-0${i}.png`" class="max-h-full" />
    </div>
    <div class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-slate-100"></div>
    <div class="fixed left-0 top-0 z-30 overflow-hidden bg-indigo-400 text-xl text-white transition-all duration-500" :style="`width: ${((index + 1) / cards.length) * 100}%`">
      {{ time }}
    </div>
    <div class="fixed bottom-0 left-0 right-0 top-0 z-40 grid grid-cols-2">
      <button
        v-if="index === -1"
        @click="shuffleCards"
        class="text-shadow cursor-pointer select-none opacity-10 transition-opacity duration-300 active:opacity-90 active:duration-0"
      >
        Shuffle
      </button>
      <button v-else @click="click(-1)" class="text-shadow cursor-pointer select-none opacity-10 transition-opacity duration-300 active:opacity-90 active:duration-0">Prev</button>

      <button
        v-if="index < cards.length - 1"
        @click="click(1)"
        class="text-shadow cursor-pointer select-none opacity-10 transition-opacity duration-300 active:opacity-90 active:duration-0"
      >
        Draw
      </button>
      <button v-else @click="click(1)" class="text-shadow cursor-pointer select-none opacity-10 transition-opacity duration-300 active:opacity-90 active:duration-0">End</button>
    </div>
  </div>
</template>

<style scoped>
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
