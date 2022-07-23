import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useMemo } from "react";
import { FlatList } from "react-native-gesture-handler";

const List = ({ navigation }) => {
  const [fiveData, setFiveData] = useState();
  const [refresh, setRefresh] = useState();

  const loadData = async () => {
    try {
      let datalist = await AsyncStorage.getItem("dataDetail");
      // await AsyncStorage.clear();
      if (datalist !== null) {
        const sortDate = JSON.parse([datalist]).map((obj) => {
          return { ...obj, thatDate: obj.thatDate };
        });
        const sortData = sortDate.sort((a, b) => b.thatDate.localeCompare(a.thatDate));
        setFiveData(sortData.slice(0, 5));
      }
      setRefresh(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const goCheckItems = (type, month, year) => {
    navigation.navigate("款項", { screen: "全部交易", initial: false, params: { type: type, month: month, year: year } });
  };

  const reload = useMemo(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
    // sortData;
  }, []);

  const sepratorLine = () => {
    return <Text style={styles.line}> </Text>;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={fiveData}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={sepratorLine}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={loadData} title="載入中" titleColor={"grey"} tintColor={"grey"} />}
        renderItem={({ item }) => {
          const today = new Date();
          if (item.thatDay === today.getDate() && item.thatMonth === today.getMonth() && item.thatYear === today.getFullYear()) {
            return (
              <View>
                <TouchableOpacity onPress={() => goCheckItems(item.type, item.thatMonth, item.thatYear)}>
                  <View style={styles.listWrap}>
                    <Text style={styles.itemLeft}>{item.type}</Text>
                    <View style={styles.itemRight}>
                      <Text style={{ fontSize: 20 }}>$ {item.value}</Text>
                      <Ionicons name="chevron-forward-outline" style={styles.icon} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 1,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  itemLeft: {
    marginLeft: 30,
    fontSize: 20,
  },
  itemRight: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 20,
    fontSize: 20,
  },
  amount: {
    maxWidth: "80%",
  },
  icon: {
    marginLeft: 10,
    fontSize: 25,
    color: "#FF9568",
  },
  line: {
    backgroundColor: "#F3F3F3",
    height: 1,
  },
});

export default List;
