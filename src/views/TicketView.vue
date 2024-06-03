<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const tickets = reactive<number[]>([])
const ticketSum = computed(() => tickets.reduce((a, b) => a + b, 0))
const positive = ref(true)

function addTicket(amt: number) {
  if (positive.value) {
    tickets.push(amt)
  } else {
    tickets.push(-amt)
  }
}

function removeTicket(i: number) {
  tickets.splice(i, 1)
}
</script>

<template>
  <div class="text-center font-serif font-bold">
    <div class="grid grid-cols-2">
      <div class="grid grid-cols-2">
        <div>Trains Left</div>
        <div>Dollars Earned</div>
        <div>0</div>
        <div>16</div>
        <div>1</div>
        <div>12</div>
        <div>2</div>
        <div>9</div>
        <div>3</div>
        <div>7</div>
        <div>4</div>
        <div>6</div>
        <div>5-7</div>
        <div>4</div>
        <div>8-10</div>
        <div>2</div>
        <div>11+</div>
        <div>0</div>
      </div>
      <div>
        <div>Shares</div>
        <div class="grid grid-cols-2">
          <div>Trains Left</div>
          <div>Dollars Earned</div>
          <div>1st</div>
          <div>20</div>
          <div>2nd</div>
          <div>15</div>
          <div>3rd</div>
          <div>10</div>
          <div>4th</div>
          <div>5</div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0">
      <div class="grid grid-cols-5 gap-2 p-2 text-xl">
        <button
          v-for="(amt, i) in tickets"
          :key="i + '-' + amt"
          class="relative rounded-lg border-2 border-gray-200 p-1 hover:bg-gray-50 active:bg-gray-300"
          @click="removeTicket(i)"
        >
          <div class="coin"><span>$</span>{{ Math.abs(amt) }}</div>
          <div v-if="amt > 0" class="absolute left-1 top-1 text-base">➕</div>
          <div v-else class="absolute left-1 top-1 text-base">➖</div>
        </button>
      </div>
      <div>Tickets: {{ ticketSum }}</div>
      <div class="grid grid-cols-5 gap-2 bg-slate-100 p-2 text-xl">
        <button v-for="(amt, i) in 23" :key="i + '-' + amt" class="rounded-lg border-2 border-gray-50 p-1 hover:bg-gray-50 active:bg-gray-300" @click="addTicket(amt)">
          <div class="coin"><span>$</span>{{ amt }}</div>
        </button>
        <button v-if="positive" class="rounded-lg border-2 border-green-50 bg-green-400 p-1 text-3xl leading-4 hover:bg-green-500 active:bg-green-600" @click="positive = false">
          ➕
        </button>
        <button v-else class="rounded-lg border-2 border-red-50 bg-red-400 p-1 text-3xl leading-4 hover:bg-red-500 active:bg-red-600" @click="positive = true">➖</button>
        <button class="text-shadow rounded-lg border-2 border-gray-50 bg-gray-400 p-1 text-2xl font-normal leading-4 text-white hover:bg-gray-500 active:bg-gray-600">Done</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
html {
  font-size: 2.2vmin;
  font-family: Cambria, 'Times New Roman', Times, serif;
}

.coin {
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
    inset -1px -1px 0 1px #e8cf76,
    inset 1px 1px 0 1px #865b0c;
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

.coin > span {
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  font-size: 0.8rem;
  letter-spacing: 0;
}

.text-shadow {
  text-shadow:
    0 0 1px #000,
    0 0 2px #000,
    0 0 3px #000;
}
</style>
