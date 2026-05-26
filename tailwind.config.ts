import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fafafa',
        foreground: '#0a0a0a',
        muted: '#737373',
        border: '#e5e5e5',
      },
      fontFamily: {
        sans: [
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Courier New',
          'monospace',
        ],
      },
      fontSize: {
        'archive-number': ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'card-title': ['1.125rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'hero': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'section': '10rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(-50%, -50%) translateY(0px)' },
          '50%': { transform: 'translate(-50%, -50%) translateY(-20px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
