import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Design Tokens ──────────────────────────────────
      colors: {
        // Brand primaries — warm rose-gold
        primary: {
          50:  '#fdf6f0',
          100: '#faeada',
          200: '#f3ceaf',
          300: '#e9ad80',
          400: '#d98c55',
          500: '#C9A98A', // main brand warm gold
          600: '#A07850',
          700: '#7d5b3a',
          800: '#5a4028',
          900: '#3a2818',
          950: '#1e1208',
        },
        // Accent — deep botanical green
        accent: {
          50:  '#eef4f2',
          100: '#d0e7e1',
          200: '#9fcfc3',
          300: '#6aafa0',
          400: '#3d8b7b',
          500: '#2C4A3E', // main accent
          600: '#223b31',
          700: '#1a2d25',
          800: '#111e19',
          900: '#090f0d',
        },
        // Warm neutrals
        warm: {
          50:  '#FAF8F5', // background
          100: '#F5F1EC',
          200: '#EDE7DF',
          300: '#E0D6CB',
          400: '#CFC2B2',
          500: '#B8A694',
          600: '#9B8673',
          700: '#7D6B59',
          800: '#5E5041',
          900: '#3D342B',
          950: '#1A1614', // text primary
        },
        // Semantic
        success: { DEFAULT: '#3D8B6F', light: '#d1f0e6', dark: '#2a6350' },
        error:   { DEFAULT: '#C44B3A', light: '#fde8e5', dark: '#963829' },
        warning: { DEFAULT: '#D4883A', light: '#fdf0e1', dark: '#a86520' },
        info:    { DEFAULT: '#4A7FC1', light: '#ddeaf8', dark: '#375f94' },
      },

      // ─── Typography ──────────────────────────────────────
      fontFamily: {
        serif: ['var(--font-playfair)', ...fontFamily.serif],
        sans:  ['var(--font-inter)',     ...fontFamily.sans],
      },
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1rem' }],
        sm:   ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem',     { lineHeight: '1.5rem' }],
        lg:   ['1.125rem', { lineHeight: '1.75rem' }],
        xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':['1.5rem',   { lineHeight: '2rem' }],
        '3xl':['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':['2.25rem',  { lineHeight: '2.5rem' }],
        '5xl':['3rem',     { lineHeight: '1.15' }],
        '6xl':['3.75rem',  { lineHeight: '1.1' }],
        '7xl':['4.5rem',   { lineHeight: '1.05' }],
        '8xl':['6rem',     { lineHeight: '1' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.02em',
        tight:    '-0.01em',
        normal:   '0em',
        wide:     '0.02em',
        wider:    '0.05em',
        widest:   '0.1em',
        ultra:    '0.2em',
      },

      // ─── Spacing ─────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '54':  '13.5rem',
        '58':  '14.5rem',
        '62':  '15.5rem',
        '66':  '16.5rem',
        '72':  '18rem',
        '76':  '19rem',
        '84':  '21rem',
        '88':  '22rem',
        '92':  '23rem',
        '96':  '24rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '140': '35rem',
        '160': '40rem',
      },

      // ─── Max Widths ──────────────────────────────────────
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      // ─── Border Radius ───────────────────────────────────
      borderRadius: {
        'none': '0',
        'sm':   '0.25rem',
        DEFAULT:'0.375rem',
        'md':   '0.5rem',
        'lg':   '0.75rem',
        'xl':   '1rem',
        '2xl':  '1.25rem',
        '3xl':  '1.5rem',
        'full': '9999px',
      },

      // ─── Box Shadows ─────────────────────────────────────
      boxShadow: {
        'sm':     '0 1px 2px 0 rgba(26,22,20,0.05)',
        DEFAULT:  '0 1px 3px 0 rgba(26,22,20,0.1), 0 1px 2px -1px rgba(26,22,20,0.1)',
        'md':     '0 4px 6px -1px rgba(26,22,20,0.1), 0 2px 4px -2px rgba(26,22,20,0.1)',
        'lg':     '0 10px 15px -3px rgba(26,22,20,0.1), 0 4px 6px -4px rgba(26,22,20,0.1)',
        'xl':     '0 20px 25px -5px rgba(26,22,20,0.1), 0 8px 10px -6px rgba(26,22,20,0.1)',
        '2xl':    '0 25px 50px -12px rgba(26,22,20,0.25)',
        'inner':  'inset 0 2px 4px 0 rgba(26,22,20,0.05)',
        'card':   '0 2px 12px rgba(26,22,20,0.08)',
        'card-hover': '0 8px 30px rgba(26,22,20,0.14)',
        'glow-primary': '0 0 0 3px rgba(201,169,138,0.35)',
        'glow-accent':  '0 0 0 3px rgba(44,74,62,0.25)',
        'none':  'none',
      },

      // ─── Transitions ─────────────────────────────────────
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-elegant':  'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out-elegant': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      // ─── Animations ──────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-4px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'check-draw': {
          '0%':   { strokeDashoffset: '60' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-in':       'fade-in 400ms ease-out forwards',
        'fade-up':       'fade-up 500ms ease-out forwards',
        'fade-down':     'fade-down 400ms ease-out forwards',
        'slide-in-right':'slide-in-right 350ms cubic-bezier(0.25,0.1,0.25,1)',
        'slide-out-right':'slide-out-right 300ms cubic-bezier(0.25,0.1,0.25,1)',
        'slide-in-left': 'slide-in-left 350ms cubic-bezier(0.25,0.1,0.25,1)',
        'scale-in':      'scale-in 200ms ease-out',
        'bounce-subtle': 'bounce-subtle 600ms ease-in-out',
        'shimmer':       'shimmer 2s infinite linear',
        'spin-slow':     'spin-slow 2s linear infinite',
        'pulse-ring':    'pulse-ring 1.5s ease-out infinite',
        'check-draw':    'check-draw 500ms ease-out forwards',
      },
    },
  },
  plugins: [
    // @tailwindcss/forms provides better form base styles
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('@tailwindcss/typography'),
  ],
};

export default config;
