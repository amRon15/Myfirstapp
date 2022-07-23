import React from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const Past = () => {
  const [pThreeMValue, setPThreeMValue] = useState();
  const [pastYear, setPastYear] = useState();
  const [thisMonthValue, setThisMonthValue] = useState();
  const [refresh, setRefresh] = useState();

  let tempDate = new Date();
  let thisYear = tempDate.getFullYear();
  let thisMonth = tempDate.getMonth();
  let threeMonthAgo = new Date();
  if (threeMonthAgo.getMonth() + 1 <= 9 && threeMonthAgo.getDate() <= 9) {
    threeMonthAgo = threeMonthAgo.getFullYear() + "-" + 0 + (threeMonthAgo.getMonth() - 2) + "-" + 0 + threeMonthAgo.getDate();
  } else if (threeMonthAgo.getMonth() + 1 <= 9) {
    threeMonthAgo = tempDate.getFullYear() + "-" + 0 + (threeMonthAgo.getMonth() - 2) + "-" + threeMonthAgo.getDate();
  } else if (threeMonthAgo.getDate() <= 9) {
    threeMonthAgo = threeMonthAgo.getFullYear() + "-" + (threeMonthAgo.getMonth() - 2) + "-" + 0 + threeMonthAgo.getDate();
  } else {
    threeMonthAgo = threeMonthAgo.getFullYear() + "-" + (threeMonthAgo.getMonth() - 2) + "-" + threeMonthAgo.getDate();
  }

  let setDate;
  if (tempDate.getMonth() + 1 <= 9 && tempDate.getDate() <= 9) {
    setDate = tempDate.getFullYear() + "-" + 0 + (tempDate.getMonth() + 1) + "-" + 0 + tempDate.getDate();
  } else if (tempDate.getMonth() + 1 <= 9) {
    setDate = tempDate.getFullYear() + "-" + 0 + (tempDate.getMonth() + 1) + "-" + tempDate.getDate();
  } else if (tempDate.getDate() <= 9) {
    setDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + 0 + tempDate.getDate();
  } else {
    setDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate();
  }

  const loadData = async () => {
    try {
      let allData = await AsyncStorage.getItem("dataDetail");
      if (allData !== null) {
        let jsonData = JSON.parse([allData]);
        const sumOfThisMonth = jsonData.reduce((prev, x) => {
          if (x.thatMonth === thisMonth && x.thatYear === thisYear) {
            return prev + x.value;
          }
          return prev;
        }, 0);
        setThisMonthValue(sumOfThisMonth);
        const sumOfYear = jsonData.reduce((prev, x) => {
          if (Number(thisYear) - Number(x.thatYear) === 1) {
            return prev + x.value;
          }
          return prev;
        }, 0);
        setPastYear(sumOfYear);

        const sumOfThreeMonth = jsonData.reduce((prev, x) => {
          if (x.thatDate > threeMonthAgo && x.thatDate < setDate) {
            return prev + x.value;
          }
          return prev;
        }, 0);
        setPThreeMValue(sumOfThreeMonth);
      }
      setRefresh(false);
    } catch (err) {
      console.warn("loadData " + err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const ThisMonthTotal = () => {
    return (
      <View style={styles.valueWrap}>
        <Text style={{ fontSize: 32, textAlign: "center" }}>${thisMonthValue}</Text>
      </View>
    );
  };
  const PastThreeMonth = () => {
    return (
      <View style={styles.pastWrap}>
        <View style={styles.textWrap}>
          <Text style={{ fontSize: 16, opacity: 0.7 }}>過往三個月</Text>
          <Text style={{ fontSize: 22 }}>${pThreeMValue}</Text>
        </View>
      </View>
    );
  };

  const PastYear = () => {
    return (
      <View style={styles.pastWrap}>
        <View style={styles.textWrap}>
          <Text style={{ fontSize: 16, opacity: 0.7 }}>過往一年</Text>
          <Text style={{ fontSize: 22 }}>${pastYear}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView>
        <RefreshControl refreshing={refresh} onRefresh={loadData} title="載入中" titleColor={"grey"} tintColor={"grey"} />
        <View style={styles.title}>
          <Text style={{ fontSize: 18, opacity: 0.7 }}>本月消費</Text>
          <ThisMonthTotal />
        </View>
        <View style={styles.container}>
          <PastThreeMonth />
          <PastYear />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  pastWrap: {
    backgroundColor: "#F4F4F4",
    width: 150,
    height: 140,
    borderRadius: 30,
  },
  textWrap: {
    marginLeft: 15,
    marginTop: 15,
    maxHeight: "80%",
  },
  valueWrap: {
    flexDirection: "row",
    paddingVertical: 10,
    maxWidth: "80%",
  },
});

export default Past;
