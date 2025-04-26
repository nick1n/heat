<script setup lang="ts">
import { useFullscreen, useTitle } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

useTitle('KD:M Hunt Events')

const card = ref(1)
const showCard = ref(false)
const showBack = ref(false)

const transitioning = ref(false)
const loading = ref(true)
const duration = 500 as const

const first = computed(() => Math.floor(card.value / 10) % 10)
const second = computed(() => card.value % 10)

const showDialog = ref(false)

const backs = [11, 73]
function flip() {
  if (transitioning.value) return
  if (loading.value) return

  showCard.value = !showCard.value
  transitioning.value = true
  if (backs.includes(card.value) && showCard.value && !showBack.value) {
    setTimeout(() => showBack.value = true, duration)
  }
  setTimeout(() => transitioning.value = false, duration)
}

function draw() {
  if (transitioning.value) return
  if (loading.value) return

  showCard.value = false
  showBack.value = false
  transitioning.value = true
  loading.value = true
  setTimeout(() => {
    randomCard()
  }, duration)
}

function randomCard() {
  card.value = Math.floor(Math.random() * 100) + 1
}

function click(die: number, i: number) {
  if (i === 10) {
    i = 0
  }
  let val = 10 * i + second.value
  if (die === 1) {
    val = first.value * 10 + i
  }
  if (val === 0) {
    val = 100
  }
  if (val !== card.value) {
    loading.value = true
    showBack.value = false
    card.value = val
  }
}

const { toggle: toggleFullscreen } = useFullscreen()
</script>

<template>
  <div
    class="font-kdm-text flex min-h-svh w-full items-center justify-center overflow-hidden bg-stone-950 [perspective:1000px]">
    <div
      class="relative max-h-full w-svw cursor-pointer transition-transform duration-500 [aspect-ratio:958/1504] [transform-style:preserve-3d]"
      :class="{ '[transform:rotateY(180deg)]': showCard }" @click="flip">
      <img v-if="showBack" :src="`/hunts/HE-${card}-Back.jpg`"
        class="absolute left-0 right-0 top-0 w-svw [backface-visibility:hidden]">
      <img v-else src="/hunts/Hunt-Event-Back.jpg"
        class="absolute left-0 right-0 top-0 w-svw [backface-visibility:hidden]">
      <img :src="`/hunts/HE-${card}.jpg`" @load="transitioning = false; loading = false"
        class="absolute left-0 right-0 top-0 w-svw [backface-visibility:hidden] [transform:rotateY(180deg)]">
    </div>
    <div class="absolute bottom-0 left-0 flex gap-8 p-4 text-center text-5xl font-bold">
      <button class="relative h-20 w-20 rotate-45 rounded border-2 border-white bg-white/80 text-black"
        @click.prevent="showDialog = true">
        <div class="-rotate-45" :class="{ 'font-kd-icon': first === 0 }">{{ first === 0 ? 'e' : first }}</div>
      </button>
      <button class="relative h-20 w-20 rotate-45 rounded border-2 border-white bg-slate-950/80 text-white"
        @click.prevent="showDialog = true">
        <div class="-rotate-45" :class="{ 'font-kd-icon': second === 0 }">{{ second === 0 ? 'e' : second }}</div>
      </button>
    </div>
    <button
      class="absolute bottom-0 right-0 w-64 rounded-tl-2xl border-l-2 border-t-2 border-white bg-slate-950/80 p-6 text-center text-4xl font-bold text-white"
      @click.prevent="draw">
      {{ loading ? 'Drawing...' : 'Draw' }}
    </button>

    <div class="fixed bottom-0 left-0 right-0 top-0 z-10 overflow-y-auto bg-white/30"
      :class="showDialog ? '' : 'hidden'" @click="showDialog = false">
      <dialog
        class="flex min-h-screen items-center justify-center bg-transparent shadow-lg shadow-stone-950 sm:block sm:p-0">
        <div
          class="relative flex gap-8 rounded-3xl border-2 border-white bg-slate-950 px-10 py-5 text-center text-5xl font-bold">
          <div
            class="absolute -left-4 -top-6 pt-[1px] text-white transition-transform duration-200 [text-shadow:0_0_3px_black]"
            :style="`transform:translateY(${3.75 + (first !== 0 ? first - 1 : 9) * 7}rem)`">
            ▶
          </div>
          <div class="flex flex-col gap-8">
            <button v-for="i in 10" :key="i" @click.prevent.stop="click(10, i)"
              class="relative h-20 w-20 rotate-45 cursor-pointer rounded border-2 border-white bg-white/80 text-black">
              <div class="-rotate-45" :class="{ 'font-kd-icon': i === 10 }">{{ i === 10 ? 'e' : i }}</div>
            </button>
          </div>
          <div class="flex flex-col gap-8">
            <button v-for="i in 10" :key="i" @click.prevent.stop="click(1, i)"
              class="relative h-20 w-20 rotate-45 cursor-pointer rounded border-2 border-white bg-slate-950/80 text-white">
              <div class="-rotate-45" :class="{ 'font-kd-icon': i === 10 }">{{ i === 10 ? 'e' : i }}</div>
            </button>
          </div>
          <div
            class="absolute -right-4 -top-6 pt-[1px] text-white transition-transform duration-200 [text-shadow:0_0_3px_black]"
            :style="`transform:translateY(${3.75 + (second !== 0 ? second - 1 : 9) * 7}rem)`">
            ◀
          </div>
        </div>
      </dialog>
    </div>

    <div class="fixed right-1 top-1">
      <button @click.prevent="toggleFullscreen" title="Fullscreen">
        <svg width="2.25rem" height="2.25rem" fill="none" viewBox="0 0 24 24">
          <path fill="#fff"
            d="M4 1.5A2.5 2.5 0 0 0 1.5 4v4.5c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4h4c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1H4Zm16 0c1.4 0 2.5 1.1 2.5 2.5v4.5c0 .6-.4 1-1 1h-1a1 1 0 0 1-1-1v-4h-4a1 1 0 0 1-1-1v-1c0-.6.4-1 1-1H20Zm0 21c1.4 0 2.5-1.1 2.5-2.5v-4.5c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1v4h-4a1 1 0 0 0-1 1v1c0 .6.4 1 1 1H20ZM1.5 20c0 1.4 1.1 2.5 2.5 2.5h4.5c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1h-4v-4c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1V20Z" />
        </svg>
      </button>
    </div>

  </div>
</template>
