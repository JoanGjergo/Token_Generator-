import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Replace 'Token_Generator' with your repo name if different
export default defineConfig({
  base: '/Token_Generator/',
  plugins: [react()],
})
