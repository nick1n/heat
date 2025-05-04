<script setup lang="ts">
import { useFullscreen, useTitle } from '@vueuse/core';
import { computed, ref } from 'vue';

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
function selectHunt() {
  showDialog.value = true
  if (showCard.value) {
    flip()
  }
}

const fen = ref(true)
const frontSrc = computed(() => fen.value ? `/hunts/fen/fen-${card.value}-min.png` : `/hunts/HE-${card.value}.jpg`)
const backSrc = computed(() => fen.value ? "/hunts/fen/fen-back.png" : "/hunts/Hunt-Event-Back.jpg")
function change() {
  fen.value = !fen.value
  if (fen.value) {
    showBack.value = false
  }
}

const backs = [11, 73]
function flip() {
  if (transitioning.value) return
  if (loading.value) return

  showCard.value = !showCard.value
  transitioning.value = true
  if (!fen.value && backs.includes(card.value) && showCard.value && !showBack.value) {
    setTimeout(() => showBack.value = true, duration)
  }
  setTimeout(() => transitioning.value = false, duration)
}

function draw() {
  if (transitioning.value) return

  roll()

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
    roll()
    loading.value = true
    showBack.value = false
    card.value = val
  }
}

const { toggle: toggleFullscreen, isFullscreen } = useFullscreen()

const showHelp = ref(false)

const firstRand = ref(0)
const secondRand = ref(0)
const interval = ref<ReturnType<typeof setInterval> | undefined>(undefined)
function roll() {
  interval.value = setInterval(() => {
    firstRand.value = Math.floor(Math.random() * 10)
    secondRand.value = Math.floor(Math.random() * 10)
  }, 200)
}

function stop() {
  clearInterval(interval.value)
  transitioning.value = false
  loading.value = false
}
</script>

<template>
  <div
    class="font-kdm-text relative flex min-h-svh w-full items-center justify-center bg-stone-950 [perspective:1000px]">
    <div class="w-full overflow-hidden landscape:h-svh landscape:w-auto"
      :class="{ '[aspect-ratio:1059/1500]': fen, '[aspect-ratio:958/1504]': !fen }">
      <div class="relative h-full w-full cursor-pointer transition-transform duration-500 [transform-style:preserve-3d]"
        :class="{ '[transform:rotateY(180deg)]': showCard }" @click="flip">
        <img v-if="showBack" :src="`/hunts/HE-${card}-Back.jpg`"
          class="absolute left-0 top-0 h-full w-full [backface-visibility:hidden]">
        <img v-else :src="backSrc" class="absolute left-0 top-0 h-full w-full [backface-visibility:hidden]">
        <img :src="frontSrc" @load="stop"
          class="absolute left-0 top-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
      </div>
    </div>

    <div class="absolute right-1 top-1 flex flex-col gap-1">
      <button @click.prevent="toggleFullscreen" title="Fullscreen">
        <svg v-if="isFullscreen" width="4rem" height="4rem" fill="none" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff9"
            d="M7 9.5c1.4 0 2.5-1.1 2.5-2.5V2.5c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1v4h-4a1 1 0 0 0-1 1v1c0 .6.4 1 1 1H7ZM17 9.5A2.5 2.5 0 0 1 14.5 7V2.5c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v4h4c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1H17ZM17 14.5a2.5 2.5 0 0 0-2.5 2.5v4.5c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4h4c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1H17ZM9.5 17c0-1.4-1.1-2.5-2.5-2.5H2.5a1 1 0 0 0-1 1v1c0 .6.4 1 1 1h4v4c0 .6.4 1 1 1h1c.6 0 1-.4 1-1V17Z" />
        </svg>
        <svg v-else width="4rem" height="4rem" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff9"
            d="M4 1.5A2.5 2.5 0 0 0 1.5 4v4.5c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4h4c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1H4Zm16 0c1.4 0 2.5 1.1 2.5 2.5v4.5c0 .6-.4 1-1 1h-1a1 1 0 0 1-1-1v-4h-4a1 1 0 0 1-1-1v-1c0-.6.4-1 1-1H20Zm0 21c1.4 0 2.5-1.1 2.5-2.5v-4.5c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1v4h-4a1 1 0 0 0-1 1v1c0 .6.4 1 1 1H20ZM1.5 20c0 1.4 1.1 2.5 2.5 2.5h4.5c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1h-4v-4c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1V20Z" />
        </svg>
      </button>
      <button @click.prevent="showHelp = true" title="About">
        <svg width="4rem" height="4rem" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff9" fill-rule="evenodd" clip-rule="evenodd"
            d="M1 12a11 11 0 1 1 22 0 11 11 0 0 1-22 0Zm9.3 1.4c-.07.31.2.6.55.6h2.2a.6.6 0 0 0 .56-.4 3 3 0 0 1 .64-.85l.7-.69c.93-.88 1.8-1.7 1.8-3.15 0-2.5-2.17-3.91-4.48-3.91-1.77 0-4.2.8-4.69 3.5-.1.55.37 1 .92 1h1.41c.53 0 .92-.42 1.1-.92.18-.47.53-.82 1.26-.82 1.34 0 1.34 1.46.56 2.42-.29.37-.63.69-.97 1-.68.65-1.35 1.28-1.56 2.21ZM14 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        </svg>
      </button>
    </div>

    <button
      class="absolute bottom-0 right-0 z-10 w-64 rounded-tl-2xl border-l-2 border-t-2 border-white bg-slate-950/80 p-6 text-center text-4xl font-bold text-white"
      @click.prevent="draw">
      {{ loading ? 'Drawing...' : 'Draw' }}
    </button>

    <div
      class="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center overflow-y-auto bg-white/30"
      :class="showHelp ? '' : 'hidden'" @click="showHelp = false">
      <dialog
        class="relative flex flex-col rounded-3xl border-2 border-white bg-slate-950 p-10 text-3xl font-bold text-white shadow-2xl shadow-stone-950">
        <div class="mb-4">All credits for the cards go to</div>
        <div class="mb-2 flex cursor-pointer justify-between" @click.stop="change">
          <div>Fen:</div>
          <div class="relative">
            <input id="setting-fen" type="checkbox" :checked="fen" @input.stop="change" class="peer sr-only">
            <div
              class="peer h-8 w-16 rounded-full bg-gray-700 after:absolute after:left-0 after:top-0 after:h-8 after:w-8 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800">
            </div>
          </div>
        </div>
        <div>
          <a class="underline" href="https://patreon.com/FenPaints">patreon.com/FenPaints</a>
        </div>
        <div class="my-4">&amp;</div>
        <div class="mb-2 flex cursor-pointer justify-between" @click.stop="change">
          <div><a href="https://boardgamegeek.com/user/Kekasi">Kekasi</a>:</div>
          <div class="relative">
            <input id="setting-kekasi" type="checkbox" :checked="!fen" @input.stop="change" class="peer sr-only">
            <div
              class="peer h-8 w-16 rounded-full bg-gray-700 after:absolute after:left-0 after:top-0 after:h-8 after:w-8 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800">
            </div>
          </div>
        </div>
        <div>
          <a class="underline" href="https://boardgamegeek.com/filepage/255740/kdm-15-hunt-event-reference-cards">
            boardgamegeek.com/filepage/255740
          </a>
        </div>
      </dialog>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center overflow-y-auto bg-white/30"
      :class="showDialog ? '' : 'hidden'" @click="showDialog = false">
      <dialog
        class="relative flex gap-8 rounded-3xl border-[.2rem] border-white bg-slate-950 p-10 text-center text-5xl font-bold shadow-2xl shadow-stone-950">
        <div class="absolute -left-7 top-0 transition-transform duration-200"
          :style="`transform:translateY(${2.6 + (first !== 0 ? first - 1 : 9) * 6}rem)`">
          <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="none" viewBox="0 0 24 24">
            <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd"
              d="M17.41 20.7a1 1 0 0 0 0-1.4L10.12 12l7.3-7.3a1 1 0 0 0 0-1.4l-.71-.71a1 1 0 0 0-1.42 0l-8.35 8.35a1.5 1.5 0 0 0 0 2.12l8.35 8.35a1 1 0 0 0 1.42 0l.7-.7Z" />
          </svg>
        </div>
        <div class="flex flex-col gap-8">
          <button v-for="i in 10" :key="i" @click.prevent.stop="click(10, i)" :title="i % 10 + '0'"
            class="h-16 w-16 rotate-45 cursor-pointer rounded-lg border-[.2rem] border-white bg-white text-stone-950 transition-shadow duration-300 hover:shadow-[0_0_1.5rem_0.5rem_rgba(255,255,255,0.9),0_0_3rem_1.5rem_rgba(255,255,255,0.7)]"
            :class="{ 'animate-pulse shadow-[0_0_1rem_2px_rgba(255,255,255,0.7),0_0_2rem_0.5rem_rgba(255,255,255,0.5)]': first === i % 10 }">
            <div class="-rotate-45" :class="{ 'font-kd-icon': i === 10 }">{{ i === 10 ? 'e' : i }}</div>
          </button>
        </div>
        <div class="flex flex-col gap-8">
          <button v-for="i in 10" :key="i" @click.prevent.stop="click(1, i)" :title="'' + i"
            class="h-16 w-16 rotate-45 cursor-pointer rounded-lg border-[.2rem] border-white bg-slate-950 text-white transition-shadow duration-300 hover:shadow-[0_0_1.5rem_0.5rem_rgba(255,255,255,0.9),0_0_3rem_1.5rem_rgba(255,255,255,0.7)]"
            :class="{ 'animate-pulse shadow-[0_0_1rem_2px_rgba(255,255,255,0.7),0_0_2rem_0.5rem_rgba(255,255,255,0.5)]': second === i % 10 }">
            <div class="-rotate-45" :class="{ 'font-kd-icon': i === 10 }">{{ i === 10 ? 'e' : i }}</div>
          </button>
        </div>
        <div class="absolute -right-7 top-0 transition-transform duration-200"
          :style="`transform:translateY(${2.6 + (second !== 0 ? second - 1 : 9) * 6}rem)`">
          <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="none" viewBox="0 0 24 24">
            <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd"
              d="M7.2 20.7a1 1 0 0 1 0-1.4l7.3-7.3-7.3-7.3a1 1 0 0 1 0-1.4l.71-.71a1 1 0 0 1 1.42 0l8.35 8.35a1.5 1.5 0 0 1 0 2.12l-8.35 8.35a1 1 0 0 1-1.42 0l-.7-.7Z" />
          </svg>
        </div>
      </dialog>
    </div>
  </div>

  <div class="font-kdm-text fixed bottom-0 left-0 z-10 flex gap-8 overflow-hidden p-4 text-center text-6xl font-bold">
    <button
      class="relative h-20 w-20 -rotate-45 rounded-lg border-2 border-white bg-white/80 text-black transition-transform duration-200"
      :style="loading ? `--tw-rotate: -${secondRand / 9 * 360}deg` : ''" @click.prevent="selectHunt">
      <div v-if="loading" class="rotate-45" :class="{ 'font-kd-icon': firstRand === 0 }">
        {{ firstRand === 0 ? 'e' : firstRand }}
      </div>
      <div v-else class="rotate-45" :class="{ 'font-kd-icon': first === 0 }">{{ first === 0 ? 'e' : first }}</div>
    </button>
    <button
      class="relative h-20 w-20 rotate-45 rounded-lg border-2 border-white bg-slate-950/80 text-white transition-transform duration-200"
      :style="loading ? `--tw-rotate: ${firstRand / 9 * 360}deg` : ''" @click.prevent="selectHunt">
      <div v-if="loading" class="-rotate-45" :class="{ 'font-kd-icon': secondRand === 0 }">
        {{ secondRand === 0 ? 'e' : secondRand }}
      </div>
      <div v-else class="-rotate-45" :class="{ 'font-kd-icon': second === 0 }">{{ second === 0 ? 'e' : second }}</div>
    </button>
  </div>

</template>
