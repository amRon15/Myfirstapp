import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CheckScreen from "./CheckScreen";
import Check from "./Check";
//this screen call 款項
const CheckItems = () => {
  const CheckItemsScreen = createStackNavigator();

  return (
    <CheckItemsScreen.Navigator initialRouteName="消費記錄">
      <CheckItemsScreen.Screen name="消費記錄" component={CheckScreen} />
      <CheckItemsScreen.Screen name="全部交易" component={Check} />
    </CheckItemsScreen.Navigator>
  );
};

export default CheckItems;
