import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/pages/**/*.{vue,js,ts}',
    './app/components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './app/app.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        neutral: 'var(--color-neutral)',
        'bg-card': 'var(--color-bg-card)',
        dark: 'var(--color-dark)',
        'text-muted': 'var(--color-text-muted)',
      },
      spacing: {
        layout: 'var(--space-layout)', // 1.5rem
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        xl: 'var(--radius-xl)',
      },
      pad: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        sans: ['"Irina Sans"', 'ui-sans-serif', 'system-ui'],
        serif: ['"Irina Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
