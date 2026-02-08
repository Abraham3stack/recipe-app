import { Link } from "react-router-dom";

function RecipeCard({ meal, darkMode }) {
  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className={
        darkMode
          ? "bg-gray-800 rounded-xl shadow-md overflow-hidden block transform hover:-translate-y-1 hover:shadow-lg transition duration-300"
          : "bg-white rounded-xl shadow-md overflow-hidden block transform hover:-translate-y-1 hover:shadow-lg transition duration-300"
      }
    >
      <div className="overflow-hidden">
        <img 
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className='w-full h-48 object-cover transform hover:scale-110 transition duration-300'
        />
      </div>
      <div className='p-4'>
        <h2 className={
          darkMode
            ? "text-lg font-semibold text-white"
            : "text-lg font-semibold text-gray-800"
        }>
          {meal.strMeal}
        </h2>
      </div>
    </Link>
  );
}

export default RecipeCard;