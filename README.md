# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



/*   

# Recipe Ideas – React + Tailwind

A responsive web app built for the **Take-Home UI Challenge**. It allows users to search for recipes by ingredient using the free **TheMealDB API**.

---

## 🚀 Features

* Search recipes by ingredient (e.g., *chicken*, *tomato*, *rice*).
* Responsive grid of recipe cards with image + name.
* Click a recipe to view details (instructions + ingredients).
* Loading spinner, error messages, and empty state handling.
* Clean, mobile-first design with **Tailwind CSS**.

---

## 🛠️ Tech Stack

* **React (Vite)** – framework
* **Tailwind CSS** – styling
* **TheMealDB API** – data source (no API key required)

---

## 📦 Getting Started

### 1. Clone repo & install

```bash
npm create vite@latest recipe-ideas -- --template react
cd recipe-ideas
npm install
```

### 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

In `src/index.css` add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Replace App code

Copy the code from `App.jsx` provided in this repo/canvas into your project.

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

---



## 📖 API Reference

* [TheMealDB API](https://www.themealdb.com/api.php)

  * Search by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}`
  * Lookup by ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`

---

## 📌 Notes

* This project was built for the UI Take-Home Challenge.
* No authentication or API keys required.
* Mobile-first design ensures it works on all devices.

---

## 👨‍💻 Author

Built with ❤️ using React + Tailwind.


*/