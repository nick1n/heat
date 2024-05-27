<script setup lang="ts">
// import IconText from '../components/IconText.vue'
</script>

<template>
  <div class="border-[2vmin] border-[#AE995B] p-[2vmin] pt-0 font-serif">
    <h2 class="text-center text-[10vmin]">Legend of Symbols</h2>
    <div class="grid gap-[2vmin] text-[5.8vmin]">
      <div class="grid grid-cols-2 gap-[2vmin]">
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/power.png" /></div>
          <div>Power</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/influence.png" /></div>
          <div>Influence</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/coin.png" /></div>
          <div>Coin</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/wealth.png" /></div>
          <div>Wealth</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/agenda.png" /></div>
          <div>Agenda</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/morale.png" /></div>
          <div>Morale</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/prestige.png" /></div>
          <div>Prestige</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/welfare.png" /></div>
          <div>Welfare</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/crave.png" /></div>
          <div>Crave</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/knowledge.png" /></div>
          <div>Knowledge</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/event.png" /></div>
          <div>Event</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/stability.png" /></div>
          <div>Stability</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/trigger.png" /></div>
          <div>Trigger</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/death.png" /></div>
          <div>King may die</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/envelope.png" /></div>
          <div>Envelope</div>
        </div>
        <div class="flex gap-[2vmin]">
          <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/sticker.png" /></div>
          <div>Add sticker</div>
        </div>
      </div>
      <div class="flex gap-[2vmin]">
        <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/sign.png" /></div>
        <div>Sign name of House</div>
      </div>
      <div class="flex gap-[2vmin]">
        <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/mark.png" /></div>
        <div>Mark each use</div>
      </div>
      <div class="flex gap-[2vmin]">
        <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/effect-one.png" /></div>
        <div>Effect one time, when gained</div>
      </div>
      <div class="flex gap-[2vmin]">
        <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/effect-each.png" /></div>
        <div>Effect at each game set-up</div>
      </div>
      <div class="flex gap-[2vmin]">
        <div class="flex h-[8vmin] w-[8vmin] items-center justify-center"><img class="max-h-full" src="/king/effect-when.png" /></div>
        <div>Effect when condition is met</div>
      </div>
    </div>
  </div>

  <div class="border-[2vmin] border-[#AE995B] p-[2vmin] pt-0 font-serif">
    <h2 class="text-center text-[10vmin]">Game round</h2>
    <h2 class="text-center text-[10vmin]">Phases</h2>
    <div class="grid gap-[2vmin] text-[5.8vmin]">
      <div><strong>Draw Dilemma Card</strong> (p. 15)</div>
      <div>Place <strong>Outcome Tokens</strong> (p. 16)</div>
      <div><strong>Vote</strong> of the Council (p. 16)</div>
      <div><strong>Vote Resolution</strong> (p. 20)</div>
      <div><strong>Dilemma Resolution</strong> (p. 23)</div>
      <div>Check for <strong>Game End</strong> (p. 29)</div>
      <div class="ml-[5.8vmin]">If king abdicates or dies, go to End of Game.</div>
      <div class="ml-[5.8vmin]">If not: next Round.</div>
    </div>
  </div>
</template>
