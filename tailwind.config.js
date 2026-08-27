/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bg-primary)',
        bgSecondary: 'var(--bg-secondary)',
        bgTertiary: 'var(--bg-tertiary)',
        bgCard: 'var(--bg-card)',
        accentCyan: 'var(--accent-cyan)',
        accentEmerald: 'var(--accent-emerald)',
        accentPurple: 'var(--accent-purple)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
