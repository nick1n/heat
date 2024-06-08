<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import TicketCoin from '../components/Ticket/TicketCoin.vue'

onMounted(() => (document.documentElement.style.fontSize = '16px'))
onUnmounted(() => document.documentElement.style.removeProperty('font-size'))

const showLog = ref(false)
const logged = reactive<string[]>([])
function log(message: string) {
  logged.push(message)
}

const coins = ref<string>('')

const trains = ref<string>('')
const BONUSES = [16, 12, 9, 7, 6, 4, 4, 4, 2, 2, 2, 0] as const
const trainPoints = computed(() => BONUSES[parseInt(trains.value)] || 0)

const COMPANIES = ['Black', 'Blue', 'Green', 'Yellow', 'Red', 'White'] as const
const CLASSES = ['bg-gray-600', 'bg-blue-500', 'bg-green-500', 'bg-yellow-300', 'bg-red-500', 'bg-white'] as const
const TIERS = [20, 15, 10, 5] as const
const shares = reactive([0, 0, 0, 0, 0, 0])
const shareSum = computed(() => shares.reduce((a, b) => a + b, 0))

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

let id = 0
function getId() {
  return id++
}

type Ticket = {
  id: number
  amt: number
}

const showTicketInput = ref(false)
const tickets = reactive<Ticket[]>([])
const ticketSum = computed(() => tickets.reduce((a, b) => a + b.amt, 0))
const positive = ref(true)

function addTicket(amt: number) {
  if (positive.value) {
    tickets.push({ id: getId(), amt })
    log('Added Completed Ticket for $' + amt)
  } else {
    tickets.push({ id: getId(), amt: -amt })
    log('Added Incomplete Ticket for -$' + amt)
  }
}

function removeTicket(event: MouseEvent, i: number) {
  if (tickets[i].amt < 0) {
    log('Removed Incomplete Ticket for -$' + -tickets[i].amt)
  } else {
    log('Removed Completed Ticket for $' + tickets[i].amt)
  }

  const target = event.currentTarget as HTMLDivElement
  target.classList.add('opacity-0')
  setTimeout(() => tickets.splice(i, 1), 150)
}

const total = computed(() => (+coins.value || 0) + trainPoints.value + ticketSum.value + shareSum.value)

function onlyNumber(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}

function reset() {
  coins.value = ''
  trains.value = ''
  tickets.length = 0
  shares.fill(0)
  logged.length = 0
}

const showBonus = ref(false)
</script>

<template>
  <div class="ticket-serif min-h-svh bg-orange-50 text-center font-bold text-gray-800">
    <div class="px-2" :class="{ 'blur-sm': showBonus || showTicketInput }">
      <div class="py-2 text-center font-sans text-2xl">
        <span class="text-red-800" style="font-variant: small-caps">Ticket to Ride</span> <span class="text-blue-800">1901</span>
        <div class="ticket-serif">Scoring Sheet</div>
      </div>

      <div class="mb-2 flex items-center gap-1">
        <div class="flex-grow border-b-2 border-orange-600"></div>
        <div class="relative overflow-hidden whitespace-nowrap text-2xl">
          <div class="border-2 border-orange-600 px-3 py-2">
            Total <span class="inline-block border-[.5rem] border-r-0 border-gray-400 border-b-transparent border-t-transparent"></span> {{ total }}
          </div>
          <div class="absolute -left-2 -top-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
          <div class="absolute -bottom-2 -left-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
          <div class="absolute -right-2 -top-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
          <div class="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
        </div>
        <div class="flex-grow border-b-2 border-orange-600"></div>
      </div>

      <div class="mb-2 grid grid-cols-3 items-center justify-center gap-2 text-xl">
        <div class="text-right">Coins in Hand</div>
        <div>
          <input
            v-model="coins"
            @keypress="onlyNumber"
            type="number"
            inputmode="numeric"
            maxlength="3"
            min="0"
            max="999"
            pattern="[0-9]*"
            class="h-16 w-20 rounded-lg border-2 border-gray-50 bg-white p-1 text-center"
          />
        </div>
        <div></div>
        <div class="cursor-pointer text-right" @click="showBonus = true"><span class="text-lg font-normal text-gray-400">ⓘ</span> Trains<br />Remaining</div>
        <div>
          <input
            v-model="trains"
            @keypress="onlyNumber"
            type="number"
            inputmode="numeric"
            maxlength="2"
            min="0"
            max="99"
            pattern="[0-9]*"
            class="h-16 w-20 rounded-lg border-2 border-gray-50 bg-white p-1 text-center"
          />
        </div>
        <div>
          <div class="relative h-12 w-12" :class="{ hidden: trains === null || trains === '' }">
            <TicketCoin :amt="trainPoints" :pos="trainPoints !== 0" />
          </div>
        </div>
        <div class="text-right">Tickets</div>
        <div>
          <button class="h-16 w-20 rounded-lg border-2 border-gray-50 bg-white p-1" @click="showTicketInput = true">{{ ticketSum }}</button>
        </div>
      </div>

      <div class="grid grid-cols-3 items-center text-xl">
        <div class="border-b-2 border-orange-200"></div>
        <div>Shares</div>
        <div class="border-b-2 border-orange-200"></div>
      </div>
      <div class="grid grid-cols-4 gap-1 text-lg">
        <div>1<sup>st</sup></div>
        <div>2<sup>nd</sup></div>
        <div>3<sup>rd</sup></div>
        <div>4<sup>th</sup></div>
      </div>
      <div v-for="(company, ci) in COMPANIES" :key="company" class="-mx-2 grid grid-cols-4 items-center gap-1 whitespace-pre-wrap p-1 px-2" :class="CLASSES[ci]">
        <button
          v-for="(amt, ti) in TIERS"
          :key="company + amt"
          class="rounded-lg border-2 p-1 active:bg-green-400"
          :class="{ 'bg-green-300 border-green-600 hover:bg-green-200': shares[ci] === amt, 'border-gray-100/50 hover:bg-gray-100/50': shares[ci] !== amt }"
          @click="handleShare(ci, amt, ti)"
        >
          <div class="relative mx-auto h-12 w-12">
            <TicketCoin :amt="amt" :pos="shares[ci] === amt" />
          </div>
        </button>
      </div>

      <div class="my-2 flex items-center gap-1">
        <div class="flex-grow border-b-2 border-orange-600"></div>
        <div class="relative overflow-hidden whitespace-nowrap text-2xl">
          <div class="border-2 border-orange-600 px-3 py-2">
            Total <span class="inline-block border-[.5rem] border-r-0 border-gray-400 border-b-transparent border-t-transparent"></span> {{ total }}
          </div>
          <div class="absolute -left-2 -top-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
          <div class="absolute -bottom-2 -left-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
          <div class="absolute -right-2 -top-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
          <div class="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-2 border-orange-600 bg-orange-50"></div>
        </div>
        <div class="flex-grow border-b-2 border-orange-600"></div>
      </div>

      <div class="mt-4 pb-2 text-left font-normal">
        <div class="flex justify-between">
          <button class="rounded-lg border-2 border-white p-1 px-2" @click="showLog = !showLog">Show Log</button>
          <button class="rounded-lg border-2 border-white p-1 px-2" @click="reset">Reset</button>
        </div>
        <div :class="{ hidden: !showLog }">
          <div v-for="(message, i) in logged" :key="i">{{ message }}</div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 top-0 cursor-pointer" :class="{ hidden: !showTicketInput }" @click="showTicketInput = false"></div>

    <div class="fixed bottom-0 left-0 right-0 border-t-2 border-orange-600 bg-slate-100 p-1 text-xl transition-transform" :class="{ 'translate-y-full': !showTicketInput }">
      <div class="grid grid-cols-5 gap-1">
        <button
          v-for="({ id, amt }, i) in tickets"
          :key="id"
          class="rounded-lg border-2 border-gray-50 p-1 transition-opacity"
          :class="{ 'bg-green-200 hover:bg-green-300 active:bg-green-400': amt > 0, 'bg-red-200 hover:bg-red-300 active:bg-red-400': amt < 0 }"
          @click="removeTicket($event, i)"
        >
          <div class="relative mx-auto h-12 w-12">
            <TicketCoin :amt="Math.abs(amt)" :pos="amt > 0" :neg="amt < 0" />
          </div>
        </button>
      </div>

      <div class="-mx-1 flex items-center gap-1">
        <div class="flex-grow border-b-2 border-orange-600"></div>
        <div class="">Ticket Total: {{ ticketSum }}</div>
        <div class="flex-grow border-b-2 border-orange-600"></div>
      </div>

      <div class="grid grid-cols-5 gap-1">
        <button
          v-for="(amt, i) in 23"
          :key="i"
          class="relative rounded-lg border-2 border-gray-50 p-1"
          :class="{ 'bg-green-200 hover:bg-green-300 active:bg-green-400': positive, 'bg-red-200 hover:bg-red-300 active:bg-red-400': !positive }"
          @click="addTicket(amt)"
        >
          <TicketCoin :amt="amt" />
        </button>
        <button v-if="!positive" class="rounded-lg border-2 border-green-50 bg-green-200 p-1 text-3xl leading-4 hover:bg-green-300 active:bg-green-400" @click="positive = true">
          ➕
        </button>
        <button v-else class="rounded-lg border-2 border-red-50 bg-red-200 p-1 text-3xl leading-4 hover:bg-red-300 active:bg-red-400" @click="positive = false">➖</button>
        <button
          class="rounded-lg border-2 border-gray-50 bg-gray-200 p-1 text-2xl font-normal leading-4 text-black hover:bg-gray-300 active:bg-gray-400"
          @click="showTicketInput = false"
        >
          Done
        </button>
      </div>
    </div>

    <dia class="fixed bottom-0 left-0 right-0 top-0 grid cursor-pointer items-center" :class="{ hidden: !showBonus }" @click="showBonus = false">
      <div class="mx-auto border-2 border-orange-600 bg-white p-1">
        <div class="whitespace-nowrap border-4 border-t-0 border-gray-600">
          <div class="grid grid-cols-2 bg-gray-600 text-xl leading-loose text-white">
            <div>Trains Left</div>
            <div>Dollars Earned</div>
          </div>
          <div class="grid grid-cols-5 items-center justify-around gap-1 bg-slate-100 p-1 text-3xl text-gray-600">
            <template v-for="(_, i) in 5" :key="i">
              <div></div>
              <div>{{ i }}</div>
              <div class="relative mx-auto h-2 w-12 overflow-hidden">
                <div class="absolute -left-1 h-2 w-screen border-2 border-gray-300"></div>
              </div>
              <div>
                <TicketCoin :amt="BONUSES[i]" />
              </div>
              <div></div>
            </template>
            <div></div>
            <div>5-7</div>
            <div class="relative mx-auto h-2 w-12 overflow-hidden">
              <div class="absolute -left-1 h-2 w-screen border-2 border-gray-300"></div>
            </div>
            <div>
              <TicketCoin :amt="4" />
            </div>
            <div></div>
            <div></div>
            <div>8-10</div>
            <div class="relative mx-auto h-2 w-12 overflow-hidden">
              <div class="absolute -left-1 h-2 w-screen border-2 border-gray-300"></div>
            </div>
            <div>
              <TicketCoin :amt="2" />
            </div>
            <div></div>
            <div></div>
            <div>11+</div>
            <div class="relative mx-auto h-2 w-12 overflow-hidden">
              <div class="absolute -left-1 h-2 w-screen border-2 border-gray-300"></div>
            </div>
            <div>0</div>
          </div>
        </div>
      </div>
    </dia>
  </div>
</template>

<style>
.ticket-serif {
  font-family: Cambria, 'Times New Roman', Times, serif;
}
</style>
