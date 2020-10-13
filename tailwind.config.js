module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'display' : ['sf-pro', 'Arial', 'sans-serif'],
      },
      height: {
        '14' : '3.5rem'
      },
      colors: {
        'gray-secondary': '#F1F3F6',
        'purple-primary' : '#3A4276',
        'purple-secondary' : '#7B7F9E'
      }
    },
  },
  variants: {},
  plugins: [],
}
