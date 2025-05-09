import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import basicSsl from '@vitejs/plugin-basic-ssl'

let external = [
  '@point-of-sale/keyboard-barcode-scanner', '@point-of-sale/webhid-barcode-scanner',
  '@point-of-sale/webserial-barcode-scanner', '@point-of-sale/webcam-barcode-scanner'
]

export default defineConfig({
  base: "./",

  plugins: [
    basicSsl(), svelte()
  ],

  server: {
    fs: {
      allow: ['..'],
    },
  },

  optimizeDeps: {
    exclude: external
  },

  build: {
    rollupOptions: {
      external
    }
  }
})
