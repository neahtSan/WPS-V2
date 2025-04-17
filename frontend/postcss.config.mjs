/** @type {import('postcss').Postcss} */
const config = {
  plugins: {
    '@tailwindcss/postcss7-compat': {},
    autoprefixer: {},
  },
};

export default config;