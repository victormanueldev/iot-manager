module.exports = {
  theme: {
    colors: {
      indigo: {
        100: '#6c63ff',
        300: '#494ae1',
        500: '#1932c4',
        700: '#001ca7',
        900: '#00078b'
      },
      blue: '#007ace',
      green: '#54CC3B',
      red: '#F20D30',
      gray: {
        100: '#F3F2FF',
        300: '#b1adc0',
        500: '#707070',
        700: '#686476',
        900: '#464353'
      },
      white: '#ffffff'
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    screens: {
      'xs': '360px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {}
  },
  variants: {},
  plugins: []
}
