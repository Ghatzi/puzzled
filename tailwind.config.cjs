module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  theme: {
    extend: {
      backgroundImage: {
        'body-gradient': 'linear-gradient(#380036, #0cbaba)'
      },
      colors: {
        color: {
          100: '#333333',
          200: '#380036',
          300: '#0cbaba'
        }
      }
    }
  },
  plugins: []
};
