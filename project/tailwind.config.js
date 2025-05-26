/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6EEF9',
          100: '#CCDDF3',
          200: '#99BBE7',
          300: '#6699DB',
          400: '#3377CF',
          500: '#3366CC', // Main primary color
          600: '#2952A3',
          700: '#1F3D7A',
          800: '#142952',
          900: '#0A1429',
        },
        alert: {
          50: '#FFF5E6',
          100: '#FFEACC',
          200: '#FFD699',
          300: '#FFC266',
          400: '#FFAD33',
          500: '#FF9933', // Main alert color
          600: '#CC7A29',
          700: '#995C1F',
          800: '#663D14',
          900: '#331F0A',
        },
        danger: {
          50: '#F9E6E6',
          100: '#F3CCCC',
          200: '#E79999',
          300: '#DB6666',
          400: '#CF3333',
          500: '#CC3333', // Main danger color
          600: '#A32929',
          700: '#7A1F1F',
          800: '#521414',
          900: '#290A0A',
        },
        success: {
          50: '#E6F9EE',
          100: '#CCF3DD',
          200: '#99E7BB',
          300: '#66DB99',
          400: '#33CF77',
          500: '#33CC66', // Main success color
          600: '#29A352',
          700: '#1F7A3D',
          800: '#145229',
          900: '#0A2914',
        },
        neutral: {
          50: '#F5F5F5',
          100: '#EBEBEB',
          200: '#D6D6D6',
          300: '#C2C2C2',
          400: '#ADADAD',
          500: '#999999',
          600: '#7A7A7A',
          700: '#5C5C5C',
          800: '#3D3D3D',
          900: '#1F1F1F',
        }
      },
      animation: {
        'typing': 'typing 1.5s steps(3) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '1em' }
        }
      }
    }
  },
  plugins: [],
};