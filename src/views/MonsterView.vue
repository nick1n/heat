<template>
  <div class="font-kdm-text text-pretty text-[10px] leading-[11px]">
    <div class="hidden">
      <div class="font-kdm-icons">Test, 0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ.</div>
      <div><span class="font-kdm-icons">B</span>&nbsp;Trigger Story Event</div>
      <div><span class="font-kdm-icons">B</span>&nbsp;Starvation</div>
      <div><span class="font-kdm-icons">j</span>&nbsp;Endeavor</div>
      <div><span class="font-kdm-icons">i</span>&nbsp;Movement</div>
      <div><span class="font-kdm-icons">h</span>&nbsp;Activation</div>
      <div><span class="font-kdm-icons">v</span>&nbsp;Lantern</div>
      <div><span class="font-kdm-icons">t</span>&nbsp;Critical Wound</div>
      <div><span class="font-kd-icons">r</span>&nbsp;Reaction</div>
      <div><span class="font-kd-icons text-9">O</span>&nbsp;AI Deck</div>
      <div><span class="font-kdm-icons">x</span>&nbsp;Persistent Injury</div>
      <div><span class="font-kdm-icons">C</span>&nbsp;Trigger</div>
    </div>
    <div class="grid gap-2 print:grid-cols-2 print:gap-0">
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-black"
          style="background: url('/monster/bg-hunt.png') top; background-size: 100% auto"
        >
          Hunt Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Reference</div>
        <div class="mx-12">
          <div class="mt-2">
            <strong>Event Revealer:</strong> Survivors take turns being responsible for revealing, rolling, and making all decisions for the hunt event. Survivors can trade
            resources before revealing.
          </div>
          <div class="mt-2">
            <strong>Overwhelming Darkness:</strong> Trigger <span class="font-kdm-icons">B</span>&nbsp;Overwhelming Darkness the first time survivors move here each hunt and cannot
            be skipped.
          </div>
          <div class="mt-2">
            <strong>Event Damage:</strong> Damage caused by hunt events is non-lethal and will not cause severe injuries or brain trauma unless specified. Damage accrued persists
            into showdown phase.
          </div>
          <div class="mt-2">
            <strong>Survivor Deaths:</strong> If a survivor dies on the hunt, their gear is returned to settlement storage and their resources are lost (unless special rules
            dictate otherwise).
          </div>
          <div class="mt-2 hidden">
            <strong>Empty Spaces:</strong> When moving to an empty hunt event space, make a roll on the hunt event table. This is true when you move backwards.
          </div>
          <div class="mt-2">
            <strong>Acquiring Gear:</strong> If your grid is full, you must archive either the new gear (unless it's cursed) or another item, without rearranging or giving it to
            another survivor.
          </div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-black"
          style="background-image: url('/monster/bg-hunt.png'); background-size: 100% auto"
        >
          Hunt Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Phase Steps</div>
        <div class="mx-12">
          <div class="mb-1 mt-2 text-center">—— Survivors Hunt a Quarry ——</div>
          <div>If fighting a Nemsis this lantern year, skip the hunt phase.</div>
          <div class="mt-2"><strong>Setup:</strong> Follow these steps to set up the hunt phase:</div>
          <div>1) Choose a quarry monster.</div>
          <div class="pl-3 -indent-3">
            2) Place basic hunt event and monster hunt event cards on hunt spaces according to hunt setup in the quarry's showdown story event (<span class="font-kdm-icons">B</span
            >&nbsp;Overwhelming Darkness and <span class="font-kdm-icons">B</span>&nbsp;Starvation spaces do not have hunt events).
          </div>
          <div>3) Place special hunt event cards according to gear.</div>
          <div>4) Place survivors and monster according to hunt setup.</div>
          <div class="mt-2"><strong>Reveal:</strong> Nominate an Event Revealer to resolve cards in order on current space.</div>
          <div class="mt-2"><strong>Move:</strong> When all cards are resolved, advance on hunt track. If next space lacks cards, roll for rantom hunt event (p.&nbsp;90).</div>
          <div class="mt-2 hidden">
            <strong>Empty Spaces:</strong> When moving to an empty hunt Event space, make a roll on the hunt event table. This is true when you move backwards.
          </div>
          <div class="mt-2">
            <strong>End Hunt:</strong> Immediately start showdown if survivors move onto monster. If monster moves onto survivors, start showdown with monster ambush. If survivors
            perish, reach the starvation space even with the quarry monster on it, or quarry monster moves off the board, apply
            <span class="font-kdm-icons">B</span>&nbsp;Starvation.
          </div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-settlement.png'); background-size: 100% auto"
        >
          Settlement Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Reference</div>
        <div class="mx-12">
          <div class="mt-2"><strong>Lingering Effects:</strong> Settlement event effects that persist throughout settlement phase.</div>
          <div class="mt-2"><strong>Milestones:</strong> Conditional events triggered immediately when condition is met.</div>
          <div class="mt-2">
            <strong>Nemesis:</strong> Monsters that are triggered by timeline. Skip hunt phase. Survivors choose type and level if not specified -- level must not be faced before.
          </div>
          <div class="mt-2">
            <strong>Nemesis:</strong> Timeline-triggered monsters which skip the hunt phase. Survivors choose the type and a level they haven't faced before if not specified.
          </div>
          <div class="mt-2">
            <strong>Endeavor Actions:</strong> Nominate a survivor, spend an <span class="font-kdm-icons">j</span>&nbsp;endeavor, and any required resources to conduct action.
          </div>
          <div class="mt-2">
            <strong>Prerequisites:</strong> Some gear/endeavors have <span class="font-kdm-icons">L</span>&nbsp;prerequisites. This is not available until they are fulfilled.
          </div>
          <div class="mt-2"><strong>Innovation Consequences:</strong> Gaining innovations will add their consequencies to the innovation deck.</div>
          <div class="mt-2"><strong>Weapon Masteries:</strong> Once gained, functions as an innovation that gives benefits to all survivors.</div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-settlement.png'); background-size: 100% auto"
        >
          Settlement Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Phase Steps</div>
        <div class="mx-12">
          <div class="mb-1 mt-2 text-center">—— Survivors Recover and Develop ——</div>
          <div class="pl-3 -indent-3"><strong>1) Setup:</strong> Set up settlement's locations/innovations/etc.</div>
          <div class="pl-3 -indent-3"><strong>2) Survivors Return:</strong> Heal L/H injuries, discard tokens, and apply Returning Survivor effects.</div>
          <div class="pl-3 -indent-3">
            <strong>3) Gain Endeavors:</strong> Each returning survivor gains an <span class="font-kdm-icons">j</span>&nbsp;endeavor plus any bonuses.
          </div>
          <div class="pl-3 -indent-3">
            <strong>4) Update Timeline:</strong> Advance lantern year. Draw and resolve a random Settlement Event. Resolve Timeline Events in order listed.
          </div>
          <div class="pl-3 -indent-3">
            <strong>5) Update Death Count:</strong> Advance for each dead survivor from prior hunt/showdown. Deaths during this phase update immediately.
          </div>
          <div class="pl-3 -indent-3"><strong>6) Check Milestones:</strong> Check settlement sheet and resolve milestones.</div>
          <div class="pl-3 -indent-3"><strong>7) Develop:</strong> Craft gear, spend <span class="font-kdm-icons">j</span>, innovate, and build.</div>
          <div class="my-1 text-center">—— Recommended place to end a session ——</div>
          <div class="pl-3 -indent-3"><strong>8) Departing Survivors:</strong> Prepare for next hunt/nemesis:</div>
          <div class="pl-3">a. Select 4 survivors and add gear to their gear grids.</div>
          <div class="pl-3">b. Record armor points and attribute modifiers from gear.</div>
          <div class="pl-3">c. Apply Departing Survivor effects.</div>
          <div class="pl-3 -indent-3">
            <strong>9) Special Showdown:</strong> Trigger any special showdowns. Then go back to <strong>5) Update Death Count</strong> for this year.
          </div>
          <div class="pl-3 -indent-3"><strong>10) Record &amp; Archive Resources:</strong> Record and return resources back to their respective decks.</div>
          <div class="pl-3 -indent-3">
            <strong>11) End Settlement Phase:</strong> Lose all unspent <span class="font-kdm-icons">j</span>&nbsp;endeavors and clean up settlement.
          </div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]" v-for="i in 4" :key="i" :class="{ 'hidden print:block': i !== 1 }">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-showdown.png'); background-size: 100% auto"
        >
          Showdown Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Survivor Turn</div>
        <div class="mx-12 mt-2">
          <div class="mb-1 text-center">—— Survivor's Act ——</div>
          <div>At the start of an act, gain <span class="font-kdm-icons">i</span>&nbsp;(Movement) &amp; <span class="font-kdm-icons">h</span>&nbsp;(Activation).</div>
          <div>
            At the end, lose any unspent <span class="font-kdm-icons">i</span> &amp; <span class="font-kdm-icons">h</span>. During your turn, the survivor may do the following, in
            any order:
          </div>
          <div>
            <strong>Spend <span class="font-kdm-icons">i</span>:</strong> Move orthogonally through unoccupied spaces up to your movement limit, minimum of 1 space. During a move,
            adjacent survivors may trade resources.
          </div>
          <div>
            <strong>Spend <span class="font-kdm-icons">h</span>:</strong> Attack, activate gear, terrain, or special rules.
          </div>
          <div class="my-1 text-center">—— Survivor's Attack ——</div>
          <div><strong>Attack Roll:</strong> Roll (Weapon Spd + Spd Mods)d10 for attacks.</div>
          <div>For each attack die, attack hits if:</div>
          <div class="ml-3">Roll + Survivor Acc + Mods ≥ Weapon Acc + Monster Eva</div>
          <div class="ml-3">Natural roll 10 (<span class="font-kdm-icons">v</span>) is a Perfect Hit, 1 always misses.</div>
          <div><strong>Hit Location:</strong> Draw for each hit; if trap, end attack &amp; resolve.</div>
          <div><strong>Wound Roll:</strong> In order of attacker's choice, roll 1d10 for each hit location. A hit wounds if:</div>
          <div class="ml-3">Roll + Weapon Str + Survivor Str ≥ Monster Tgh + Mods</div>
          <div class="ml-3">Natural roll 10 (<span class="font-kdm-icons">v</span>) always wounds, 1 always fails.</div>
          <div class="ml-3">If wounded, move top <span class="font-kd-icons text-9">O</span>&nbsp;AI card to wound stack.</div>
          <div><strong>Reactions:</strong> Hit location may have <span class="font-kd-icons">r</span>&nbsp;reaction or <span class="font-kdm-icons">t</span>&nbsp;critical.</div>
          <div class="ml-3">
            <strong><span class="font-kdm-icons">t</span> Critical:</strong> Resolves only if:
          </div>
          <div class="ml-6 pl-[2.5px]">Nat Wound Roll ≥ 10 + Monster Luck - Survivor Luck</div>
          <div class="ml-6 pl-[2.5px]">Do not resolve any other <span class="font-kd-icons">r</span>&nbsp;reactions.</div>
          <div class="ml-3">
            <strong><span class="font-kd-icons">r</span> Reflex:</strong> Perform unless critical wound.
          </div>
          <div class="ml-3">
            <strong><span class="font-kd-icons">r</span> Wound:</strong> Perform if wound roll succeeded.
          </div>
          <div class="ml-3">
            <strong><span class="font-kd-icons">r</span> Failure:</strong> Perform if wound roll failed.
          </div>
          <div class="hidden">
            <strong>Perfect Hit:</strong> A natural 10 (<span class="font-kdm-icons">v</span>) rolled during attack roll, hits regardless of monster evasion or accuracy modifiers.
          </div>
          <div><strong>Blind Spot:</strong> Usually directly behind monster. Survivors attacking gain +1 Acc to attack roll.</div>
          <div><strong>First Strike:</strong> Hit location must be chosen first.</div>
          <div class="hidden"><strong>Weapon Proficiency:</strong> Must wound a monster at least once during a showdown in order to gain a level.</div>
          <div><strong>Survival:</strong> Cannot use any survival actions while attacking.</div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-showdown.png'); background-size: 100% auto"
        >
          Showdown Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Phase Steps</div>
        <div class="mx-12 mt-2">
          <div class="mb-1 text-center">—— Survivors Fight the Monster ——</div>
          <div><strong>Setup:</strong> Create <span class="font-kd-icons text-9">O</span>&nbsp;AI deck, deploy figurines and terrain according to showdown setup.</div>
          <div class="mt-2"><strong>Monster Ambush:</strong> Skip first survivor turn.</div>
          <div class="mt-2">
            <strong>Survivor Ambush:</strong> Survivors go first. Disregard showdown setup and place figurines and terrain as players wish, still following terrain card rules.
          </div>
          <div class="mt-2">
            <strong>Monster Turn:</strong> Monster controller draws <span class="font-kd-icons text-9">O</span>&nbsp;AI card and resolves it. If no
            <span class="font-kd-icons text-9">O</span>&nbsp;AI cards, conduct Basic Action.
          </div>
          <div class="mt-2"><strong>Survivor Turn:</strong> All survivors may perform their actions in any order.</div>
          <div class="mb-1 mt-2 text-center">—— Gear Reference ——</div>
          <div class="float-left mr-2 rounded-full bg-gray-400 p-[2px] text-center font-bold text-white">
            <div class="pb-[3px] text-black">
              <div class="absolute ml-[1px] mt-[1px] h-[9.5px] w-[9.5px] rounded-full bg-white"></div>
              <span class="font-kdm-icons relative hidden text-[10px]">h</span>
              <span class="font-kd-icons relative">q</span>
            </div>
            <div class="-mx-[2px] border-b-[1px] border-gray-600"></div>
            <div class="-mx-[2px] hidden border-b-[1px] border-white"></div>
            <div class="py-[3px]">2</div>
            <div class="rounded-full bg-gray-600 px-[3px] pb-[2px] pt-[4px]">
              <div class="pb-[1px]">7<span class="kdm-text-shadow-gray absolute pl-[.5px] text-[10px]">+</span></div>
              <div class="-mx-[3px] border-b-[1px] border-gray-400"></div>
              <div class="pt-[2px]">1</div>
            </div>
          </div>
          <div class="pt-[3px]">Spend an <span class="font-kdm-icons">h</span>&nbsp;activation to attack with this weapon.</div>
          <div class="pt-[6px]"><strong>Speed (Spd):</strong> Number of attack rolls in the attack.</div>
          <div class="pt-[6px]"><strong>Accuracy (Acc):</strong> Attack roll result required to hit.</div>
          <div class="pt-[6px]"><strong>Strength (Str):</strong> Modifier added to wound roll.</div>
          <div class="clear-left pt-1"><strong>Weapon Proficiency:</strong> Must wound a monster at least once during a showdown in order to gain a level in it.</div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-showdown.png'); background-size: 100% auto"
        >
          Showdown Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Reference</div>
        <div class="mx-12 mt-2">
          <div class="mt-2"><strong>After Hit:</strong> Trigger after successful hit, before rolling for HL.</div>
          <div class="mt-2"><strong>Before Damage:</strong> Trigger after HL roll, but before damage.</div>
          <div class="mt-2"><strong>After Damage:</strong> Trigger after damage, even if armor took all of the damage.</div>
          <div class="mt-2"><strong>Full Move:</strong> A movement using the max available movement.</div>
          <div class="mt-2">
            <strong>Persistent Injury:</strong> If <span class="font-kdm-icons">x</span>&nbsp;persistent injury is triggered, disregard other actions/text and just perform the
            <span class="font-kdm-icons">x</span>&nbsp;persistent injury.
          </div>
          <div class="mt-2"><strong>Intimidate:</strong> Not an attack, cannot be dodged, and adjacency is not required.</div>
          <div class="mt-2"><strong>Brain Damage:</strong> Specific HL where insanity is armor. Brain trauma is used instead of severe injuries for this hit location.</div>
          <div class="mt-2">
            <strong>Duration AI:</strong> First time, "when drawn face down" effects are triggered. Card then returns face up to top of
            <span class="font-kd-icons text-9">O</span>&nbsp;AI deck to be drawn again. When drawn next, perform "when drawn face up" effects.
          </div>
          <div class="mt-2"><strong>Damage Outside of Attack Profile:</strong> Resolved without adding any monster damage modifiers. Cannot be dodged.</div>
          <div class="mt-2">
            <strong>Heal X:</strong> Return X amount of <span class="font-kd-icons text-9">O</span>&nbsp;AI cards from wound stack to the
            <span class="font-kd-icons text-9">O</span>&nbsp;AI deck.
          </div>
          <div class="mt-2"><strong>Moods/Traits:</strong> Persistent effects until deactivated.</div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-showdown.png'); background-size: 100% auto"
        >
          Showdown Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Monster Turn</div>
        <div class="mx-12 mt-2">
          <div class="mb-1 text-center">—— Monster Targets Survivor ——</div>
          <div>
            <strong>Monster Controller:</strong> Player responsible for conducting monster actions. Survivor gains +1 insanity if player targets own survivor. Pass role each
            monster turn.
          </div>
          <div class="mt-2">Survivors eligible to be targeted by the following conditions:</div>
          <div><strong>Facing:</strong> All spaces in front of the monster.</div>
          <div><strong>In Field of View:</strong> Not in blind spot or obscured by obstacle.</div>
          <div><strong>In Range:</strong> Space between is ≤ monster's movement.</div>
          <div><strong>Random:</strong> Randomly selected.</div>
          <div><strong>Threat:</strong> Not Knocked Down or under effect of gear/terrain that specifies that they are not a threat.</div>
          <div><strong>Closest:</strong> Fewest spaces away.</div>
          <div><strong>Most/Least:</strong> Zero still counts unless stated.</div>
          <div><strong>Last to Wound:</strong> Last that wounded the monster.</div>
          <div><strong>Non-Deaf:</strong> Not suffering from Deaf severe injury.</div>
          <div class="my-1 text-center">—— Monster Attacks ——</div>
          <div><strong>Move &amp; Attack:</strong> If specified, monster uses movement to move the shortest path to target and attacks if in range.</div>
          <div><strong>Attack Roll:</strong> For each attack die, attack hits if:</div>
          <div class="ml-3">Roll + Monster Acc ≥ Attack Profile Acc + Survivor Eva</div>
          <div class="ml-3">Natural roll 10 (<span class="font-kdm-icons">v</span>) always hits, 1 always misses.</div>
          <div><strong>Apply Damage:</strong> Roll a hit location (HL) die for each hit. Expend damage for each hit as follows:</div>
          <div class="pl-3 -indent-3">1) Expend damage to reduce armor at hit location until 0.</div>
          <div class="pl-3 -indent-3">2) Expend damage to fill light (L), then heavy (H) injury boxes. If heavy injury, survivor gets Knocked Down.</div>
          <div class="pl-3 -indent-3">3) If any damage remains, resolve a severe injury event once for this HL, expending any remaining damage.</div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-showdown.png'); background-size: 100% auto"
        >
          Showdown Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Common Effects</div>
        <div class="mx-12 mt-2">
          <div class="mt-2"><strong>Knockback X:</strong> Pushed X spaces in a straight line away from the source.</div>
          <div class="mt-2">
            <strong>Board Edge:</strong> If resolving knockback or monster movement, move figure to the board's edge and stop movement. If it starts at the board's edge, instead
            move it along the edge.
          </div>
          <div class="mt-2"><strong>Colliding Occurs When:</strong></div>
          <div class="pl-[6px] -indent-[6px]">- Monster moves through survivor, trigger Collision.</div>
          <div class="pl-[6px] -indent-[6px]">- Monster ends move on survivor, trigger Knockback 5 and Collision for survivor.</div>
          <div class="pl-[6px] -indent-[6px]">- Monster collides into destructible object, remove object.</div>
          <div class="pl-[6px] -indent-[6px]">- Survivor collides into destructible object, suffer 1 damage and remove the object.</div>
          <div class="pl-[6px] -indent-[6px]">- Survivor collides into impassible terrain, trigger Collision.</div>
          <div class="pl-[6px] -indent-[6px]">- Survivor collides into other survivor, resolve Knockback normally and trigger Collision for both survivors.</div>
          <div class="mt-2"><strong>Collision:</strong> Survivor is Knocked Down.</div>
          <div class="mt-2"><strong>Bash:</strong> Survivor is Knocked Down.</div>
          <div class="mt-2">
            <strong>Knocked Down (Survivor):</strong> No <span class="font-kdm-icons">ih</span> <span class="font-kd-icons">mq</span>. Can only Dodge. Not a threat. Cannot be
            Knocked Down again. If Knocked Down during attack ignore any unresolved hits. Stand up at the end of the next monster turn.
          </div>
          <div class="mt-2">
            <strong>Knocked Down (Monster):</strong> Monster is hit only on 3+ instead of normal accuracy calculation. Cancel any <span class="font-kd-icons">r</span>. Stands up at
            start of next turn, <span class="font-kd-icons text-9">O</span>&nbsp;AI card drawn, or trap drawn.
          </div>
        </div>
      </div>
      <div class="bg-cover print:h-[50vh]" v-for="i in 4" :key="i" :class="{ 'hidden print:block': i !== 1 }">
        <div
          class="font-kdm-title kdm-text-shadow-black border-b-2 border-black bg-teal-700 pb-6 pt-8 text-center text-3xl text-white"
          style="background-image: url('/monster/bg-showdown.png'); background-size: 100% auto"
        >
          Showdown Phase
        </div>
        <div class="font-kdm-title triangle-sides mx-auto -mt-[21px] flex max-w-fit bg-black px-1 text-center text-xl leading-10 text-white">Survival Actions</div>
        <div class="mx-12 mt-2">
          <div class="mb-1 text-center">—— Survivors Fight to Survive ——</div>
          <div>A survivor may spend survival to perform each survival action once per round:</div>
          <div class="mt-2"><strong>Dodge:</strong> Avoid all damage from one hit location die.</div>
          <div class="pl-[6px] -indent-[6px]">- Cannot if you are attacking, Doomed, or have a Broken Hip.</div>
          <div class="mt-2"><strong>Encourage:</strong> If standing, another survivor may stand up.</div>
          <div class="pl-[6px] -indent-[6px]">- Cannot if you are attacking, Knocked Down, Doomed, have a Shattered Jaw, or the target is Deaf.</div>
          <div class="mt-2"><strong>Endure:</strong> Spend (7 - Luck) survival, before rolling for a severe injury, ignore it.</div>
          <div class="pl-[6px] -indent-[6px]">- Cannot if you are attacking, Knocked Down, or Doomed.</div>
          <div class="mt-2"><strong>Dash:</strong> Gain <span class="font-kdm-icons">i</span>&nbsp;movement and use it immediately.</div>
          <div class="pl-[6px] -indent-[6px]">- Cannot if you are attacking, Knocked Down, Doomed, have a Bruised Tail-bone, Dismembered Leg, or Torn Muscle.</div>
          <div class="mt-2"><strong>Surge:</strong> Gain <span class="font-kdm-icons">h</span>&nbsp;activation and use it immediately.</div>
          <div class="pl-[6px] -indent-[6px]">- Cannot if you are attacking, Knocked Down, Doomed, or have a Slashed Back.</div>
          <div class="mt-2">Survival opportunities for dash and surge:</div>
          <div>- During flows on monster <span class="font-kd-icons text-9">O</span>&nbsp;AI cards.</div>
          <div>- Between actions on the survivor's turn.</div>
          <div>- Before performing <span class="font-kd-icons">r</span>&nbsp;reactions.</div>
          <div>- After <span class="font-kdm-icons">t</span>&nbsp;critical wound effects.</div>
          <div>- When a monster is Knocked Down.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  #vue-inspector-container,
  #__vue-devtools-container__ {
    display: none;
  }
}
.font-kdm-icons {
  font-family: 'KDM-All-Icons';
  font-size: 11px;
  font-weight: normal;
  line-height: 8px;
  vertical-align: middle;
  /* letter-spacing: -1px; */
}

.font-kd-icons {
  font-family: 'kd-icons';
  font-weight: 400;
  font-size: 11px;
  /* font-weight: normal; */
  line-height: 9px;
  /* vertical-align: middle; */
  /* letter-spacing: -1px; */
}

.font-kd-icons.text-9 {
  font-size: 9px;
}

.font-kdm-title {
  font-family: 'SilveradoMediumCondensed';
  font-weight: 500;
}

.font-kdm-title {
  font-family: 'SilveradoLightCondensed';
  font-weight: 300;
}

.font-kdm-text {
  font-family: 'AmplitudeWide-Book';
  font-weight: 300;
  /* line-height: 1; */
}

.font-kdm-text {
  font-family: 'NimbusSanLCY';
  font-weight: 300;
  /* line-height: 1; */
}

.font-kdm-text strong {
  font-weight: 600;
}

.kdm-text-shadow {
  text-shadow:
    0 0 1px #fff,
    0 0 1px #fff,
    0 0 1px #fff,
    0 0 1px #fff,
    0 0 1px #fff,
    0 0 1px #fff,
    0 0 1px #fff,
    0 0 1px #fff,
    0 0 3px #fff,
    0 0 3px #fff,
    0 0 3px #fff;
}

.kdm-text-shadow-black {
  text-shadow:
    0 0 1px #000,
    0 0 1px #000,
    0 0 1px #000,
    0 0 1px #000,
    0 0 1px #000,
    0 0 1px #000,
    0 0 1px #000,
    0 0 1px #000,
    0 0 3px #000,
    0 0 3px #000,
    0 0 3px #000;
}

.kdm-text-shadow-gray {
  text-shadow:
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563,
    0 0 1px #4b5563;
}

.triangle-sides {
  position: relative;
}

.triangle-sides::after {
  content: '';
  position: absolute;
  right: -1.25rem;
  top: 0;
  bottom: 0;
  width: 0px;
  height: 0px;
  border-top: 1.25rem solid transparent;
  border-bottom: 1.25rem solid transparent;
  border-left: 1.25rem solid black;
}

.triangle-sides::before {
  content: '';
  position: absolute;
  left: -1.25rem;
  top: 0;
  bottom: 0;
  width: 0px;
  height: 0px;
  border-top: 1.25rem solid transparent;
  border-bottom: 1.25rem solid transparent;
  border-right: 1.25rem solid black;
}

@font-face {
  font-family: kd-icons;
  src:
    url(https://kingdomdeath.com/_next/static/media/kd-icons.f8954c0d4f42224f0a7b49aa5ffe21a2.woff2) format('woff2'),
    url(https://kingdomdeath.com/_next/static/media/kd-icons.c51aee6e4bab0dfcfca3205c5be79520.woff) format('woff');
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
}
</style>
