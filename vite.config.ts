import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'


export default defineConfig({
  build: {
    target: 'es2018',
    outDir: '../../dist/rub',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html')
      }
    }
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        tailwind(),//扩展css
      ]
    }
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`
    }
  }
})