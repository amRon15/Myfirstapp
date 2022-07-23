import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Past from "../../components/checkitems/Past";
import PastMonthChart from "../../components/checkitems/PastMonthChart";
const CheckScreen = ({ navigation }) => {
  return (
    <View style={styles.conatiner}>
      <View>
        <PastMonthChart navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
export default CheckScreen;
