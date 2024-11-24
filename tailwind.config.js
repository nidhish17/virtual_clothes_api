/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx}"
  ],
  theme: {
    extend: {
        height: {
            "img-container": "36rem",
            "result-container": "50rem"
        }
    },
  },
  plugins: [],
}

