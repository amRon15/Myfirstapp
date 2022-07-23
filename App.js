import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Navigation/screens/Home";
import CheckItems from "./Navigation/screens/CheckItems";
import AddItems from "./Navigation/screens/AddItems";
import Setting from "./Navigation/screens/Setting";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Load } from "./components/additems/Edit";
import { useContext } from "react";

export default function App() {
  const homeName = "主頁";
  const CheckItemsName = "款項";
  const AddItemsName = "新增";
  const settingsName = "設定";

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === homeName) {
                iconName = focused ? "home" : "home-outline";
              } else if (rn === AddItemsName) {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (rn === CheckItemsName) {
                iconName = focused ? "wallet" : "wallet-outline";
              } else if (rn === settingsName) {
                iconName = focused ? "settings" : "settings-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FF773D",
            tabBarStyle: {
              height: 70,
              borderRadius: 10,
              padding: 10,
            },
            tabBarLabelStyle: {
              paddingBottom: 10,
              fontSize: 13,
            },
          })}
        >
          <Tab.Screen name={homeName} component={Home} />
          <Tab.Screen name={AddItemsName} component={AddItems} options={{ headerShown: false }} />
          <Tab.Screen name={CheckItemsName} component={CheckItems} options={{ headerShown: false }} />
          <Tab.Screen name={settingsName} component={Setting} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
