<script setup >
import { ref } from 'vue'
const name = ref(null)
const word = ref(null)

const bind_change = () => {
  console.log('转图片')
  if (name == null && word == null) return
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, 300, 100);
  ctx.font = "20px serif"
  ctx.fillStyle = 'white'
  ctx.fillText(name.value, 10, 20)
  ctx.font = "20px serif"
  ctx.fillStyle = '#fff'
  ctx.fillText(word.value, 10, 60)
}
const bind_save = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.toDataURL()
  console.log(ctx)
}
</script>

<template>
  <div>文字转图片</div>
  <div class="flex justify-between items-center">
    <div class="flex-1">
      <div>姓名: <input v-model="name" type="text"></div>
      <div>祝福语: <input v-model="word" type="text"></div> 
    </div>
    <div @click="bind_change">转</div>
    <div @click="bind_save">保存</div>
    <div class="flex-1">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped >
input {
  width: 50%;
  height: 22px;
  padding: 2px 4px;
  border: 1px solid #000;
  display: inline-block;
}
canvas {
  width: 170px;
  height: 84px;
  border: 1px solid red;
}
</style>

