import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, FlatList, View, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import List from "../../components/home/List";
import TodayData from "../../components/home/TodayData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [realname, setrealname] = useState();
  const [fakename, setfakename] = useState();
  const loadData = async () => {
    try {
      const fake = await AsyncStorage.getItem("liarname");
      const real = await AsyncStorage.getItem("realname");
      if (real !== null) {
        setrealname(real);
      } else if (fake !== null) {
        setfakename(fake);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    loadData();
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        {realname && (
          <View style={styles.name}>
            <Text style={{ fontSize: 16 }}>今天過得好嗎 {realname}</Text>
          </View>
        )}
        {fakename && (
          <View style={styles.name}>
            <Text style={{ fontSize: 16 }}>你好呀 {fakename}</Text>
          </View>
        )}
        <Text style={styles.title}>本日消費</Text>
        {/* 顯示本日消費金額 */}
        <TodayData />
      </View>
      <View style={styles.homeBtnWrap}>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate("新增")}>
          <Text style={styles.homeBtnText}>新增款項</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate("款項", { screen: "全部交易", initial: false })}>
          <Text style={styles.homeBtnText}>查看款項</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.listWrap}>本日近五項消費</Text>
        {/* 顯示近五項消費 */}
      </View>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  name: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    opacity: 0.7,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    opacity: 0.8,
  },
  homeBtnWrap: {
    marginVertical: 20,
  },
  homeBtn: {
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: "#F4F4F4",
    width: 200,
    height: 60,
    alignSelf: "center",
  },
  homeBtnText: {
    fontSize: 20,
    paddingVertical: 15,
    textAlign: "center",
  },
  listWrap: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
    opacity: 0.8,
  },
});

export default Home;
