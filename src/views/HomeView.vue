<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="text-center">
    <div><RouterLink to="/ai" class="mt-8 inline-block border-b-2 border-rose-500 text-4xl">Heat: AI Bots</RouterLink></div>
    <div><RouterLink to="/king" class="mt-8 inline-block border-b-2 border-rose-500 text-4xl">The King's Dilemma</RouterLink></div>
    <div><RouterLink to="/ticket" class="mt-8 inline-block border-b-2 border-rose-500 text-4xl">Ticket to Ride Legacy: 1901</RouterLink></div>
  </main>
</template>
