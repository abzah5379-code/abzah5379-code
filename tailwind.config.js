/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a03f28',
        'primary-container': '#c0573e',
        'on-primary': '#ffffff',
        secondary: '#4a6741',
        'secondary-container': '#d4e6ce',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#0d2008',
        tertiary: '#6b5744',
        'tertiary-container': '#88735d',
        'on-tertiary': '#ffffff',
        surface: '#fff8f5',
        'surface-container-lowest': '#f7efe8',
        'surface-container-low': '#f0e6dc',
        'surface-container': '#e8dcd2',
        'surface-container-high': '#e0d3c7',
        'surface-container-highest': '#d8c9bb',
        'on-surface': '#1f1b18',
        'on-surface-variant': '#52443d',
        'outline-variant': 'rgba(115,103,97,0.15)',
      },
      fontFamily: {
        display: ['Heebo', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Heebo', 'Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.8rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'title-lg': ['1.5rem', { lineHeight: '1.3' }],
        'title-md': ['1.25rem', { lineHeight: '1.35' }],
        'label-md': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(31, 27, 24, 0.06)',
        'ambient-lg': '0 30px 60px rgba(31, 27, 24, 0.08)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
