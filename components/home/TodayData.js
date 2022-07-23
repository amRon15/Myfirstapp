import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useMemo, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
const TodayData = () => {
  const [savedData, setSavedData] = useState();
  const [todayValue, setTodayValue] = useState();
  const [todayDate, setTodayDate] = useState();

  let tempDate = new Date();
  let today = tempDate.getDate();
  let tMonth = tempDate.getMonth();
  let tYear = tempDate.getFullYear();

  const loadData = async () => {
    try {
      let allData = await AsyncStorage.getItem("dataDetail");
      if (allData !== null) {
        // await setSavedData(JSON.parse([allData]));
        const jsonData = JSON.parse([allData]);
        const sumOfValue = jsonData.reduce((prev, x) => {
          if (x.thatDay === today && x.thatMonth === tMonth && x.thatYear === tYear) {
            return prev + x.value;
          }
          return prev;
        }, 0);
        setTodayValue(sumOfValue);
      }
    } catch (err) {
      console.warn("loadData " + err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text style={styles.title}>${todayValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    maxWidth: "80%",
    fontSize: 32,
    paddingTop: 10,
  },
});
export default TodayData;
