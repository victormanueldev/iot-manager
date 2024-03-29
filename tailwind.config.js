module.exports = {
  theme: {
    colors: {
      indigo: {
        100: '#6c63ff',
        200: '#b3a7dd',
        300: '#494ae1',
        500: '#1932c4',
        700: '#001ca7',
        900: '#00078b'
      },
      blue: '#007ace',
      green: '#54CC3B',
      red: {
        100: '#e49c93',
        900: '#f20d30'
      },
      gray: {
        100: '#EDF2F6',
        300: '#777297',
        500: '#5B5775',
        700: '#686476',
        800: "#727272",
        900: '#464353'
      },
      purple: {
        100: "#E3E1FF"
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
      'xs': '0px',
      'sm': '536px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    inset: {
      '0'     : 0,
      'auto'  : 'auto',
      '23'    : '23px',
      '10'    : '10px',
      '39'   : '-39px'
    },
    extend: {}
  },
  variants: {},
  plugins: []
}
