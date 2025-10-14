/** @type {import('tailwindcss').Config} */
export default {
  // Arquivos onde o Tailwind deve procurar por classes CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Cores personalizadas para o tema rosa
      colors: {
        'rosa-primary': '#D16D85', // Rosa principal
        'rosa-secondary': '#E8A4B8', // Rosa secundário
        'rosa-dark': '#B85570', // Rosa escuro
        'rosa-light': '#F5E6EA', // Rosa claro
        'lilas': '#B8A4E8', // Lilás
        'lilas-light': '#E0D5F5' // Lilás claro
      },
      // Animações personalizadas
      animation: {
        'float': 'float 6s ease-in-out infinite', // Animação de flutuação
        'heart-beat': 'heartbeat 2s ease-in-out infinite', // Batimento do coração
        'fade-in': 'fadeIn 0.5s ease-in-out', // Fade in suave
        'zoom-in': 'zoomIn 0.3s ease-out', // Zoom in
        'bounce-slow': 'bounce 3s infinite' // Bounce lento
      },
      // Definição das animações
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}