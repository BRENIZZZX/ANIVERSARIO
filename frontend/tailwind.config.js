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
        'rosa-primary': '#ec4899', // Rosa principal
        'rosa-secondary': '#f472b6', // Rosa secundário
        'rosa-light': '#fce7f3', // Rosa claro
        'lilas': '#c084fc', // Lilás
        'lilas-light': '#e9d5ff' // Lilás claro
      },
      // Animações personalizadas
      animation: {
        'float': 'float 6s ease-in-out infinite', // Animação de flutuação
        'heart-beat': 'heartbeat 2s ease-in-out infinite', // Batimento do coração
        'fade-in': 'fadeIn 0.5s ease-in-out' // Fade in suave
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
        }
      }
    },
  },
  plugins: [],
}