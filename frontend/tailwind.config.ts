import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#b7d3ff',
          300: '#89b6ff',
          400: '#568eff',
          500: '#2f65ff',
          600: '#1a44f0',
          700: '#1533c9',
          800: '#152ea1',
          900: '#0f2472',
          950: '#0b1a52',
        },
        accent: {
          400: '#2dd4c8',
          500: '#14b8ac',
          600: '#0e968c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -4px rgba(15, 36, 114, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
