<script setup lang="ts">
import { computed } from 'vue';
import type { Attributes } from './types';
import { useKdmStore } from '@/stores/kdm';

const { base, mod, attr, justBase = false, bottomBorder = false } = defineProps<{
  base: number;
  mod: number;
  attr: keyof Attributes;
  justBase?: boolean;
  bottomBorder?: boolean;
}>()

const emit = defineEmits(['click'])

const store = useKdmStore()

const def = computed(() => attr === 'movement' ? 5 : 0)
const ICONS: { [k in keyof Attributes]: string } = {
  acc: '🎯',
  eva: '💨',
  hp: '🩸',
  luck: '🍀',
  movement: '🦶',
  speed: '🎲',
  str: '💪',
  toughness: '🛡',
} as const

const capitalize = (x: string) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
const title = computed(() => capitalize(attr))
</script>

<template>
  <button @click.prevent="emit('click')" :title
    class="relative inline-block cursor-pointer border-stone-800 px-2 leading-normal first:rounded-tl-lg last:rounded-tr-lg last:border-r-0 hover:bg-neutral-900"
    :class="[attr === 'movement' || attr === 'eva' ? 'bg-slate-950' : 'bg-stone-950', bottomBorder ? 'border-b-2' : 'border-r-2']">
    <div class="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center"
      :class="[store.settings.showMods ? 'text-5xl' : 'text-3xl', attr === 'hp' ? 'opacity-10' : 'opacity-5']">
      {{ ICONS[attr] }}
    </div>
    <div class="relative z-10">
      <template v-if="justBase">
        <span :class="base === def ? 'text-stone-800' : ''">{{ base }}</span>
      </template>
      <template v-else-if="store.settings.showMods">
        <span :class="base === def ? 'text-stone-800' : ''">{{ base }}</span>
        <span :class="base === def || mod === 0 ? 'text-stone-800' : ''" v-if="mod >= 0">+</span>
        <span :class="mod === 0 ? 'text-stone-800' : ''">{{ mod }}</span>
      </template>
      <template v-else>
        <span :class="base + mod === def ? 'text-stone-800' : ''">{{ base + mod }}</span>
      </template>
    </div>
  </button>
</template>
