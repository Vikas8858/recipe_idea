# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


/*
README (notes for setup & deployment)

1) Tech stack
   - React (Vite or Create React App)
   - Tailwind CSS for styling (utility classes used in component)
   - TheMealDB public API (no API key required)

2) How to run locally (Vite example)
   - npm create vite@latest recipe-ideas -- --template react
   - cd recipe-ideas
   - npm install
   - Install Tailwind: follow Tailwind + Vite setup: https://tailwindcss.com/docs/guides/vite
   - Replace src/App.jsx with the provided App component content.
   - npm run dev

3) Deploy
   - Push to GitHub and deploy to CodeSandbox, StackBlitz or Vercel/Netlify.

4) Features implemented
   - Search by ingredient (debounced)
   - Grid of meal cards with thumbnails
   - View full recipe details (modal) using lookup endpoint
   - Error handling and empty states
   - Responsive layout

5) Possible improvements
   - Add filters (category, area), save favorites (localStorage), add shopping list export, add time-to-cook estimate, unit conversion.
*/