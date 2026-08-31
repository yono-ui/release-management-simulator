import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESM config. Some environments prefer explicit .mjs to ensure Node treats this as ESM.
export default defineConfig({
  plugins: [react()]
})
