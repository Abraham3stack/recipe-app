import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setRecipe(data.meals[0]);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading recipe...
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">
            {recipe.strMeal}
          </h1>

          <p className="text-gray-700 mb-6">
            {recipe.strInstructions}
          </p>

          <Link
            to='/'
            className="inline-block bg-green-500 text-white px-4 py-2 rounded"
          >
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;