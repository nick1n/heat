/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '.8' },
          '100%': { transform: 'translate(-50%, -50%) scale(3)', opacity: '0' }
        },
        'card-out': {
          '0%': { transform: 'translateX(0) rotateZ(0deg)', opacity: 1 },
          '100%': { transform: 'translateX(150%) rotateZ(15deg)', opacity: 0 }
        },
        'card-in': {
          '0%': { transform: 'translateX(-150%) rotate(-15deg)', opacity: 0 },
          '100%': { transform: 'translateX(0) rotate(0deg)', opacity: 1 }
        }
      },
      animation: {
        ripple: 'ripple 2s 5s ease-out infinite',
        'card-out': 'card-out 0.5s cubic-bezier(0, 0.5, 0.2, 1) forwards',
        'card-in': 'card-in 0.5s cubic-bezier(0.3, 1.4, 0.6, 1) forwards'
      }
    }
  },
  plugins: []
}
