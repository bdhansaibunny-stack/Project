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
        primary: '#0066FF',
        secondary: '#00D4FF',
        accent: '#FF6B35',
        dark: '#0A1628',
        light: '#F8FAFC',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      gradients: {
        'brand': 'linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)',
      },
    },
  },
  plugins: [],
}

export default config
