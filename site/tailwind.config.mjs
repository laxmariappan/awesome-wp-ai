/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        surface: {
          900: '#060b18',
          800: '#080f1e',
          700: '#0a1323',
          600: '#0d1a2e',
          500: '#112038',
        },
      },
      animation: {
        'shimmer':      'shimmer 3.5s linear infinite',
        'card-enter':   'cardEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards',
        'float':        'float 7s ease-in-out infinite',
        'float-delay':  'float 7s ease-in-out 2.5s infinite',
        'glow-pulse':   'glowPulse 2.5s ease-in-out infinite',
        'slide-up':     'slideUp 0.25s ease',
        'fade-in':      'fadeIn 0.2s ease',
        'scale-in':     'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-right':  'slideRight 0.2s ease',
        'spin-slow':    'spin 12s linear infinite',
        'count-up':     'countUp 0.6s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        cardEnter: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.08)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-6px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(59, 130, 246, 0.25)',
        'glow':    '0 0 25px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 50px rgba(59, 130, 246, 0.35)',
        'card':    '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(59,130,246,0.2), 0 20px 50px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
