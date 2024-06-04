<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const showLog = ref(false)

const logged = reactive<string[]>([])
function log(message: string) {
  logged.push(message)
}

const coins = ref(null)

const trains = ref(null)
const trainPoints = computed(() => {
  if (trains.value === null) {
    return 0
  } else if (trains.value === 0) {
    return 16
  } else if (trains.value === 1) {
    return 12
  } else if (trains.value === 2) {
    return 9
  } else if (trains.value === 3) {
    return 7
  } else if (trains.value === 4) {
    return 6
  } else if (trains.value >= 5 && trains.value <= 7) {
    return 4
  } else if (trains.value >= 8 && trains.value <= 10) {
    return 2
  }
  return 0
})

const COMPANIES = ['Black', 'Blue', 'Green', 'Yellow', 'Red', 'White'] as const
const TIERS = [20, 15, 10, 5]
const shares = reactive([0, 0, 0, 0, 0, 0])
const shareSum = computed(() => sum(shares))

function handleShare(ci: number, amt: number, ti: number) {
  if (shares[ci] === amt) {
    shares[ci] = 0
    log('Removed ' + COMPANIES[ci] + ' Shares #' + (ti + 1) + ' for $' + amt)
  } else {
    if (shares[ci] === 0) {
      log('Added ' + COMPANIES[ci] + ' Shares #' + (ti + 1) + ' for $' + amt)
    } else {
      log('Changed ' + COMPANIES[ci] + ' Shares to #' + (ti + 1) + ' for $' + amt)
    }
    shares[ci] = amt
  }
}

const showTicketInput = ref(false)
const tickets = reactive<number[]>([])
const ticketSum = computed(() => sum(tickets))
const positive = ref(true)

function addTicket(amt: number) {
  if (positive.value) {
    tickets.push(amt)
    log('Added Completed Ticket for $' + amt)
  } else {
    tickets.push(-amt)
    log('Added Incomplete Ticket for -$' + amt)
  }
}

function removeTicket(event: MouseEvent, i: number) {
  if (tickets[i] < 0) {
    log('Removed Incomplete Ticket for -$' + -tickets[i])
  } else {
    log('Removed Completed Ticket for $' + tickets[i])
  }

  const target = event.currentTarget as HTMLDivElement
  target.classList.add('opacity-0')
  setTimeout(() => tickets.splice(i, 1), 150)
}

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0)
}

const total = computed(() => (coins.value || 0) + trainPoints.value + ticketSum.value + shareSum.value)

function onlyNumber(event: KeyboardEvent) {
  console.log(event.key)
  if (!/\d/.test(event.key)) {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="bg-orange-100 text-center font-serif font-bold">
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

    <div class="mb-2 text-xl">Total: {{ total }}</div>

    <div class="mb-2 grid grid-cols-5">
      <div>Coins in Hand</div>
      <input
        v-model="coins"
        @keypress="onlyNumber"
        type="number"
        inputmode="numeric"
        maxlength="3"
        min="0"
        max="999"
        pattern="[0-9]*"
        class="w-16 rounded-lg border-2 border-gray-50 p-1 text-center"
      />
    </div>
    <div class="mb-2 grid grid-cols-5">
      <div>Trains Left</div>
      <input
        v-model="trains"
        @keypress="onlyNumber"
        type="number"
        inputmode="numeric"
        maxlength="2"
        min="0"
        max="99"
        pattern="[0-9]*"
        class="w-16 rounded-lg border-2 border-gray-50 p-1 text-center"
      />
      <div>${{ trainPoints }}</div>
    </div>
    <div class="grid grid-cols-5">
      <div>Tickets</div>
      <button class="w-16 rounded-lg border-2 border-gray-50 p-1" @click="showTicketInput = true">{{ ticketSum }}</button>
    </div>

    <div>Shares ${{ shareSum }}</div>
    <div class="mb-2 grid grid-cols-5 gap-2">
      <div></div>
      <div>1st</div>
      <div>2nd</div>
      <div>3rd</div>
      <div>4th</div>
    </div>
    <div v-for="(company, ci) in COMPANIES" :key="company" class="mb-2 grid grid-cols-5 gap-2">
      <div>{{ company }}</div>
      <button
        v-for="(amt, ti) in TIERS"
        :key="company + amt"
        class="relative rounded-lg border-2 border-gray-50 p-1 hover:bg-green-300 active:bg-green-400"
        :class="{ 'bg-green-200': shares[ci] === amt }"
        @click="handleShare(ci, amt, ti)"
      >
        <div class="coin"><span>$</span>{{ amt }}</div>
        <div v-if="shares[ci] === amt" class="absolute left-1 top-1 text-base">➕</div>
      </button>
    </div>

    <div class="w-full p-2 text-left">
      <button class="rounded-lg border-2 border-gray-50 p-1" @click="showLog = !showLog">Show Log</button>
      <div :class="{ hidden: showLog }">
        <div v-for="(message, i) in logged" :key="i">{{ message }}</div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-slate-100 p-2 text-xl transition-transform" :class="{ 'translate-y-full': !showTicketInput }">
      <div class="grid grid-cols-5 gap-2">
        <button
          v-for="(amt, i) in tickets"
          :key="i + '-' + amt"
          class="relative rounded-lg border-2 border-gray-50 p-1 transition-opacity"
          :class="{ 'bg-green-200 hover:bg-green-300 active:bg-green-400': amt > 0, 'bg-red-200 hover:bg-red-300 active:bg-red-400': amt < 0 }"
          @click="removeTicket($event, i)"
        >
          <div class="coin"><span>$</span>{{ Math.abs(amt) }}</div>
          <div v-if="amt > 0" class="absolute left-1 top-1 text-base">➕</div>
          <div v-else class="absolute left-1 top-1 text-base">➖</div>
        </button>
      </div>
      <div>Ticket Total: {{ ticketSum }}</div>
      <div class="grid grid-cols-5 gap-2">
        <button
          v-for="(amt, i) in 23"
          :key="i + '-' + amt"
          class="relative rounded-lg border-2 border-gray-50 p-1"
          :class="{ 'bg-green-200 hover:bg-green-300 active:bg-green-400': positive, 'bg-red-200 hover:bg-red-300 active:bg-red-400': !positive }"
          @click="addTicket(amt)"
        >
          <div class="coin"><span>$</span>{{ amt }}</div>
        </button>
        <button v-if="!positive" class="rounded-lg border-2 border-green-50 bg-green-200 p-1 text-3xl leading-4 hover:bg-green-300 active:bg-green-400" @click="positive = true">
          ➕
        </button>
        <button v-else class="rounded-lg border-2 border-red-50 bg-red-200 p-1 text-3xl leading-4 hover:bg-red-300 active:bg-red-400" @click="positive = false">➖</button>
        <button
          class="text-shadow rounded-lg border-2 border-gray-50 bg-gray-200 p-1 text-2xl font-normal leading-4 text-white hover:bg-gray-300 active:bg-gray-400"
          @click="showTicketInput = false"
        >
          Done
        </button>
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
