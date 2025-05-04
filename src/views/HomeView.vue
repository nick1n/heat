<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="text-center text-4xl">
    <h1 class="mt-8">Game Aids:</h1>
    <div>
      <RouterLink to="/ai" class="inline-block border-b-2 border-rose-500">
        Heat: Pedal to the Metal AI
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/showdown" class="inline-block border-b-2 border-rose-500">KD:M Showdown</RouterLink>
    </div>
    <div>
      <RouterLink to="/hunts" class="inline-block border-b-2 border-rose-500">KD:M Hunt Events</RouterLink>
    </div>
    <h1 class="mt-8">Reference Cards:</h1>
    <div>
      <RouterLink to="/king" class="inline-block border-b-2 border-rose-500">
        The King's Dilemma (Mobile)
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/king-print" class="inline-block border-b-2 border-rose-500">
        The King's Dilemma (Printable)
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/monster" class="inline-block border-b-2 border-rose-500">
        Kingdom Death: Monster
      </RouterLink>
    </div>
    <h1 class="mt-8">Score Cards:</h1>
    <div>
      <RouterLink to="/ticket" class="inline-block border-b-2 border-rose-500 font-bold">
        <span class="text-red-800" style="font-variant: small-caps">Ticket to Ride</span>
        {{ ' ' }}
        <span class="text-blue-800">1901</span>
      </RouterLink>
    </div>
  </main>
</template>
