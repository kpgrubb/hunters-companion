import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed as a GitHub Pages project site at /hunters-companion/.
// Dev server stays at root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/hunters-companion/' : '/',
  plugins: [react()],
}))
