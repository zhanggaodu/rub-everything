<script setup>
import { ref } from 'vue'

const box = ref()
//点击tab出现在视口里
function change (id) {
  nextTick( ()=> {
    let node = document.querySelector(`#${id}`)
    if (node == null) return
    let windowWidth = window.innerWidth
    let valueWidth = node.getBoundingClientRect().width
    let valueLeft = node.getBoundingClientRect().left
    let valueRight = node.getBoundingClientRect().right
    if (valueLeft > 0 && valueLeft < windowWidth && valueRight < windowWidth) return
    let final = valueLeft > 0 ? (valueWidth - ( windowWidth - valueLeft)) : Math.abs(valueLeft)
    let scrollAnimation = window.requestAnimationFrame(animation)
    final = Math.floor(final)
    function animation () {    
      let detail = valueLeft > 0 ? 2 : -2
      tab.value.scrollLeft += detail
      final -= 2
      if (final < 0) {
        window.cancelAnimationFrame(scrollAnimation)
        return
      }
      requestAnimationFrame(animation)
    }
  })
  // emit('change', clickTab)
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