import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração do Vite para desenvolvimento React
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Plugin para suporte ao React
  server: {
    port: 5173, // Porta padrão do frontend
    host: true // Permite acesso externo (0.0.0.0)
  }
})