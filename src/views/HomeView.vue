<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="text-center">
    <div><RouterLink to="/ai" class="mt-8 inline-block border-b-2 border-rose-500 text-6xl">Heat: Pedal to the Metal</RouterLink></div>
    <div><RouterLink to="/king" class="u mt-8 inline-block border-b-2 border-rose-500 text-6xl">The King's Dilemma</RouterLink></div>
    <div><RouterLink to="/monster" class="u mt-8 inline-block border-b-2 border-rose-500 text-6xl">Kingdom Death: Monster</RouterLink></div>
    <div><RouterLink to="/showdown" class="u mt-8 inline-block border-b-2 border-rose-500 text-6xl">Showdown</RouterLink></div>
    <div>
      <RouterLink to="/ticket" class="mt-8 inline-block border-b-2 border-rose-500 text-6xl font-bold">
        <span class="text-red-800" style="font-variant: small-caps">Ticket to Ride</span> <span class="text-blue-800">1901</span>
      </RouterLink>
    </div>
  </main>
</template>
