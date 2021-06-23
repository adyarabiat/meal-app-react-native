import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import FilterSwitch from "../components/FilterSwitch";
import { setFilters } from "../store/actions/meals";

const FiltersScreen = (props) => {
   const [isGlutenFree, setIsGlutenFree] = useState(false);
   const [isLactoseFree, setIsLactoseFree] = useState(false);
   const [isVegan, setIsVegan] = useState(false);
   const [isVegetarian, setIsVegetarian] = useState(false);

   const dispatch = useDispatch();

   // we use useCallback to make sure that useEffect comparing right and caching and to not go into infinite loop
   const saveFilters = useCallback(() => {
      const save = {
         gluten: isGlutenFree,
         lactos: isLactoseFree,
         vegan: isVegan,
         vegetarian: isVegetarian,
      };
      console.log(save);
      dispatch(setFilters(save));
   }, [
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian,
      setFilters,
      dispatch,
   ]);

   useEffect(() => {
      props.navigation.setParams({ save: saveFilters });
   }, [saveFilters]);

   return (
      <View style={styles.screen}>
         <Text style={styles.title}>Available Filters / Restrictions</Text>
         <FilterSwitch
            label="Gluten-free"
            state={isGlutenFree}
            onChange={(newVal) => setIsGlutenFree(newVal)}
         />
         <FilterSwitch
            label="Lactose-free"
            state={isLactoseFree}
            onChange={(newVal) => setIsLactoseFree(newVal)}
         />
         <FilterSwitch
            label="Vegan"
            state={isVegan}
            onChange={(newVal) => setIsVegan(newVal)}
         />
         <FilterSwitch
            label="Vegetarian"
            state={isVegetarian}
            onChange={(newVal) => setIsVegetarian(newVal)}
         />
      </View>
   );
};
export default FiltersScreen;

// For navigation
FiltersScreen.navigationOptions = (navData) => {
   // we configure the styling and stuff in the navigation it self
   return {
      headerTitle: "Filtered Meals",
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
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Save"
               iconName="ios-save"
               onPress={() => {
                  navData.navigation.getParam("save")(); //we run the function here by ()
                  // or we can remove the annonymose function
                  // So we say  onPress={navData.navigation.getParam("save")} it will run without () becouse onPress will run it for us
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: "center",
   },
});
