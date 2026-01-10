import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         colors: {
            indigo: {
               50: '#eef2ff',
               100: '#e0e7ff',
               600: '#4f46e5',
               700: '#4338ca',
            },
            emerald: {
               100: '#d1fae5',
               700: '#047857',
            },
            amber: {
               100: '#fef3c7',
               700: '#b45309',
            },
            rose: {
               100: '#fee2e2',
               700: '#b91c1c',
            },
         },
         fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
         },
         boxShadow: {
            '3d': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
         },
      },
   },
   plugins: [],
   darkMode: 'class',
};

export default config;
