import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RecipesContext from './RecipesContext';

function RecipesContextProvider({ children }) {
  const zero = 0;
  const [recipe, setRecipe] = useState({});
  const [globalRecipes, setGlobalRecipes] = useState({});
  const [finishRecipe, setFinisRecipe] = useState(false);
  const [counter, setCounter] = useState(zero);
  const [isFetching, setIsFetching] = useState(true);
  const [isOnlyOne, setIsOnlyOne] = useState(false);
  const [firstTwelveRecipes, setFirstTwelveRecipes] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [idParams, setIdParams] = useState('');
  const [done, setDone] = useState(false);
  const [doing, setDoing] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [filter, setFilter] = useState('All');
  const twelve = 12;

  useEffect(() => {
    if (globalRecipes.drinks !== undefined) {
      setIsFetching(false);
      if (globalRecipes.drinks !== null && globalRecipes.drinks.length === 1) {
        setIsOnlyOne(true);
      } else if (globalRecipes.drinks !== null) {
        setFirstTwelveRecipes(globalRecipes.drinks.slice(zero, twelve));
      }
    }
    if (globalRecipes.meals !== undefined) {
      setIsFetching(false);
      if (globalRecipes.meals !== null && globalRecipes.meals.length === 1) {
        setIsOnlyOne(true);
      } else if (globalRecipes.meals !== null) {
        setFirstTwelveRecipes(globalRecipes.meals.slice(zero, twelve));
      }
    }
  }, [globalRecipes]);

  const filterFoodByCategory = async (category) => {
    if (!filtered || filter !== category) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const filteredMeals = await response.json();
      setFirstTwelveRecipes(filteredMeals.meals.slice(zero, twelve));
      setIsFetching(false);
      setFilter(category);
      setFiltered(true);
    } else {
      setFiltered(false);
    }
  };

  const filterDrinkByCategory = async (category) => {
    if (!filtered || filter !== category) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const filteredDrinks = await response.json();
      setFirstTwelveRecipes(filteredDrinks.drinks.slice(zero, twelve));
      setIsFetching(false);
      setFilter(category);
      setFiltered(true);
    } else {
      setFiltered(false);
    }
  };

  return (
    <RecipesContext.Provider
      value={ {
        idParams,
        setIdParams,
        doing,
        done,
        setDoing,
        setDone,
        isFetching,
        setIsFetching,
        globalRecipes,
        setGlobalRecipes,
        isOnlyOne,
        firstTwelveRecipes,
        setFirstTwelveRecipes,
        recipe,
        setRecipe,
        recipeIngredients,
        setRecipeIngredients,
        finishRecipe,
        setFinisRecipe,
        counter,
        setCounter,
        filterFoodByCategory,
        filterDrinkByCategory,
        filter,
        setFilter,
        filtered,
        setFiltered,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesContextProvider;
