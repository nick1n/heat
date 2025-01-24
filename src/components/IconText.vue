<script setup lang="ts">
const { icon } = defineProps<{
  icon: string
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" :src="`/king/${icon}.png`" /></div>
    <div><slot /></div>
  </div>
</template>
