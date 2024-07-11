import type { Config } from 'tailwindcss';
import withMT from '@material-tailwind/react/utils/withMT';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['poppins', 'sans-serif'],
      },
      maxWidth: {
        '2xl': '40rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fade-in 0.5s linear forwards',
        marquee: 'marquee var(--marquee-duration) linear infinite',
        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
      colors: {
        maroon: {
          50: '#FBF4F6',
          100: '#F8E9EC',
          200: '#ECC8D0',
          300: '#E1A7B3',
          400: '#CB667B',
          500: '#B42442',
          600: '#A2203B',
          700: '#6C1628',
          800: '#51101E',
          900: '#360B14',
        },
        zinc: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#171717',
          950: '#09090B',
        },
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            strong: {
              fontWeight: theme('fontWeight.extrabold'),
              color: theme('colors.zinc.800'),
              '.dark &': {
                color: theme('colors.zinc.200'),
              },
            },
            a: {
              color: theme('colors.zinc.800'),
              '.dark &': {
                color: theme('colors.zinc.200'),
              },
            },
            h1: {
              color: theme('colors.zinc.800'),
              '.dark &': {
                color: theme('colors.zinc.200'),
              },
            },
            h2: {
              color: theme('colors.zinc.800'),
              '.dark &': {
                color: theme('colors.zinc.200'),
              },
            },
          },
        },
      }),
    },
  },
};
export default withMT(config);
