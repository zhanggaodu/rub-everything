import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
export default defineConfig({
  // ...
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        tailwind(),//扩展css
      ]
    }
  },
})