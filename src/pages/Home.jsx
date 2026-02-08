import { useState } from 'react'
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';


function Home() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const searchRecipes = async () => {
    if (!search) return;

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      if (!data.meals) {
        setError("No recipes found");
      } else {
        setRecipes(data.meals);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* HEADER */}
      <header className='bg-green-500 text-white py-4 shadow-md'>
        <div className='max-w-4xl mx-auto flex items-center justify-between px-6'>
          <div>
            <h1 className='text-3xl font-bold'>
              Recipe Finder
            </h1>
            <p className='text-green-100 text-sm'>
              Discover simple and delicious meals with our recipe finder app.
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className='bg-white text-green-600 px-4 py-2 rounded-lg font-semibold cursor-pointer'
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>      
      </header>

      {/* MAIN CONTENT */}
      <main className='max-w-4xl mx-auto p-6'>
        {/* SEARCH CARD */}
        <div className={darkMode ? "bg-gray-800 rounded-xl shadow-md p-6 mb-8" : "bg-white rounded-xl shadow-md p-6 mb-8"}>
          <SearchBar 
            search={search}
            setSearch={setSearch}
            onSearch={searchRecipes}
          />

        {/* CATEGORY BUTTONS */}
          <div className='flex gap-3 mb-8 flex-wrap justify-center'>
            {["chicken", "beef", "spaghetti", "seafood", "pancakes"].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSearch(category);
                  setTimeout(searchRecipes, 0);
                }}
                className='bg-white border border-green-500 text-green-600 px-4 py-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition'
              >
                {category}
              </button>
            ))}
         </div>
        </div>
        {/* LOADING STATE */}
        {loading && (
          <p className='text-center text-gray-600'>Loading recipes...</p>
        )}

        {/* ERROR STATE */}
        {error && (
          <p className='text-center text-red-500 font-semibold'>{error}</p>
        )}

        {/* Recipe Results */}
        {recipes.length === 0 && !loading && !error && (
          <p className='text-center text-gray-500'>
            Search for a recipe to get started.
          </p>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {recipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} darkMode={darkMode} />
          ))}
        </div>
      </main>

      <footer className='text-center py-6 text-gray-500 text-sm'>
        Built with React & Tailwind by Abraham
      </footer>
    </div>
  );
}

export default Home;