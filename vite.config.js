import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/App_React/', // Reemplaza 'App_React' si tu repositorio se llama diferente
})