<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const CARDS = [...Array(10).keys()]
const cards = reactive(CARDS)
const index = ref(-1)
const current = computed(() => cards[index.value])

function click(val: number) {
  if (index.value === -1) {
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
  <div>
    <div class="fixed left-0 top-0 w-svw h-svh flex items-center justify-center text-9xl text-center font-bold bg-white z-0" :class="{ 'z-10': index === -1 }">
      Tap on screen to shuffle<br />
      and draw top card
    </div>
    <img src="/img/card-00.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 0 }" />
    <img src="/img/card-01.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 1 }" />
    <img src="/img/card-02.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 2 }" />
    <img src="/img/card-03.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 3 }" />
    <img src="/img/card-04.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 4 }" />
    <img src="/img/card-05.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 5 }" />
    <img src="/img/card-06.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 6 }" />
    <img src="/img/card-07.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 7 }" />
    <img src="/img/card-08.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 8 }" />
    <img src="/img/card-09.png" class="fixed left-0 top-0 w-svw h-svh z-0" :class="{ 'z-10': current === 9 }" />
    <div class="fixed left-0 top-0 w-svw h-svh text-center font-bold z-20">{{ index === -1 ? '' : index + 1 }}</div>
    <div class="fixed left-0 top-0 w-svw h-svh grid-cols-2 grid z-30">
      <div @click="click(-1)" class="cursor-pointer hover:bg-sky-500/10 select-none"></div>
      <div @click="click(1)" class="cursor-pointer hover:bg-sky-500/10 select-none"></div>
    </div>
  </div>
</template>
