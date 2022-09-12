<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'
import installSwipeEvent from './swiped-events'

const today = ref<Dayjs>(dayjs())
const hightlight = ref<Dayjs>(today.value)

const first = computed(()=> hightlight.value.date(1))
const last = computed(() => {
  let days = hightlight.value.daysInMonth()
  return hightlight.value.date(days)
})

const createCell = (day: Dayjs) => {
  const ts = day.hour(0).minute(0).second(0).unix()
  return {
    date: day.date(),
    ts,
    // count: ts.date(),
    disabled: day.isBefore(first.value,'day'),
    seleted: day.isSame(hightlight.value,'day'),
    today: day.isSame(today.value,'day'),
    previous: day.month < hightlight.value.month,
    next: day.month > hightlight.value.month
  }
}
const daysList = computed (() => {
  let res = []
  let pre = first.value.day()
  while (pre > 0) {
    res.push(createCell(first.value.subtract(pre--,'d')))
  }

  let days = first.value.daysInMonth()
  for (let i = 0; i < days; i++) {
    res.push(createCell(first.value.add(i,'d')))
  }

  let next = 7 - res.length % 7
  for (let i = 1; i <= next; ++i) {
    res.push(
      createCell(last.value.add(i, 'd'))
    )
  }
  return res
})

const weeks = computed(() => {
  let res = []
  let length = daysList.value.length / 7
  let c = 0
  for(let i = 0; i < length; ++i) {
    let t = []
    for(let j = 0; j < 7; ++j) {
      t.push(daysList.value[c++])
    }
    res.push(t)
  }
  return res
})

const bindSelect = (ts: number) => {
  console.log(dayjs(ts * 1000))
  hightlight.value = dayjs(ts * 1000)
}

const title = computed(() => {
  return hightlight.value.format('YYYY年MM月')
})

const calender = ref<HTMLDivElement>()
const area = ref<HTMLDivElement>()

const increaseMonth = (n: number) => {
  let target = hightlight.value.add(n, 'month')
  if (target.isBefore(today.value, 'month')) return
  hightlight.value = target
}

const swipedHandler = e => {
  const dir = e.detail.dir
  let n = 0
  if (dir === 'left') {
    n = 1
  } else if (dir === 'right') {
    n = -1
  }
  if (n !== 0) {
    increaseMonth(n)
    e.preventDefault()
  }
}

onMounted(() => {
  const node = calender.value
  installSwipeEvent(node);
  (node as HTMLElement).addEventListener('swiped', swipedHandler)
  area.value.addEventListener('touchmove', e => e.preventDefault())
})

onUnmounted(() => {
  const node = calender.value;
  (node as HTMLElement).removeEventListener('swiped', swipedHandler)
})
</script>

<template>
  <div ref="area">
    <div class="text-center">{{ title }}</div>
  
    <div ref="calender">
      <div class="grid grid-cols-7 text-center">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
        <template v-for="week in weeks">
          <div @click="bindSelect(cell.ts)" :class="{ 'disabled': cell.disabled , 'today': cell.today, 'next': cell.next }" v-for="cell in week">{{cell.date}}</div>
        </template>
      </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>
.previous,
.next,
.disabled,
.disabled .ac {
  color: var(--color-disabled);
}
.today {
  color: var(--color-highlight);
}

</style>