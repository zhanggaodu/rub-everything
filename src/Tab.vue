<script setup>
import { ref } from 'vue'

const box = ref()
//点击tab出现在视口里
function change (index) {
  let tabBox = box.value
  if (tabBox == null) return  
  let barLeft = Math.floor(tabBox.scrollLeft)
  if (barLeft == 0) return
  let node = document.querySelector(`#${index}`)
  let valueLeft = Math.floor(node.getBoundingClientRect().left)
  let gap = Math.floor((valueLeft - barLeft) / 2)
  let final = barLeft + gap
  let scrollAnimation = window.requestAnimationFrame(animation)
  function animation () {
    if (final < barLeft && tabBox.scrollLeft > 0) {
      barLeft -= 6
      tabBox.scrollLeft = barLeft
      requestAnimationFrame(animation)
    } else if(final > barLeft) {
      barLeft += 6
      if(final < barLeft) return
      tabBox.scrollLeft = barLeft
      requestAnimationFrame(animation)
    } else {
      window.cancelAnimationFrame(scrollAnimation)
    }
  }
}
</script>

<template>
  <div ref="box" class="box flex overflow-x-scroll">
    <div id="one" @click="change('one')">1</div>
    <div id="two" @click="change('two')">1</div>
    <div id="three" @click="change('three')">2</div>
    <div id="four" @click="change('four')">3</div>
    <div id="five" @click="change('five')">4</div>
  </div>
</template>

<style lang="scss" scoped>

</style>