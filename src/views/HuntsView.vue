<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { onMounted, ref } from 'vue';

useTitle('KD:M Hunt Events')

const card = ref(0)
const showCard = ref(false)
const showBack = ref(false)

const transitioning = ref(false)
const loading = ref(true)
const duration = 500 as const

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

onMounted(randomCard)
</script>

<template>
  <div class="flex min-h-svh w-svw items-center justify-center overflow-hidden bg-stone-950 [perspective:1000px]">
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
    <button
      class="absolute bottom-0 right-0 w-64 rounded-tl-2xl border-l-2 border-t-2 border-white bg-slate-950/50 p-6 text-center font-serif text-4xl font-bold text-white"
      @click.prevent="draw">{{ loading ? 'Drawing...' : 'Draw' }}</button>
  </div>
</template>
