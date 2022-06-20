/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#D9CEB2',
        innocence: '#D9CEB2',
        "kind-giant": '#948C75',
        bond: '#D5DED9',
        pachyderm: '#7A6A53',
        forever: '#99B2B7'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
