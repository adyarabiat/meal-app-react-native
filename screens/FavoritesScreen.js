import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {
   const favMeals = useSelector((state) => state.meals.favoriteMeals);

   if (favMeals.length === 0 || !favMeals) {
      return (
         <View style={styles.content}>
            <DefaultText>
               No Favorite Meals Found. Start adding some!
            </DefaultText>
         </View>
      );
   }
   return <MealList navigation={props.navigation} displayedMeals={favMeals} />;
};

export default FavoritesScreen;

FavoritesScreen.navigationOptions = (navData) => {
   // we configure the styling and stuff in the navigation it self

   return {
      headerTitle: "Your Favorites",
      headerLeft: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Menu"
               iconName="ios-menu"
               onPress={() => {
                  navData.navigation.toggleDrawer();
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});
