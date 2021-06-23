import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
   const meals = useSelector((state) => state.meals.filteredMeals);

   const selectedParam = props.navigation.getParam("categoryId");

   const displayedMeals = meals.filter((meal) => {
      return meal.categoryIds.indexOf(selectedParam) >= 0;
   });

   if (displayedMeals.length === 0) {
      return (
         <View style={styles.content}>
            <DefaultText>No meals found, maybe check your filters?</DefaultText>
         </View>
      );
   }
   return (
      <MealList navigation={props.navigation} displayedMeals={displayedMeals} />
   );
};

// React Navigation gives me an option to get the param as how we get it in the component so we get the data exactly like the normal component
CategoryMealsScreen.navigationOptions = (navigationData) => {
   const selectedParam = navigationData.navigation.getParam("categoryId");
   const selectedCategory = CATEGORIES.find((cat) => {
      return cat.id === selectedParam;
   });
   return {
      headerTitle: selectedCategory.title,
   };
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
   content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});
