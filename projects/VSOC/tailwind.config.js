const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.join(__dirname, "vsoc.html")],
  theme: {
    extend: {
      fontFamily: {
        tech: ['Orbitron', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        darkBg: '#080b11',
        darkSide: '#05070c',
        cardBg: 'rgba(13, 18, 34, 0.85)',
        cyber: '#00f0ff',
        hacker: '#22c55e',
        alert: '#ff003c',
        warning: '#f97316',
        medium: '#eab308',
        info: '#8b5cf6',
      }
    },
  },
  plugins: [],
}
