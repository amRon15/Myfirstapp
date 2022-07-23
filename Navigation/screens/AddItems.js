import * as React from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, keyboard, Keyboard, TouchableOpacity } from "react-native";
import Edit from "../../components/additems/Edit";
import TypeOption from "./TypeOption";
import { createStackNavigator } from "@react-navigation/stack";

const AddItems = () => {
  const AddItemsStack = createStackNavigator();

  return (
    <AddItemsStack.Navigator initialRouteName="新增交易">
      <AddItemsStack.Screen name="新增交易" component={Edit} style={styles.container} initialParams={{ typeName: "選項" }} />
      <AddItemsStack.Screen name="類型" component={TypeOption} />
    </AddItemsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
  },
});

export default AddItems;
