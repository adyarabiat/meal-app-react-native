import React from "react";
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Platform,
   TouchableNativeFeedback,
} from "react-native";

const CategoryGridTile = (props) => {
   let TouchableComp = TouchableOpacity;

   if (Platform.OS === "android" && Platform.Version >= 2) {
      TouchableComp = TouchableNativeFeedback;
   }
   return (
      <View style={styles.gridItem}>
         <TouchableComp
            style={{ flex: 1 }}
            key={props.data.item.id}
            onPress={props.onSelect}
         >
            <View
               style={{
                  ...styles.appContainer,
                  ...{ backgroundColor: props.data.item.color },
               }}
            >
               <Text style={styles.title} numberOfLines={2}>
                  {props.data.item.title}
               </Text>
            </View>
         </TouchableComp>
      </View>
   );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
   gridItem: {
      flex: 1,
      margin: 15,
      height: 150,
      borderRadius: 10,
      elevation: 5,
      // overflow: "hidden",
   },
   appContainer: {
      flex: 1,
      borderRadius: 10,
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 5,
      padding: 10,
      justifyContent: "flex-end",
      alignItems: "flex-end",
   },
   title: {
      fontFamily: "open-san-bold",
      fontSize: 22,
      textAlign: "right",
   },
});
