import React from "react";
import { FlatList } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CATEGORIES } from "../data/dummy-data";
import CustomHeaderButton from "../components/CustomHeaderButton";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
   return (
      <FlatList
         numColumns={2} //To show two columns
         data={CATEGORIES}
         renderItem={(itemData) => {
            return (
               <CategoryGridTile
                  data={itemData}
                  onSelect={() => {
                     props.navigation.navigate({
                        routeName: "CategoryMeals",
                        params: {
                           categoryId: itemData.item.id,
                        },
                     });
                  }}
               />
            );
         }}
      />
   );
};

CategoriesScreen.navigationOptions = (navData) => {
   // we configure the styling and stuff in the navigation it self

   return {
      headerTitle: "Meal Categories",
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

export default CategoriesScreen;
