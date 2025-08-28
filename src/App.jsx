

import React, { useEffect, useState } from 'react';
import Header from './Component/Header';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [meals, setMeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchMeals() {
    if (!ingredient.trim()) return;
    try {
      setLoading(true);
      setError('');
      setMeals([]);
      setSelected(null);
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setMeals(data.meals || []);
      if (!data.meals) setError('No recipes found');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadDetails(id) {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setSelected(data.meals[0]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
     <Header/>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Search */}
          <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMeals()}
            placeholder="Enter an ingredient (e.g., chicken, tomato)"
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={searchMeals}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
          >
            Search
          </button>
        </div>

        {loading && <div className="text-center text-slate-400">Loading…</div>}
        {error && <div className="text-center text-red-400">{error}</div>}

        {/* Results Grid */}
        {!loading && !selected && meals && meals.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="cursor-pointer overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 hover:ring-2 hover:ring-emerald-400"
                onClick={() => loadDetails(meal.idMeal)}
              >
                <img src={meal.strMealThumb} alt={meal.strMeal} className="h-32 w-full object-cover" />
                <div className="p-2 text-sm font-medium">{meal.strMeal}</div>
              </div>
            ))}
          </div>
        )}

        {/* Details View */}
        {selected && (
          <div className="space-y-4">
            <button
              onClick={() => setSelected(null)}
              className="rounded-md bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600"
            >
              ← Back
            </button>
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
              <h2 className="text-xl font-semibold">{selected.strMeal}</h2>
              <img
                src={selected.strMealThumb}
                alt={selected.strMeal}
                className="mt-3 w-full max-w-md rounded-xl object-cover"
              />
              <p className="mt-3 text-sm text-slate-300">{selected.strInstructions}</p>
              <h3 className="mt-4 font-medium">Ingredients:</h3>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {Array.from({ length: 20 }, (_, i) => i + 1)
                  .map((i) => {
                    const ing = selected[`strIngredient${i}`];
                    const measure = selected[`strMeasure${i}`];
                    return ing && ing.trim() ? (
                      <li key={i} className="rounded bg-slate-700/40 px-2 py-1">
                        {ing} {measure}
                      </li>
                    ) : null;
                  })}
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Data from TheMealDB • Built with React + Tailwind
      </footer>
    </div>
  );
}
