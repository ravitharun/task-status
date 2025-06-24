import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
    server: {
    host: true, // allows access from other devices in the same network
    port: 5173, // optional, can be omitted if you're okay with default
  },
})
