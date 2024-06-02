<script setup lang="ts">
// import IconText from '../components/IconText.vue'
import { ref } from 'vue'

const cardPhases = ref(false)
const cardVote = ref(false)
const cardResolution = ref(true)
const cardEnd = ref(true)
const cardScore = ref(true)
const cardSetup = ref(true)
const cardLegacy = ref(true)

function handleAnchor(event: MouseEvent) {
  const target = event.target as HTMLAnchorElement
  const el = document.getElementById(target.href)
  if (el) {
    setTimeout(() => window.scrollTo(0, el.offsetTop))
  }
  event.preventDefault()
}
</script>

<template>
  <div class="font-serif text-4xl leading-normal">
    <div class="border-[1rem] border-[#AE995B] p-4 pt-0">
      <h2 class="text-center text-7xl leading-normal">Legend of Symbols</h2>
      <div class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/leader.png" /></div>
            <div>Leader</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/moderator.png" /></div>
            <div>Moderator</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/influence.png" /></div>
            <div>Influence</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/power.png" /></div>
            <div>Power</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/wealth.png" /></div>
            <div>Wealth</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/coin.png" /></div>
            <div>Coin</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/morale.png" /></div>
            <div>Morale</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/agenda.png" /></div>
            <div>Agenda</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/welfare.png" /></div>
            <div>Welfare</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/prestige.png" /></div>
            <div>Prestige</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/knowledge.png" /></div>
            <div>Knowledge</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/crave.png" /></div>
            <div>Crave</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/stability.png" /></div>
            <div>Stability</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/death.png" /></div>
            <div>King may die</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/trigger.png" /></div>
            <div>Trigger</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/envelope.png" /></div>
            <div>Envelope</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/event.png" /></div>
            <div>Event</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/sticker.png" /></div>
            <div>Add sticker</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/chronicle.png" /></div>
          <div>Chronicle Sticker</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/sign.png" /></div>
          <div>Sign name of House</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/mark.png" /></div>
          <div>Mark each use</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/achievements.png" /></div>
          <div>House Achievements</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/effect-one.png" /></div>
          <div>Effect one time, when gained</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/effect-each.png" /></div>
          <div>Effect at each game setup</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/effect-when.png" /></div>
          <div>Effect when condition is met</div>
        </div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B]">
      <button class="w-full" @click="() => (cardPhases = !cardPhases)">
        <h2 class="text-center text-7xl leading-normal">Game round</h2>
        <h2 class="text-center text-5xl">Phases</h2>
      </button>
      <div class="grid gap-4 p-4 pt-0" :class="{ hidden: cardPhases }">
        <div><strong>Draw Dilemma Card</strong> (p. 15)</div>
        <div>Place <strong>Outcome Tokens</strong> (p. 16)</div>
        <div><strong>Vote</strong> of the Council (p. 16)</div>
        <div><strong>Vote Resolution</strong> (p. 20)</div>
        <div>
          <a href="#dilemma-resolution" @click="handleAnchor"><strong>Dilemma Resolution</strong></a> (p. 23)
        </div>
        <div>Check for <strong>Game End</strong> (p. 29)</div>
        <div class="ml-12">If king abdicates or dies, go to End of Game.</div>
        <div class="ml-12">If not: next Round.</div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B]">
      <button class="w-full" @click="() => (cardVote = !cardVote)">
        <h2 class="text-center text-5xl leading-normal">Vote of the Council (p. 16)</h2>
      </button>
      <div class="p-4 pt-0" :class="{ hidden: cardVote }">
        <div>Start at Leader. On your turn, either:</div>
        <div class="ml-6">Bid <img class="inline h-12 align-top" src="/king/power.png" /> on <strong>Aye</strong> or <strong>Nay</strong></div>
        <div class="ml-12">
          <em>If new high bid, seize <img class="inline h-12 align-top" src="/king/leader.png" /> Leader</em>
        </div>
        <div class="ml-6 hidden">
          Pass to become <img class="inline h-12 align-top" src="/king/moderator.png" /> <strong>Moderator</strong>; +1<img class="inline h-12 align-top" src="/king/coin.png" />
        </div>
        <div class="ml-12 hidden"><em>max. one player each vote</em></div>
        <div class="ml-6 hidden">Pass to <strong>Gather Power</strong>; +1<img class="inline h-12 align-top" src="/king/coin.png" /></div>
        <div class="ml-6">Pass to <strong>Gather Power</strong> and +1<img class="inline h-12 align-top" src="/king/coin.png" /></div>
        <div class="ml-12">
          <em>First to pass, become <img class="inline h-12 align-top" src="/king/moderator.png" /> Moderator</em>
        </div>
        <div>Choice cannot be changed later.</div>
        <div class="pl-6">May increase existing bid.</div>
        <div class="pl-6 -indent-6">Bargains are binding if <img class="inline h-12 align-top" src="/king/coin.png" /> exchanged.</div>
        <div class="pl-6 -indent-6">Continue around to latest Leader.</div>
        <div class="pl-6 -indent-6">
          Highest total <img class="inline h-12 align-top" src="/king/power.png" /> bid <strong>wins vote</strong> and takes Leader. <em>Moderator breaks ties</em>.
        </div>
        <div class="pl-6 -indent-6">All players who Gather Power now equally share <img class="inline h-12 align-top" src="/king/power.png" /> from Balance.</div>
        <div class="pl-6 -indent-6">Losing side reclaim all their <img class="inline h-12 align-top" src="/king/power.png" /> bid.</div>
        <div class="pl-6 -indent-6">Winning side spend all their <img class="inline h-12 align-top" src="/king/power.png" /> bid to Balance for future votes.</div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B]">
      <button class="w-full" @click="() => (cardResolution = !cardResolution)">
        <h2 id="dilemma-resolution" class="text-center text-5xl leading-normal">Dilemma Resolution (p. 23)</h2>
      </button>
      <div class="p-4 pt-0" :class="{ hidden: cardResolution }">
        <div>Turn Dilemma card over for Aye or Nay. Read the <strong>Outcome</strong>.</div>
        <div>Apply Realm <strong>changes</strong> (left to right):</div>
        <div class="ml-12">
          Resources
          <img class="mx-1 inline h-12 align-top" src="/king/influence.png" />
          <img class="mx-1 inline h-12 align-top" src="/king/wealth.png" />
          <img class="mx-1 inline h-12 align-top" src="/king/morale.png" />
          <img class="mx-1 inline h-12 align-top" src="/king/welfare.png" />
          <img class="mx-1 inline h-12 align-top" src="/king/knowledge.png" />
        </div>
        <div class="ml-12">Stability <img class="mx-1 inline h-12 align-top" src="/king/stability.png" /></div>
        <div class="ml-12">Momentum</div>
        <div>If a <img class="inline h-9 align-text-top" src="/king/sticker.png" /> Chronicle <strong>Sticker</strong>:</div>
        <div class="ml-12">Leader applies and <strong>signs</strong>.</div>
        <div>If an <img class="inline h-12 align-top" src="/king/envelope.png" /> <strong>Envelope</strong>:</div>
        <div class="ml-12"><strong>Open</strong> the Envelope.</div>
        <div class="ml-12"><strong>Read</strong> first Story Card.</div>
        <div class="ml-12">Leader signs <strong>card</strong>.</div>
        <div class="ml-12">Place card in <strong>Storyline</strong>.</div>
        <div class="ml-12"><strong>Shuffle</strong> others into deck.</div>
        <div>Place resolved Dilemma card on</div>
        <div><strong>Time Counter</strong>.</div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B]">
      <button class="w-full" @click="() => (cardEnd = !cardEnd)">
        <h2 class="text-center text-7xl leading-normal">End of Game</h2>
      </button>
      <div class="p-4 pt-0" :class="{ hidden: cardEnd }">
        <div>
          When king <img class="inline h-12 align-top" src="/king/stability.png" /> <strong>abdicates</strong> or <img class="inline h-12 align-top" src="/king/death.png" />
          {{ ' ' }}
          <strong>dies</strong>.
        </div>
        <div>
          <strong>Calculate <img class="inline h-12 align-top" src="/king/agenda.png" /> Scores</strong> (p. 30)
        </div>
        <div class="ml-6">Secret Agenda:</div>
        <div class="ml-12">Resources &amp; <img class="inline h-12 align-top" src="/king/coin.png" /> Ranking</div>
        <div class="ml-6">Open Agenda (±3 <img class="inline h-12 align-top" src="/king/agenda.png" />, ±1 <img class="inline h-12 align-top" src="/king/agenda.png" />)</div>
        <div class="ml-6">Power Majority (+2 <img class="inline h-12 align-top" src="/king/agenda.png" />, +1 <img class="inline h-12 align-top" src="/king/agenda.png" />)</div>
        <div><strong>Realm Chronicles</strong> (p. 33)</div>
        <div class="ml-6">Record each Ranking and Score.</div>
        <div class="ml-6">Gain <img class="inline h-12 align-top" src="/king/prestige.png" /> Prestige, <img class="inline h-12 align-top" src="/king/crave.png" /> Crave.</div>
        <div class="ml-6">1st rank House names next King.</div>
        <div><strong>House Achievements</strong> <img class="inline h-12 align-top" src="/king/achievements.png" /> (p. 34)</div>
        <div><strong>House Alignment</strong> (p. 34)</div>
        <div><strong>Save Game</strong> (p. 34)</div>
        <div class="ml-6">Secret Agenda + Vote cards</div>
        <div class="ml-6">Trash resolved cards</div>
        <div class="ml-6">Shuffle Trigger + Dilemma deck</div>
        <div class="ml-6">Event cards + Story cards</div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B] text-3xl leading-normal">
      <button class="w-full" @click="() => (cardScore = !cardScore)">
        <h2 class="text-center text-5xl leading-normal">Campaign Score (p. 33)</h2>
      </button>
      <div class="p-4 pt-0" :class="{ hidden: cardScore }">
        <div>
          Based on <img class="inline h-12 align-top" src="/king/agenda.png" /> rank, and how the King's reign ended, each House gains
          <img class="inline h-12 align-top" src="/king/prestige.png" />/<img class="inline h-12 align-top" src="/king/crave.png" />.
        </div>
        <table class="my-6 w-full text-center">
          <thead>
            <tr>
              <th class="border-r-2 border-gray-600 bg-gray-300 p-1 py-2 align-bottom font-normal" rowspan="2">
                <img class="mx-auto h-12 mix-blend-multiply" src="/king/agenda.png" />Rank
              </th>
              <th class="border-r-2 border-gray-600 bg-gray-300 p-1 py-2 align-bottom font-normal" rowspan="2">
                <img class="mx-auto h-12 mix-blend-multiply" src="/king/death.png" />King died
              </th>
              <th class="bg-gray-300 p-1 pt-2 font-normal" colspan="2">King abdicated</th>
            </tr>
            <tr>
              <th class="border-r-2 border-gray-600 bg-gray-300 p-1 pb-2 font-normal"><img class="inline h-12 align-top mix-blend-multiply" src="/king/stability.png" /> max</th>
              <th class="bg-gray-300 p-1 pb-2 font-normal"><img class="inline h-12 align-top mix-blend-multiply" src="/king/stability.png" /> min</th>
            </tr>
          </thead>
          <tbody class="text-4xl leading-normal">
            <tr>
              <td class="border-r-2 border-gray-600 p-1">1st</td>
              <td class="border-r-2 border-gray-600 p-1">+5<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="border-r-2 border-gray-600 p-1">+3<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="p-1">+3<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr>
              <td class="border-r-2 border-gray-600 p-1">2nd</td>
              <td class="border-r-2 border-gray-600 p-1">+4<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="border-r-2 border-gray-600 p-1">+2<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="p-1">+2<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr>
              <td class="border-r-2 border-gray-600 p-1">
                3rd
                <div class="-my-4 text-base">&amp;</div>
                4th
              </td>
              <td class="border-r-2 border-gray-600 p-1">
                +2<img class="inline h-12 align-top" src="/king/prestige.png" />+1<img class="inline h-12 align-top" src="/king/crave.png" />
              </td>
              <td class="border-r-2 border-gray-600 p-1">+1<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="p-1">+1<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr class="hidden">
              <td class="border-r-2 border-gray-600 p-1">4th</td>
              <td class="border-r-2 border-gray-600 p-1">
                +2<img class="inline h-12 align-top" src="/king/prestige.png" />+1<img class="inline h-12 align-top" src="/king/crave.png" />
              </td>
              <td class="border-r-2 border-gray-600 p-1">+1<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="p-1">+1<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr>
              <td class="border-r-2 border-gray-600 p-1">Last</td>
              <td class="border-r-2 border-gray-600 p-1">+2<img class="inline h-12 align-top" src="/king/crave.png" /></td>
              <td class="border-r-2 border-gray-600 p-1">+2<img class="inline h-12 align-top" src="/king/crave.png" /></td>
              <td class="p-1">+2<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-24 items-center justify-center"><img class="w-full" src="/king/prestige.png" /></div>
          <div>Prestige: the legacy of your House as a promoter of the Kingdom of Ankist.</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-24 items-center justify-center"><img class="w-full" src="/king/crave.png" /></div>
          <div>Crave: the legacy of your House in a struggle for power with other Houses.</div>
        </div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B]">
      <button class="w-full p-4 pt-0" @click="() => (cardSetup = !cardSetup)">
        <h2 class="text-center text-7xl leading-normal">Game Setup</h2>
        <h2 class="text-center text-5xl">Every game (p. 7)</h2>
      </button>
      <div class="p-4 pt-0" :class="{ hidden: cardSetup }">
        <div>Set up the <strong>Realm Board:</strong> (p. 7)</div>
        <div class="pl-6">For each <strong>Resource marker:</strong></div>
        <div class="pl-12">Flip to randomise its side.</div>
        <div class="pl-12">Place it on the middle position.</div>
        <div class="pl-6 -indent-6">Place the <img class="inline h-12 align-top" src="/king/stability.png" /> <strong>Stability marker</strong> on the middle position.</div>
        <div>Place 3 <img class="inline h-12 align-top" src="/king/power.png" /> <strong>Power</strong> on the Balance.</div>
        <div>For each player: (p. 8)</div>
        <div class="pl-6">Set up <strong>House screen</strong>.</div>
        <div class="pl-6">Place <strong>vote cards</strong> in front.</div>
        <div class="pl-6">
          Take 8 <img class="inline h-12 align-top" src="/king/power.png" /> <strong>Power</strong>, 10 <img class="inline h-12 align-top" src="/king/coin.png" />
          {{ ' ' }}
          <strong>Coin</strong>.
        </div>
        <div class="pl-12">Place behind screen.</div>
        <div>Player with highest <img class="inline h-12 align-top" src="/king/prestige.png" /> Prestige:</div>
        <div class="pl-6">Take <img class="inline h-12 align-top" src="/king/leader.png" /> <strong>Leader token</strong>. (p. 9)</div>
        <div>Player with lowest <img class="inline h-12 align-top" src="/king/prestige.png" /> Prestige:</div>
        <div class="pl-6">Take <img class="inline h-12 align-top" src="/king/moderator.png" /> <strong>Moderator token</strong>. (p. 9)</div>
        <div><img class="inline h-12 align-top" src="/king/agenda.png" /> <strong>Secret Agendas:</strong> (p. 8)</div>
        <div class="pl-6">Shuffle <strong>Secret Agenda</strong> cards.</div>
        <div class="pl-6">Remove 1 random card unseen.</div>
        <div class="pl-12 -indent-6">Each player, from lowest <img class="inline h-12 align-top" src="/king/prestige.png" /> Prestige to highest.</div>
        <div class="pl-12 -indent-6">Choose a <strong>Secret Agenda</strong> from remaining cards.</div>
        <div class="pl-12 -indent-6">Pass remaining cards to next player in increasing <img class="inline h-12 align-top" src="/king/prestige.png" /> Prestige order.</div>
        <div class="pl-6">Remove remaining cards from game.</div>
        <div>If this is <strong>not the first game:</strong></div>
        <div class="pl-6">Shuffle the existing <strong>Dilemma deck</strong>.</div>
        <div class="pl-12">Cover it with the cover tile. (p. 9)</div>
        <div class="pl-6">Apply <strong>Legacy effects</strong>. (p. 10)</div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B]">
      <button class="w-full" @click="() => (cardLegacy = !cardLegacy)">
        <h2 class="text-center text-5xl leading-normal">Legacy effects (p. 10)</h2>
      </button>
      <div class="p-4 pt-0" :class="{ hidden: cardLegacy }">
        <div class="pl-6 -indent-6"><strong>Set up Event cards:</strong> use instructions on each card. (p. 10)</div>
        <div class="pl-6 -indent-6"><strong>Story Legacy:</strong> For each Storyline:</div>
        <div class="pl-12 -indent-6">Order Story cards with highest number on top. (p. 10)</div>
        <div class="pl-12 -indent-6">Top-most card is in effect.</div>
        <div><strong>House Achievements:</strong> Each House:</div>
        <div class="pl-12 -indent-6">Review Achievements. (p. 13) Any that are complete (all squares marked) are now in effect.</div>
        <div class="pl-6 -indent-6">For each displayed Chronicle Sticker:</div>
        <div class="pl-6 -indent-6"><strong>Chronicle Ageing:</strong> (p. 10) Mark 1 empty square (if any) on the sticker.</div>
        <div class="pl-6 -indent-6"><strong>Resource Legacy:</strong> (p. 11) Change Resource position up (positive) or down (negative).</div>
        <div class="pl-6 -indent-6"><strong>Power Legacy:</strong> (p. 11) For each House:</div>
        <div class="pl-12 -indent-6">For every displayed Chronicle Sticker signed by that House, increase (if positive) or decrease (if negative) starting Power.</div>
        <div><strong>Open Agendas:</strong> (p. 12)</div>
        <div class="pl-6">For each Resource:</div>
        <div class="pl-12 -indent-6">
          Assign the Positive and Negative (respectively) Open Agenda to the House who signed the most recent positive or negative Chronicle Sticker for the resource.
        </div>
        <div class="pl-12 -indent-6">Each House should have have maximum two Positive and two Negative Open Agendas. If more, discard extras (player chooses).</div>
      </div>
    </div>
  </div>
</template>

<style>
html {
  font-size: 2.2vmin;
}
</style>
