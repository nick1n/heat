<script setup lang="ts">
const { amt, pos, neg } = defineProps<{ amt: number; pos?: boolean; neg?: boolean }>()
</script>

<template>
  <div class="ticket-coin"><span>$</span>{{ amt }}</div>
  <div v-if="pos" class="absolute -left-1 top-0 text-base">➕</div>
  <div v-if="neg" class="absolute -left-1 top-0 text-base">➖</div>
</template>

<style>
.ticket-coin {
  position: relative;
  border: 1px #b79541 solid;
  border-color: linear-gradient(-125deg, #e8cf76 0%, #865b0c 100%);
  border-radius: 100%;
  background: #865b0c;
  background: linear-gradient(125deg, #e8cf76 0%, #865b0c 100%);
  color: #fff;
  text-shadow:
    0 0 1px #000,
    0 0 2px #000,
    0 0 3px #000;
  box-shadow:
    inset 1px 1px 0 1px #865b0c,
    inset -1px -1px 0 1px #e8cf76;
  height: 3rem;
  width: 3rem;
  font-size: 2rem;
  font-weight: 400;
  font-family: Cambria, 'Times New Roman', Times, serif;
  margin: 0 auto;
  line-height: 2.7rem;
  letter-spacing: -0.2rem;
  padding-right: 0.2rem;
  text-align: center;
}

.ticket-coin > span {
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  font-size: 0.8rem;
  letter-spacing: 0;
}
/*
.text-shadow {
  text-shadow:
    0 0 1px #000,
    0 0 2px #000,
    0 0 3px #000;
}
*/
</style>
