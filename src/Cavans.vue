<script setup>
import { ref, onMounted } from 'vue'

const sign = ref()
const isDrawing = ref(false)
const hasDraw = ref(false)
const startX = ref(0)
const startY = ref(0)

let context = null
let ratio = window.innerWidth / 375

const getLineWidth = () => 4  //option
const getLineColor = () => "#000000" //option

function initCavans () {
  let node = sign.value
  if (node == null) return
  if (node.getContext){
    context = node.getContext("2d")
  } else {
    // canvas-unsupported code here
  }
 
  context.lineCap = "round" 
  context.lineJoin = "round" 
  context.fillStyle = "#ffffff" 
  context.fillRect(0, 0, node.width, node.height) 
}

function onTouchStart(e) {
  e.preventDefault()
  if (e.touches.length === 1) {
    isDrawing.value = true
    hasDraw.value = true
    const size = e.touches[0]
    let node = sign.value
    if (node == null) return
    const box = node.getBoundingClientRect()
    drawStart({
      x: size.clientX - box.left,
      y: size.clientY - box.top
    })
  }
}

function onTouchMove(e) {
  e.preventDefault()
  if (!isDrawing.value) return
  if (e.touches.length === 1) {
    let node = sign.value
    if (node == null) return
    const size = e.touches[0]
    const box = node.getBoundingClientRect()
    drawMove({
      x: size.clientX - box.left,
      y: size.clientY - box.top
    })
  }
}

function onTouchEnd(e) {
  e.preventDefault()
  if (!isDrawing.value) return
  if (e.touches.length === 1) {
    let node = sign.value
    if (node == null) return
    const size = e.touches[0]
    const box = node.getBoundingClientRect()
    drawEnd({
      x: size.clientX - box.left,
      y: size.clientY - box.top
    })
  }
}

function drawStart(size) {
  const x = size.x * ratio, y = size.y * ratio 
  context.beginPath() 
  context.moveTo(x, y) 
  context.lineTo(x, y) 
  context.strokeStyle = getLineColor() 
  context.lineWidth = getLineWidth() * ratio 
  context.stroke() 
  context.closePath() 
  startY.value = y 
  startX.value = x 
}

function drawMove(size) {
  const x = size.x * ratio, y = size.y * ratio 
  context.beginPath() 
  context.moveTo(startX.value, startY.value) 
  context.lineTo(x, y) 
  context.strokeStyle = getLineColor() 
  context.lineWidth = getLineWidth() * ratio 
  context.stroke() 
  context.closePath() 
  startY.value = y 
  startX.value = x 
}
  
function drawEnd(size) {
  context.beginPath() 
  context.moveTo(startX.value, startY.value) 
  context.lineTo(size.x * ratio, size.y * ratio) 
  context.stroke() 
  context.closePath() 
}

onMounted(() => {
  initCavans()
  let node = sign.value
  if (node == null) return
  node.addEventListener("touchstart", onTouchStart)
  node.addEventListener("touchmove", onTouchMove)
  node.addEventListener("touchend", onTouchEnd)
})
</script>

<template>
  <canvas ref="sign" width="150" height="150"></canvas>
</template>

<style lang="scss" scoped>

</style>