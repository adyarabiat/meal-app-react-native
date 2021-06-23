import React from "react";
import { Platform, Text } from "react-native";
import Colors from "../constants/Colors";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

// we put it here becouse we are using it in both stacks
const defaultNavigationOptions = {
   headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
   },
   headerTitleStyle: {
      fontFamily: "open-san-bold",
   },
   headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
   headerTitle: "A Screen", //if not exist this will be the default
};

// Meals Stack
const MealsNavigator = createStackNavigator(
   {
      Categories: {
         screen: CategoriesScreen,
      },
      CategoryMeals: {
         screen: CategoryMealsScreen,
      },
      MealDetails: MealDetailsScreen,
   },
   {
      // initialRouteName: "Categories",
      mode: "modal",
      defaultNavigationOptions: defaultNavigationOptions,
   }
);

// Favorites Stack
const FavNavigator = createStackNavigator(
   {
      Favorites: FavoritesScreen,
      MealDetail: MealDetailsScreen,
   },
   {
      // initialRouteName: "Categories",
      mode: "modal",
      defaultNavigationOptions: defaultNavigationOptions,
   }
);

// Filters Stack
// We created the filters navigtor
const FiltersNavigator = createStackNavigator(
   {
      Filters: FiltersScreen,
   },
   {
      // initialRouteName: "Categories",
      mode: "modal",
      defaultNavigationOptions: defaultNavigationOptions,
   }
);

// So now here we are adding the tab in the bottom  and we add meals for example to take us to all the stacks we have above

const tabScreenConfig = {
   Meals: {
      screen: MealsNavigator,
      navigationOptions: {
         // tabBarLabel: "Meals", instead we add it with style but we check here for the OS becouse if I set it to <Text></Text> it will remove the color that I set it ! but if I add just text it is all fine will not change it
         tabBarLabel:
            Platform.OS === "android" ? (
               "Meals"
            ) : (
               <Text style={{ fontFamily: "open-san-bold" }}>Meals</Text>
            ),
         tabBarIcon: (tabInfo) => {
            return (
               <Ionicons
                  name="ios-restaurant"
                  size={25}
                  color={tabInfo.tintColor}
               />
            );
         },
         // this works if I set shifting to true down there for android
         tabBarColor: Colors.primaryColor,
      },
   },
   Favorites: {
      screen: FavNavigator,
      navigationOptions: {
         // tabBarLabel: "Favorites",
         tabBarLabel:
            Platform.OS === "android" ? (
               "Favorites"
            ) : (
               <Text style={{ fontFamily: "open-san-bold" }}>Favorites</Text>
            ),
         tabBarIcon: (tabInfo) => {
            return (
               <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            );
         },
         // this works if I set shifting to true down there for android
         tabBarColor: Colors.accentColor,
      },
   },
};

const MealsFavTabNavigator =
   // we use createMaterialBottomTabNavigator to make the android to make it feel more android
   Platform.OS === "android"
      ? createMaterialBottomTabNavigator(tabScreenConfig, {
           // here is directly we add the color
           activeColor: "white",
           shifting: true,
           // barStyle we use it if i do not want to use shifting
           barStyle: {
              backgroundColor: Colors.primaryColor,
           },
        })
      : createBottomTabNavigator(tabScreenConfig, {
           tabBarOptions: {
              labelStyle: {
                 fontFamily: "open-san-bold",
              },
              activeTintColor: Colors.accentColor,
           },
        });

//   Drawer Navigator
const MainNavigator = createDrawerNavigator(
   {
      MealsFavs: {
         screen: MealsFavTabNavigator,
         // we can add this here or in the navigator it self
         navigationOptions: {
            drawerLabel: "Meals",
         },
      },
      Filters: FiltersNavigator,
   },
   {
      contentOptions: {
         activeTintColor: Colors.accentColor,
         labelStyle: {
            fontFamily: "open-san-bold",
         },
      },
   }
);

export default createAppContainer(MainNavigator);
