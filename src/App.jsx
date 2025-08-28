
import React, { useEffect, useState } from 'react';

// App.jsx
export default function App() {
  const [ingredient, setIngredient] = useState('chicken');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [queryTimeout, setQueryTimeout] = useState(null);

  // Fetch by ingredient
  async function fetchMealsByIngredient(q) {
    if (!q) {
      setMeals([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(q)}`);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (e) {
      setError('Network error — try again');
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch full meal details
  async function fetchMealDetails(id) {
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setSelectedMeal(data.meals ? data.meals[0] : null);
    } catch (e) {
      setError('Could not load recipe details');
    } finally {
      setLoading(false);
    }
  }

  // Debounced search as user types
  useEffect(() => {
    if (queryTimeout) clearTimeout(queryTimeout);
    const t = setTimeout(() => {
      fetchMealsByIngredient(ingredient.trim());
    }, 450);
    setQueryTimeout(t);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredient]);

  // initial load
  useEffect(() => { fetchMealsByIngredient(ingredient); }, []);

  return (
    <div className="min-h-screen p-6 text-gray-900 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-4xl mx-auto ">
        <header className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold">Recipe Ideas — Taylor</h1>
            <p className="text-sm text-gray-600">Quick dinner ideas based on what you have in the fridge.</p>
          </div>
          <div className="w-full sm:w-60">
            <label className="block mb-1 text-xs font-medium">Search by ingredient</label>
            <input
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="e.g. chicken, tomato, rice"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </header>

        <main>
          <section className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Results</h2>
              <div className="text-sm text-gray-600">{loading ? 'Loading…' : `${meals.length} recipes`}</div>
            </div>
          </section>

          {error && (
            <div className="p-3 mb-4 text-red-700 border border-red-200 rounded bg-red-50">{error}</div>
          )}

          <section>
            {meals.length === 0 && !loading ? (
              <div className="p-6 text-center text-gray-600 border rounded">No recipes found. Try another ingredient.</div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {meals.map((meal) => (
                  <article key={meal.idMeal} className="p-3 transition bg-white rounded-lg shadow-sm hover:shadow-md">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="object-cover w-full h-40 rounded" />
                    <div className="mt-3">
                      <h3 className="font-semibold">{meal.strMeal}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={() => fetchMealDetails(meal.idMeal)}
                          className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
                        >
                          View recipe
                        </button>
                        <button
                          onClick={() => navigator.clipboard?.writeText(meal.strMeal)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Copy name
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Modal / details */}
          {selectedMeal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedMeal(null)} />
              <div className="relative z-10 max-w-3xl w-full bg-white rounded-lg overflow-auto max-h-[90vh] p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold">{selectedMeal.strMeal}</h3>
                  <button onClick={() => setSelectedMeal(null)} className="text-gray-500">Close</button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <img src={selectedMeal.strMealThumb} alt="thumb" className="w-full rounded md:col-span-1" />
                  <div className="md:col-span-2">
                    <p className="mb-3 text-sm text-gray-600">Category: {selectedMeal.strCategory} • Cuisine: {selectedMeal.strArea}</p>
                    <h4 className="mb-2 font-semibold">Ingredients</h4>
                    <ul className="grid grid-cols-2 gap-1 mb-4 text-sm">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const ing = selectedMeal[`strIngredient${i + 1}`];
                        const measure = selectedMeal[`strMeasure${i + 1}`];
                        return ing ? <li key={i} className="text-sm">{measure} {ing}</li> : null;
                      })}
                    </ul>

                    <h4 className="mb-2 font-semibold">Instructions</h4>
                    <p className="text-sm whitespace-pre-line">{selectedMeal.strInstructions}</p>

                    {selectedMeal.strSource && (
                      <p className="mt-3 text-sm">Source: <a href={selectedMeal.strSource} target="_blank" rel="noreferrer" className="text-indigo-600">Open</a></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-8 text-xs text-center text-gray-500">
          Built for the Take-Home UI challenge — uses TheMealDB public API.
        </footer>
      </div>
    </div>
  );
}


