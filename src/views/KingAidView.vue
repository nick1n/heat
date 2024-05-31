<script setup lang="ts">
// import IconText from '../components/IconText.vue'

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
          <div>Effect at each game set-up</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center"><img class="max-h-full" src="/king/effect-when.png" /></div>
          <div>Effect when condition is met</div>
        </div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B] p-4 pt-0">
      <h2 class="text-center text-7xl leading-normal">Game round</h2>
      <h2 class="text-center text-5xl">Phases</h2>
      <div class="grid gap-4">
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

    <div class="border-[2vmin] border-[#AE995B] p-4 pt-0">
      <h2 id="dilemma-resolution" class="text-center text-5xl leading-normal"><strong>Dilemma Resolution</strong> (p. 23)</h2>
      <div>
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

    <div class="border-[2vmin] border-[#AE995B] p-4 pt-0">
      <h2 class="text-center text-7xl leading-normal">Voting</h2>
      <div>Start at Leader. On your turn, either:</div>
      <div class="ml-12">Bid <img class="inline h-12 align-top" src="/king/power.png" /> on <strong>Aye</strong> or <strong>Nay</strong></div>
      <div class="ml-20">
        <em>If new high bid, seize <img class="inline h-12 align-top" src="/king/leader.png" /> Leader</em>
      </div>
      <div class="ml-12 hidden">
        Pass to become <img class="inline h-12 align-top" src="/king/moderator.png" /> <strong>Moderator</strong>; +1<img class="inline h-12 align-top" src="/king/coin.png" />
      </div>
      <div class="ml-20 hidden"><em>max. one player each vote</em></div>
      <div class="ml-12 hidden">Pass to <strong>Gather Power</strong>; +1<img class="inline h-12 align-top" src="/king/coin.png" /></div>
      <div class="ml-12">Pass to <strong>Gather Power</strong> and +1<img class="inline h-12 align-top" src="/king/coin.png" /></div>
      <div class="ml-20">
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

    <div class="border-[2vmin] border-[#AE995B] p-4 pt-0">
      <h2 class="text-center text-7xl leading-normal">End of Game</h2>
      <div>
        <div>
          When king <img class="inline h-12 align-top" src="/king/stability.png" /> <strong>abdicates</strong> or <img class="inline h-12 align-top" src="/king/death.png" />
          {{ ' ' }}
          <strong>dies</strong>.
        </div>
        <div>
          <strong>Calculate <img class="inline h-12 align-top" src="/king/agenda.png" /> Scores</strong> (p. 30)
        </div>
        <div class="ml-5">Secret Agenda: Resources & <img class="inline h-12 align-top" src="/king/coin.png" /> Ranking</div>
        <div class="ml-5">Open Agenda (±3 <img class="inline h-12 align-top" src="/king/agenda.png" />, ±1 <img class="inline h-12 align-top" src="/king/agenda.png" />)</div>
        <div class="ml-5">Power Majority (+2 <img class="inline h-12 align-top" src="/king/agenda.png" />, +1 <img class="inline h-12 align-top" src="/king/agenda.png" />)</div>
        <div><strong>Realm Chronicles</strong> (p. 33)</div>
        <div class="ml-5">Record each Ranking and Score.</div>
        <div class="ml-5">Gain <img class="inline h-12 align-top" src="/king/prestige.png" /> Prestige, <img class="inline h-12 align-top" src="/king/crave.png" /> Crave.</div>
        <div class="ml-5">1st rank House names next King.</div>
        <div><strong>House Achievements</strong> <img class="inline h-12 align-top" src="/king/achievements.png" /> (p. 34)</div>
        <div><strong>House Alignment</strong> (p. 34)</div>
        <div><strong>Save Game</strong> (p. 34)</div>
        <div class="ml-5">Secret Agenda + Vote cards</div>
        <div class="ml-5">Trash resolved cards</div>
        <div class="ml-5">Shuffle Trigger + Dilemma deck</div>
        <div class="ml-5">Event cards + Story cards</div>
      </div>
    </div>

    <div class="border-[2vmin] border-[#AE995B] p-4 pt-0">
      <h2 class="text-center text-5xl leading-normal">Campaign Score (p. 33)</h2>
      <div>
        <div>
          Based on <img class="inline h-12 align-top" src="/king/agenda.png" /> rank, and how the King's reign ended, each House gains
          <img class="inline h-12 align-top" src="/king/prestige.png" />/<img class="inline h-12 align-top" src="/king/crave.png" />.
        </div>
        <table class="my-4 w-full text-center">
          <thead>
            <tr>
              <th class="border-r-2 border-gray-600 bg-gray-300 p-1" rowspan="2"><img class="mx-auto h-12 mix-blend-multiply" src="/king/agenda.png" />Rank</th>
              <th class="border-r-2 border-gray-600 bg-gray-300 p-1" rowspan="2"><img class="mx-auto h-12 mix-blend-multiply" src="/king/death.png" />King died</th>
              <th class="bg-gray-300 p-1" colspan="2">King abdicated</th>
            </tr>
            <tr>
              <th class="border-r-2 border-gray-600 bg-gray-300 p-1"><img class="inline h-12 align-top mix-blend-multiply" src="/king/stability.png" /> max</th>
              <th class="bg-gray-300 p-1"><img class="inline h-12 align-top mix-blend-multiply" src="/king/stability.png" /> min</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-r-2 border-gray-600">1st</td>
              <td class="border-r-2 border-gray-600">+5<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="border-r-2 border-gray-600">+3<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td>+3<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr>
              <td class="border-r-2 border-gray-600">2nd</td>
              <td class="border-r-2 border-gray-600">+4<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td class="border-r-2 border-gray-600">+2<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td>+2<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr>
              <td class="border-r-2 border-gray-600">
                3rd
                <div class="-my-4 text-base">&</div>
                4th
              </td>
              <td class="border-r-2 border-gray-600">
                +2<img class="inline h-12 align-top" src="/king/prestige.png" />+1<img class="inline h-12 align-top" src="/king/crave.png" />
              </td>
              <td class="border-r-2 border-gray-600">+1<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td>+1<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr class="hidden">
              <td class="border-r-2 border-gray-600">4th</td>
              <td class="border-r-2 border-gray-600">
                +2<img class="inline h-12 align-top" src="/king/prestige.png" />+1<img class="inline h-12 align-top" src="/king/crave.png" />
              </td>
              <td class="border-r-2 border-gray-600">+1<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
              <td>+1<img class="inline h-12 align-top" src="/king/crave.png" /></td>
            </tr>
            <tr>
              <td class="border-r-2 border-gray-600">Last</td>
              <td class="border-r-2 border-gray-600">+2<img class="inline h-12 align-top" src="/king/crave.png" /></td>
              <td class="border-r-2 border-gray-600">+2<img class="inline h-12 align-top" src="/king/crave.png" /></td>
              <td>+2<img class="inline h-12 align-top" src="/king/prestige.png" /></td>
            </tr>
          </tbody>
        </table>
        <div><img class="inline h-12 align-top" src="/king/prestige.png" /> Prestige: the legacy of your House as a promoter of the Kingdom of Ankist.</div>
        <div><img class="inline h-12 align-top" src="/king/crave.png" /> Crave: the legacy of your House in a struggle for power with other Houses.</div>
      </div>
    </div>
  </div>
</template>

<style>
html {
  font-size: 2.2vmin;
}
</style>
