import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const INITIAL_STATE = {
   meals: MEALS,
   filteredMeals: MEALS,
   favoriteMeals: [],
};

const mealsReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case TOGGLE_FAVORITE: {
         const existingIndex = state.favoriteMeals.findIndex(
            (meal) => meal.id === action.payload
         );
         if (existingIndex >= 0) {
            const updatedFavMeals = [...state.favoriteMeals];
            updatedFavMeals.splice(existingIndex, 1);
            return {
               ...state,
               favoriteMeals: updatedFavMeals,
            };
         } else {
            const new_meal = state.meals.find(
               (meal) => meal.id === action.payload
            );
            const meal = state.favoriteMeals.concat(new_meal);
            return {
               ...state,
               favoriteMeals: meal,
            };
         }
      }
      case SET_FILTERS: {
         const updatedFilteredMeals = state.meals.filter((meal) => {
            // So if my payload that I recived is true so we want it glutenFree w clicked it
            // and our meal list says that it is false so it is not a gluten Free so we say ! to make it truthy
            if (action.payload.gluten && !meal.isGlutenFree) {
               return false;
            }
            if (action.payload.lactos && !meal.isLactoseFree) {
               return false;
            }
            if (action.payload.vegan && !meal.isVegan) {
               return false;
            }
            if (action.payload.vegetarian && !meal.isVagetarian) {
               return false;
            }

            // if it pass then will return true
            return true;
         });

         return { ...state, filteredMeals: updatedFilteredMeals };
      }

      default:
         return state;
   }
};

export default mealsReducer;
