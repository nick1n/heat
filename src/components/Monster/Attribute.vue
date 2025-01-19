<script setup lang="ts">
const { def = 0, base, mod, showMods, class: clazz } = defineProps<{
  def?: number;
  base: number;
  mod: number;
  showMods: boolean;
  class?: string;
}>()
const emit = defineEmits(['click'])
</script>

<template>
  <span @click="emit('click')"
    class="inline-block cursor-pointer border-r-2 border-stone-700 px-2 leading-normal first:rounded-tl-lg last:rounded-tr-lg last:border-0 hover:bg-neutral-900"
    :class="clazz">
    <template v-if="showMods">
      <span :class="base === def ? 'text-stone-800' : ''">{{ base }}</span>
      <span :class="base === def || mod === 0 ? 'text-stone-800' : ''" v-if="mod >= 0">+</span>
      <span :class="mod === 0 ? 'text-stone-800' : ''">{{ mod }}</span>
    </template>
    <template v-else>
      <span :class="base + mod === def ? 'text-stone-800' : ''">{{ base + mod }}</span>
    </template>
  </span>
</template>
