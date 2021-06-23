import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

import Colors from "../constants/Colors";

const FilterSwitch = (props) => {
   return (
      <View style={styles.filterContainer}>
         <Text>{props.label}</Text>
         <Switch
            value={props.state}
            onValueChange={props.onChange}
            // the color when we switch it on
            trackColor={{ true: Colors.primaryColor }}
            // the color of the thum it self
            thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
         />
      </View>
   );
};

export default FilterSwitch;

const styles = StyleSheet.create({
   screen: {
      flex: 1,

      alignItems: "center",
   },
   title: {
      fontFamily: "open-san-bold",
      fontSize: 22,
      margin: 20,
      textAlign: "center",
   },
   filterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      marginVertical: 15,
   },
});
