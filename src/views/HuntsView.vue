<script setup lang="ts">
import { useFullscreen, useLocalStorage, useTitle, useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

useTitle('KD:M Hunt Events')

type Options = 'fen' | 'kekasi' | 'ccg'
type Settings = {
  [k in Options]: {
    aspectRatio: number,
    doubleSided: number[],
    ext: string
  }
}
const settings: Settings = {
  ccg: {
    aspectRatio: 1122 / 1797,
    doubleSided: [73],
    ext: 'png'
  },
  fen: {
    aspectRatio: 1059 / 1500,
    doubleSided: [/*100*/],
    ext: 'png'
  },
  kekasi: {
    aspectRatio: 958 / 1504,
    doubleSided: [11, 73],
    ext: 'jpg'
  }
} as const

const option = useLocalStorage<Options>('setting-option', 'kekasi')

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value > settings[option.value].aspectRatio)

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

const bravadoBeta = useLocalStorage('setting-bravado-beta', false)
const devilSatan = useLocalStorage('setting-devil-satan', false)
const gregalopeCE = useLocalStorage('setting-gregalope-ce', false)
const suffix = computed(() => {
  if (card.value === 38 && gregalopeCE.value) return '-ce'
  if (card.value === 78 && bravadoBeta.value) return '-beta'
  if (card.value === 85 && devilSatan.value) return '-devil'
  return ''
})

const ext = computed(() => settings[option.value].ext)
const frontSrc = computed(() => `/hunts/${option.value}/${option.value}-${card.value}${suffix.value}.${ext.value}`)
const showBackSrc = computed(() => `/hunts/${option.value}/${option.value}-${card.value}-back.${ext.value}`)
const backSrc = computed(() => `/hunts/${option.value}/${option.value}-back.${ext.value}`)
const isDoubleSided = computed(() => settings[option.value].doubleSided.includes(card.value))
function changeImages(type: Options) {
  option.value = type
  if (!isDoubleSided.value) {
    showBack.value = false
  }
}

const hasClicked = ref(false)
function flip() {
  hasClicked.value = true
  if (transitioning.value) return
  if (loading.value) return

  showCard.value = !showCard.value
  transitioning.value = true
  if (isDoubleSided.value && !showBack.value) {
    setTimeout(() => (showBack.value = true), duration)
  }
  setTimeout(() => (transitioning.value = false), duration)
}

function draw() {
  if (transitioning.value) return

  roll()

  showBack.value = false
  transitioning.value = true
  loading.value = true
  setTimeout(() => {
    showCard.value = false
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
  <div style="background-image: url('/img/stonefaces-bg.png')"
    class="font-kdm-text relative flex min-h-svh w-full select-none items-center justify-center overflow-hidden bg-stone-950 bg-[length:40%] bg-repeat [perspective:1000px]">
    <link rel="preload" :href="backSrc" as="image">
    <link rel="preload" :href="frontSrc" as="image">
    <link v-if="isDoubleSided" rel="preload" :href="showBackSrc" as="image">

    <div class="relative" :class="aspectRatio ? 'h-svh w-auto' : 'w-full max-h-full'"
      :style="`aspect-ratio:${settings[option].aspectRatio}`">
      <transition enter-active-class="animate-card-in" leave-active-class="animate-card-out">
        <div v-show="!loading" :key="card"
          class="absolute inset-0 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.3,1.4,0.6,1)] [transform-style:preserve-3d]"
          :class="{ '[transform:rotateY(180deg)]': showCard }" @click="flip">
          <img v-if="showBack" :src="showBackSrc"
            class="absolute inset-0 w-full h-full rounded-3xl [backface-visibility:hidden]" />
          <img v-else :src="backSrc" class="absolute inset-0 w-full h-full rounded-3xl [backface-visibility:hidden]" />
          <img :src="frontSrc" @load="stop"
            class="absolute inset-0 w-full h-full rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]" />
          <span v-if="!hasClicked"
            class="absolute w-10 h-10 border-4 border-white rounded-full opacity-0 pointer-events-none inset-1/2 animate-ripple"></span>
        </div>
      </transition>
    </div>

    <!-- Top right util icons -->
    <div class="absolute flex flex-col gap-1 right-1 top-1">
      <button @click.prevent="toggleFullscreen" title="Fullscreen"
        class="transition-opacity duration-1000 hover:duration-150 hover:opacity-90"
        :class="showCard || showBack ? 'opacity-10' : 'opacity-70'">
        <svg v-if="isFullscreen" width="5rem" height="5rem" fill="none" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff"
            d="M7 9.5c1.4 0 2.5-1.1 2.5-2.5V2.5c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1v4h-4a1 1 0 0 0-1 1v1c0 .6.4 1 1 1H7ZM17 9.5A2.5 2.5 0 0 1 14.5 7V2.5c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v4h4c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1H17ZM17 14.5a2.5 2.5 0 0 0-2.5 2.5v4.5c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4h4c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1H17ZM9.5 17c0-1.4-1.1-2.5-2.5-2.5H2.5a1 1 0 0 0-1 1v1c0 .6.4 1 1 1h4v4c0 .6.4 1 1 1h1c.6 0 1-.4 1-1V17Z" />
        </svg>
        <svg v-else width="5rem" height="5rem" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff"
            d="M4 1.5A2.5 2.5 0 0 0 1.5 4v4.5c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4h4c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1H4Zm16 0c1.4 0 2.5 1.1 2.5 2.5v4.5c0 .6-.4 1-1 1h-1a1 1 0 0 1-1-1v-4h-4a1 1 0 0 1-1-1v-1c0-.6.4-1 1-1H20Zm0 21c1.4 0 2.5-1.1 2.5-2.5v-4.5c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1v4h-4a1 1 0 0 0-1 1v1c0 .6.4 1 1 1H20ZM1.5 20c0 1.4 1.1 2.5 2.5 2.5h4.5c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1h-4v-4c0-.6-.4-1-1-1h-1a1 1 0 0 0-1 1V20Z" />
        </svg>
      </button>
      <button @click.prevent="showHelp = true" title="About &amp; Settings"
        class="transition-opacity duration-1000 hover:duration-150 hover:opacity-90"
        :class="showCard || showBack ? 'opacity-10' : 'opacity-70'">
        <svg width="5rem" height="5rem" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd"
            d="M1 12a11 11 0 1 1 22 0 11 11 0 0 1-22 0Zm9.3 1.4c-.07.31.2.6.55.6h2.2a.6.6 0 0 0 .56-.4 3 3 0 0 1 .64-.85l.7-.69c.93-.88 1.8-1.7 1.8-3.15 0-2.5-2.17-3.91-4.48-3.91-1.77 0-4.2.8-4.69 3.5-.1.55.37 1 .92 1h1.41c.53 0 .92-.42 1.1-.92.18-.47.53-.82 1.26-.82 1.34 0 1.34 1.46.56 2.42-.29.37-.63.69-.97 1-.68.65-1.35 1.28-1.56 2.21ZM14 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        </svg>
      </button>
    </div>

    <button
      class="absolute bottom-0 right-0 z-10 p-6 text-4xl font-bold text-center text-white transition-opacity duration-1000 shadow-lg select-none w-60 rounded-tl-[4rem] corner-squircle bg-slate-950 ring-2 ring-white hover:duration-150 hover:opacity-90"
      :class="showCard || showBack ? 'opacity-10' : 'opacity-70'" @click.prevent="draw" title="Draw random card">
      {{ loading ? 'Drawing...' : 'Random' }}
    </button>

    <!-- About popup -->
    <transition enter-active-class="animate-modal-in" leave-active-class="animate-modal-out">
      <div v-show="showHelp" @click="showHelp = false"
        class="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto cursor-pointer select-none bg-black/60">
        <dialog @click.stop
          class="relative flex flex-col p-6 text-3xl font-bold text-white shadow-lg cursor-auto rounded-3xl bg-slate-950/80 ring-2 ring-white/30">
          <div class="mb-3">Expansions:</div>
          <label for="setting-devilsatan" class="flex items-center gap-4 cursor-pointer group">
            <div class="items-center p-2 rounded-lg corner-squircle focus-within:bg-white/30 group-hover:bg-white/30">
              <input id="setting-devilsatan" type="checkbox" :checked="devilSatan"
                @input.stop="devilSatan = !devilSatan" class="sr-only peer" />
              <div
                class="peer relative h-7 w-7 border-[.2rem] border-white transition-colors after:absolute after:inset-[.2rem] after:origin-center after:scale-0 after:bg-white after:transition-transform peer-checked:after:scale-100">
              </div>
            </div>
            <div>Devil Satan</div>
          </label>
          <label for="setting-betabravado" class="flex items-center gap-4 cursor-pointer group">
            <div class="items-center p-2 rounded-lg corner-squircle focus-within:bg-white/30 group-hover:bg-white/30">
              <input id="setting-betabravado" type="checkbox" :checked="bravadoBeta"
                @input.stop="bravadoBeta = !bravadoBeta" class="sr-only peer" />
              <div
                class="peer relative h-7 w-7 border-[.2rem] border-white transition-colors after:absolute after:inset-[.2rem] after:origin-center after:scale-0 after:bg-white after:transition-transform peer-checked:after:scale-100">
              </div>
            </div>
            <div>Great Game Hunter - Bravado</div>
          </label>
          <label for="setting-gregalope" class="flex items-center gap-4 cursor-pointer group">
            <div class="items-center p-2 rounded-lg corner-squircle focus-within:bg-white/30 group-hover:bg-white/30">
              <input id="setting-gregalope" type="checkbox" :checked="gregalopeCE"
                @input.stop="gregalopeCE = !gregalopeCE" class="sr-only peer" />
              <div
                class="peer relative h-7 w-7 border-[.2rem] border-white transition-colors after:absolute after:inset-[.2rem] after:origin-center after:scale-0 after:bg-white after:transition-transform peer-checked:after:scale-100">
              </div>
            </div>
            <div>Gregalope CE (CCG Only)</div>
          </label>

          <div class="my-3">Card images by:</div>
          <label for="setting-fen" class="flex items-center cursor-pointer group">
            <div class="items-center p-2 rounded-lg corner-squircle focus-within:bg-white/30 group-hover:bg-white/30">
              <input id="setting-fen" type="checkbox" :checked="option === 'fen'" @input.stop="changeImages('fen')"
                class="sr-only peer" />
              <div
                class="peer relative h-7 w-7 border-[.2rem] border-white transition-colors after:absolute after:inset-[.2rem] after:origin-center after:scale-0 after:bg-white after:transition-transform peer-checked:after:scale-100">
              </div>
            </div>
            <div>Fen</div>
          </label>
          <div>
            <a class="underline" href="https://patreon.com/FenPaints">patreon.com/FenPaints</a>
          </div>
          <div class="leading-none text-center">&mdash; or &mdash;</div>
          <label for="setting-kekasi" class="flex items-center gap-4 cursor-pointer group">
            <div class="items-center p-2 rounded-lg corner-squircle focus-within:bg-white/30 group-hover:bg-white/30">
              <input id="setting-kekasi" type="checkbox" :checked="option === 'kekasi'"
                @input.stop="changeImages('kekasi')" class="sr-only peer" />
              <div
                class="peer relative h-7 w-7 border-[.2rem] border-white transition-colors after:absolute after:inset-[.2rem] after:origin-center after:scale-0 after:bg-white after:transition-transform peer-checked:after:scale-100">
              </div>
            </div>
            <div>Kekasi</div>
          </label>
          <div>
            <a class="underline" href="https://boardgamegeek.com/filepage/255740/kdm-15-hunt-event-reference-cards">
              boardgamegeek.com/filepage/255740
            </a>
          </div>
          <div class="leading-none text-center">&mdash; or &mdash;</div>
          <label for="setting-ccg" class="flex items-center gap-4 cursor-pointer group">
            <div class="items-center p-2 rounded-lg corner-squircle focus-within:bg-white/30 group-hover:bg-white/30">
              <input id="setting-ccg" type="checkbox" :checked="option === 'ccg'" @input.stop="changeImages('ccg')"
                class="sr-only peer" />
              <div
                class="peer relative h-7 w-7 border-[.2rem] border-white transition-colors after:absolute after:inset-[.2rem] after:origin-center after:scale-0 after:bg-white after:transition-transform peer-checked:after:scale-100">
              </div>
            </div>
            <div>Custom Content Group</div>
          </label>
          <div>
            <a class="underline"
              href="https://docs.google.com/spreadsheets/d/1hBB4sGEFVuzstsZvY0nyNlw1ocXa7y5wZNzCXJdAAwY/edit">
              CCG Release Overview
            </a>
          </div>

          <div class="mt-6">And thank you to Adam Poots Games!</div>
        </dialog>
      </div>
    </transition>

    <button
      class="fixed bottom-0 left-0 z-10 flex gap-8 p-4 overflow-hidden text-6xl font-bold text-center transition-opacity duration-1000 select-none font-kdm-text hover:duration-150 hover:opacity-90"
      :class="showCard || showBack ? 'opacity-10' : 'opacity-70'" @click.prevent="selectHunt" title="Select hunt event">
      <div
        class="relative w-16 h-16 text-black transition-transform duration-200 ease-in-out -rotate-45 bg-white border-2 border-white rounded-xl"
        :style="loading ? `--tw-rotate: -${(secondRand / 9) * 360}deg` : ''">
        <div v-if="loading" class="rotate-45" :class="{ 'font-kd-icon': firstRand === 0 }">
          {{ firstRand === 0 ? 'e' : firstRand }}
        </div>
        <div v-else class="rotate-45" :class="{ 'font-kd-icon': first === 0 }">{{ first === 0 ? 'e' : first }}</div>
      </div>
      <div
        class="relative w-16 h-16 text-white transition-transform duration-200 ease-in-out rotate-45 border-2 border-white rounded-xl bg-slate-950"
        :style="loading ? `--tw-rotate: ${(firstRand / 9) * 360}deg` : ''">
        <div v-if="loading" class="-rotate-45" :class="{ 'font-kd-icon': secondRand === 0 }">
          {{ secondRand === 0 ? 'e' : secondRand }}
        </div>
        <div v-else class="-rotate-45" :class="{ 'font-kd-icon': second === 0 }">{{ second === 0 ? 'e' : second }}</div>
      </div>
    </button>

    <transition enter-active-class="animate-modal-in" leave-active-class="animate-modal-out">
      <div v-show="showDialog" @click="showDialog = false"
        class="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto select-none bg-black/60">
        <dialog
          class="relative flex gap-8 p-10 text-5xl font-bold text-center shadow-lg rounded-2xl bg-slate-950/80 shadow-stone-950 ring-2 ring-white/30">
          <div class="absolute top-0 transition-transform duration-200 -left-7"
            :style="`transform:translateY(${2.6 + (first !== 0 ? first - 1 : 9) * 5.75}rem)`">
            <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="none" viewBox="0 0 24 24">
              <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd"
                d="M17.41 20.7a1 1 0 0 0 0-1.4L10.12 12l7.3-7.3a1 1 0 0 0 0-1.4l-.71-.71a1 1 0 0 0-1.42 0l-8.35 8.35a1.5 1.5 0 0 0 0 2.12l8.35 8.35a1 1 0 0 0 1.42 0l.7-.7Z" />
            </svg>
          </div>
          <div class="flex flex-col gap-7">
            <button v-for="i in 10" :key="i" @click.prevent.stop="click(10, i)" :title="'' + ((i % 10) * 10)"
              class="h-16 w-16 rotate-45 cursor-pointer rounded-xl border-[.2rem] border-white bg-white text-stone-950 transition-shadow duration-300 hover:shadow-[0_0_1.5rem_0.5rem_rgba(255,255,255,0.9),0_0_3rem_1.5rem_rgba(255,255,255,0.7)]"
              :class="{ 'animate-pulse shadow-[0_0_1rem_2px_rgba(255,255,255,0.7),0_0_2rem_0.5rem_rgba(255,255,255,0.5)]': first === i % 10 }">
              <div class="-rotate-45" :class="{ 'font-kd-icon': i === 10 }">{{ i === 10 ? 'e' : i }}</div>
            </button>
          </div>
          <div class="flex flex-col gap-7">
            <button v-for="i in 10" :key="i" @click.prevent.stop="click(1, i)" :title="'' + (i % 10)"
              class="h-16 w-16 rotate-45 cursor-pointer rounded-xl border-[.2rem] border-white bg-slate-950 text-white transition-shadow duration-300 hover:shadow-[0_0_1.5rem_0.5rem_rgba(255,255,255,0.9),0_0_3rem_1.5rem_rgba(255,255,255,0.7)]"
              :class="{ 'animate-pulse shadow-[0_0_1rem_2px_rgba(255,255,255,0.7),0_0_2rem_0.5rem_rgba(255,255,255,0.5)]': second === i % 10 }">
              <div class="-rotate-45" :class="{ 'font-kd-icon': i === 10 }">{{ i === 10 ? 'e' : i }}</div>
            </button>
          </div>
          <div class="absolute top-0 transition-transform duration-200 -right-7"
            :style="`transform:translateY(${2.6 + (second !== 0 ? second - 1 : 9) * 5.75}rem)`">
            <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="none" viewBox="0 0 24 24">
              <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd"
                d="M7.2 20.7a1 1 0 0 1 0-1.4l7.3-7.3-7.3-7.3a1 1 0 0 1 0-1.4l.71-.71a1 1 0 0 1 1.42 0l8.35 8.35a1.5 1.5 0 0 1 0 2.12l-8.35 8.35a1 1 0 0 1-1.42 0l-.7-.7Z" />
            </svg>
          </div>
        </dialog>
      </div>
    </transition>
  </div>
</template>
