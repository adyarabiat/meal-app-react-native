import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";

// Redux
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import MealsNavigator from "./navigation/MealsNavigation";
import mealsReducer from "./store/reducers/mealsReducer";

enableScreens(); //just a good practice to call it like this so it will improve the performance

const fetchFonts = async () => {
   await Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-san-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
   });
};

export default function App() {
   const [fontLoaded, setFontLoaded] = useState(false);

   //  To make sure that we call the finction first
   if (!fontLoaded) {
      return (
         <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(err) => console.log(err)}
         />
      );
   }

   const rootReducer = combineReducers({
      meals: mealsReducer,
   });
   const store = createStore(rootReducer);

   return (
      <Provider store={store}>
         <MealsNavigator />
      </Provider>
   );
}
