import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from "../components/DefaultText";
import ListItem from "../components/ListItem";
import { toggleFavorite } from "../store/actions/meals"; //action creator

const MealDetailsScreen = (props) => {
   const meals = useSelector((state) => state.meals.meals);
   const dispatch = useDispatch();

   const mealId = props.navigation.getParam("mealId");

   // for the star of the favorit
   const currentMealsIsFav = useSelector((state) =>
      state.meals.favoriteMeals.some((meal) => meal.id === mealId)
   );

   useEffect(() => {
      props.navigation.setParams({ isFav: currentMealsIsFav });
   }, [currentMealsIsFav]);

   const selectedMeal = meals.find((meal) => {
      return meal.id === mealId;
   });

   const toggleFavoriteHandler = useCallback(() => {
      dispatch(toggleFavorite(mealId));
   }, [dispatch, mealId]);

   useEffect(() => {
      props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
   }, [toggleFavoriteHandler]);

   // to get the title from down when we set the navigationOptions we can use this approch  but the problem is when we run it. the title will show up but late becouse the component will run and then useEffect will fireoff so it will take a bit more time

   // solution to this
   // to forward the title before we reach this component so from the categoryMeals or favoritesScreen and there we are using the same component which is MealList

   // useEffect(() => {
   //    props.navigation.setParams({ mealsTitle: selectedMeal.title });
   // }, [meals]);

   return (
      <ScrollView>
         <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
         <View style={styles.details}>
            <DefaultText>{selectedMeal.duration}m</DefaultText>
            <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
            <DefaultText>
               {selectedMeal.affordability.toUpperCase()}
            </DefaultText>
         </View>
         <Text style={styles.title}>Ingredients</Text>
         {selectedMeal.ingredients.map((ingredient) => {
            return <ListItem key={ingredient}>{ingredient}</ListItem>;
         })}
         <Text style={styles.title}>Steps</Text>
         {selectedMeal.steps.map((step) => {
            return <ListItem key={step}>{step}</ListItem>;
         })}
      </ScrollView>
   );
};

export default MealDetailsScreen;

MealDetailsScreen.navigationOptions = (navigationData) => {
   // this param coming from the MealItem we are forwarding it from there
   const title = navigationData.navigation.getParam("mealsTitle");

   const toggleFavorite = navigationData.navigation.getParam("toggleFav");

   // we set it up here in the component
   const isFavorit = navigationData.navigation.getParam("isFav");

   return {
      headerTitle: title,
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Favorite"
               iconName={isFavorit ? "ios-star" : "ios-star-outline"}
               onPress={() => {
                  toggleFavorite();
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   image: {
      width: "100%",
      height: 200,
   },
   details: {
      flexDirection: "row",
      padding: 15,
      justifyContent: "space-around",
   },
   title: {
      fontFamily: "open-san-bold",
      fontSize: 22,
      textAlign: "center",
   },
});
