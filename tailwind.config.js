/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        brand: {
          primary: 'var(--brand-primary)',
          'on-primary': 'var(--brand-on-primary)',
          accent: 'var(--brand-accent)',
          container: 'var(--brand-container)',
          'on-container': 'var(--brand-on-container)',
        },
        surface: {
          variant: 'var(--surface-variant)',
          container: 'var(--surface-container)',
          'container-high': 'var(--surface-container-high)',
        },
        border: {
          strong: 'var(--border-strong)',
          subtle: 'var(--border-subtle)',
        },
        outline: {
          DEFAULT: 'var(--outline)',
          variant: 'var(--outline-variant)',
        },
        state: {
          success: 'var(--state-success)',
          warning: 'var(--state-warning)',
          error: 'var(--state-error)',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '28px',
        pill: '9999px',
      },
      fontFamily: {
        sans: ['Roboto Flex', 'Google Sans', 'Roboto', 'sans-serif'],
        display: ['Google Sans Display', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'section-mobile': '56px',
        'section-desktop': '96px',
      }
    },
  },
  plugins: [],
}
