/** @type {import('tailwindcss').Config} */

const { url } = require('inspector')
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './components/*.{js,ts,jsx,tsx}',
    './pages/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6,',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'grid-cols-10',
    'grid-cols-11',
    'grid-cols-12',
  ],
  theme: {
    screens: {
      '2xl': { max: '1538px' },
      xl: { max: '1279px' },
      lg: { max: '1123px' },
      md: { max: '868px' },
      sm: { max: '639px' },
      xs: { max: '520px' },
    },
    listStyleType: {
      custom: 'url("/public/globe.svg")',
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      backgroundImage: {
        main: 'url(https://www.conatel.biz/wp-content/uploads/2016/05/net-bg-1.png)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '25%, 75%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
        },
      },
      animation: {
        shake: 'shake .3s ease-in-out 2',
      },
    },
  },
  plugins: [
    plugin(function groupPeer({ addVariant }) {
      let pseudoVariants = [
        // ... Any other pseudo variants you want to support.
        // See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
        'checked',
      ].map((variant) => (Array.isArray(variant) ? variant : [variant, `&:${variant}`]))

      for (let [variantName, state] of pseudoVariants) {
        addVariant(`group-peer-${variantName}`, (ctx) => {
          let result = typeof state === 'function' ? state(ctx) : state
          return result.replace(/&(\S+)/, ':merge(.peer)$1 ~ .group &')
        })
      }
    }),
  ],
}
