module.exports = {
  content: [
    './templates/**/*.html',
    './parts/**/*.html',
    './patterns/*.php',
    './build/*.js',
    './functions.php',
    './src/**/*.css'
  ],
  prefix: 'tw-',
  darkMode: 'class',
  theme: {
      extend: {
          colors: {
              primary: '#4F46E5',
              secondary: '#10B981',
              accent: '#F59E0B',
              dark: '#1E293B',
              light: '#F8FAFC'
          },
          fontFamily: {
              sans: ['Inter', 'system-ui', 'sans-serif'],
          },
      },
      screens:{
        'wpmobile': {'max':'600px'}, // wordpress mobile breakpoint
      }
  },
  plugins: [],
  corePlugins:{
    preflight: false,
  }
}
