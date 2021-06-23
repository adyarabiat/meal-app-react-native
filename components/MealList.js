import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "./MealItem";

const MealList = (props) => {
   // we add this just to make sure that from the start that we are passing if it is isFav or not not to wait until we click it and to be updated fast
   const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

   return (
      <View style={styles.list}>
         <FlatList
            data={props.displayedMeals}
            renderItem={(itemData) => {
               return (
                  <MealItem
                     onSelectMeal={() => {
                        const isFavorit = favoriteMeals.some(
                           (meal) => meal.id === itemData.item.id
                        );

                        props.navigation.navigate({
                           routeName: "MealDetails",
                           params: {
                              mealId: itemData.item.id,
                              mealsTitle: itemData.item.title,
                              isFav: isFavorit,
                           },
                        });
                     }}
                     image={itemData.item.imageUrl}
                     title={itemData.item.title}
                     duration={itemData.item.duration}
                     complexity={itemData.item.complexity}
                     affordability={itemData.item.affordability}
                  />
               );
            }}
         />
      </View>
   );
};

export default MealList;

const styles = StyleSheet.create({
   list: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});
