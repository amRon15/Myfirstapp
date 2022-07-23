import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, ScrollView, RefreshControl, Alert, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import SegmentedPicker from "react-native-segmented-picker";
import { year, months } from "../../components/checkitems/date";
import Toast from "react-native-root-toast";

const Check = ({ route }) => {
  // const [expand, setExpand] = useState(false);
  const [visible, setvisible] = useState(false);
  const [chooseMonth, setChooseMonth] = useState();
  const [chooseYear, setChooseYear] = useState();
  const [transData, setTransData] = useState();
  const [foodData, setFoodData] = useState();
  const [shopData, setShopData] = useState();
  const [lifeData, setLifeData] = useState();
  const [transExpand, settransExpand] = useState(false);
  const [foodExpand, setfoodExpand] = useState(false);
  const [shopExpand, setshopExpand] = useState(false);
  const [lifeExpand, setlifeExpand] = useState(false);
  // const [longPress, setLongPress] = useState();
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [refresh, setRefresh] = useState();
  // const [allData, setAllData] = useState();
  let tempdate = new Date();
  const thisMonth = tempdate.getMonth();
  const thisYear = tempdate.getFullYear();
  const oldType = useRef("");
  const loadData = async () => {
    try {
      const allData = await AsyncStorage.getItem("dataDetail");
      if (allData !== null) {
        let jsonData = JSON.parse([allData]);
        const trans = jsonData.filter((item) => {
          if (item.type === "交通") return item;
        });
        setTransData(trans);
        const food = jsonData.filter((item) => {
          if (item.type === "飲食") return item;
        });
        setFoodData(food);
        const shop = jsonData.filter((item) => {
          if (item.type === "購物") return item;
        });
        setShopData(shop);
        const life = jsonData.filter((item) => {
          if (item.type === "生活/其他") return item;
        });
        setLifeData(life);
      }
      setRefresh(false);
    } catch (err) {
      console.warn(err);
    }
  };
  const handleRemove = async (id) => {
    try {
      const allData = await AsyncStorage.getItem("dataDetail");
      let data = [];
      if (allData !== null) data = JSON.parse(allData);
      const allItems = data.filter((item) => item.id !== id);
      await AsyncStorage.setItem("dataDetail", JSON.stringify(allItems));
      let toast = Toast.show("刪除成功", {
        duration: 1000,
        position: Toast.positions.CENTER,
        backgroundColor: "black",
        textColor: "#fff",
        shadow: false,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const removeArr = (item, id) => {
    oldType.current = item[0].type;
    const newArr = item.filter((item) => item.id != id);
    if (oldType.current === "交通") {
      setTransData(newArr);
    } else if (oldType.current === "飲食") {
      setFoodData(newArr);
    } else if (oldType.current === "購物") {
      setShopData(newArr);
    } else if (oldType.current === "生活/其他") {
      setLifeData(newArr);
    }
  };

  const deleteAlert = (item, id) => {
    Alert.alert("確定刪除記錄?", "", [
      {
        text: "確定",
        onPress: () => {
          removeArr(item, id);
          handleRemove(id);
        },
      },
      { text: "取消", style: "cancel" },
    ]);
  };
  const ShowDelete = ({ item, id }) => {
    return (
      <TouchableOpacity onPress={() => deleteAlert(item, id)}>
        <Ionicons name="remove-circle-outline" size={30} color="#FF3F3F" style={{ marginLeft: 5, marginRight: 25 }} />
      </TouchableOpacity>
    );
  };

  const layout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(300, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleY));
  };
  const layoutX = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(500, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
  };
  const openFromHome = useMemo(() => {
    if (route.params?.type !== null) {
      setChooseMonth(route.params?.month);
      setChooseYear(route.params?.year);
      if (route.params?.type === "交通" && !transExpand) {
        settransExpand(true);
        setfoodExpand(false);
        setshopExpand(false);
        setlifeExpand(false);
        layout();
      } else if (route.params?.type === "飲食" && !foodExpand) {
        settransExpand(false);
        setfoodExpand(true);
        setshopExpand(false);
        setlifeExpand(false);
        layout();
      } else if (route.params?.type === "購物" && !shopExpand) {
        settransExpand(false);
        setfoodExpand(false);
        setshopExpand(true);
        setlifeExpand(false);
        layout();
      } else if (route.params?.type === "生活/其他" && !lifeExpand) {
        settransExpand(false);
        setfoodExpand(false);
        setshopExpand(false);
        setlifeExpand(true);
        layout();
      }
    }
  }, [route]);

  const confirmSelected = useCallback(
    (choice) => {
      setChooseMonth(choice.col_1);
      setChooseYear(parseInt(choice.col_2));
      setvisible(false);
    },
    [setChooseMonth, setChooseYear]
  );

  const RenderList = ({ item }) => {
    let a = item;
    return item.map((item) => {
      if (item.thatYear === chooseYear && item.thatMonth === parseInt(chooseMonth) && (transExpand || foodExpand || shopExpand || lifeExpand))
        return (
          <ScrollView key={item.id}>
            <TouchableOpacity
              onLongPress={() => {
                setDeleteBtn(!deleteBtn);
                layoutX();
              }}
            >
              <View>
                <View style={styles.listWrap}>
                  <View style={styles.listTextWrap}>
                    <Text style={{ fontSize: 16 }}>{item.descriptValue}</Text>
                    <Text style={{ fontSize: 14, opacity: 0.6 }}>
                      {item.thatYear}-{item.thatMonth + 1}-{item.thatDay} {item.thatTime}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, textAlign: "right", width: 100 }}>${item.value}</Text>
                    {deleteBtn && <ShowDelete item={a} id={item.id} />}
                  </View>
                </View>
                <Text style={{ height: 1, backgroundColor: "#F3F3F3", width: "80%", alignSelf: "center", opacity: 0.5, marginVertical: 5 }}></Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        );
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <RefreshControl refreshing={refresh} onRefresh={loadData} title="載入中" titleColor={"grey"} tintColor={"grey"} />
        <View style={styles.header}>
          <Text style={{ fontSize: 20 }}>類型</Text>
          <TouchableOpacity onPress={() => setvisible(true)}>
            {chooseMonth && chooseYear ? (
              <Text style={{ fontSize: 20, color: "#FF773D" }}>
                {chooseYear}月{parseInt(chooseMonth) + 1}月
              </Text>
            ) : (
              <Text style={{ fontSize: 20, color: "#FF773D" }}>選取日期</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              layout();
              if (chooseMonth) settransExpand(!transExpand);
              if (foodExpand || shopExpand || lifeExpand) {
                setfoodExpand(false);
                setshopExpand(false);
                setlifeExpand(false);
              }
            }}
          >
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <Ionicons name="bus-outline" style={{ fontSize: 20 }} />
              <Text style={{ fontSize: 20, marginLeft: 10 }}>交通</Text>
            </View>
            {transExpand ? (
              <Ionicons name="chevron-up-outline" style={{ fontSize: 20, marginRight: 15 }} />
            ) : (
              <Ionicons name="chevron-down-outline" style={{ fontSize: 20, marginRight: 15 }} />
            )}
          </TouchableOpacity>
          {transExpand && chooseMonth && transData && <RenderList key={transData.id} item={transData} />}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              layout();
              if (chooseMonth) setfoodExpand(!foodExpand);
              if (transExpand || shopExpand || lifeExpand) {
                settransExpand(false);
                setshopExpand(false);
                setlifeExpand(false);
              }
            }}
          >
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <Ionicons name="fast-food-outline" style={{ fontSize: 20 }} />
              <Text style={{ fontSize: 20, marginLeft: 10 }}>飲食</Text>
            </View>
            {foodExpand ? (
              <Ionicons name="chevron-up-outline" style={{ fontSize: 20, marginRight: 15 }} />
            ) : (
              <Ionicons name="chevron-down-outline" style={{ fontSize: 20, marginRight: 15 }} />
            )}
          </TouchableOpacity>

          {foodExpand && chooseMonth && foodData && <RenderList key={foodData.id} item={foodData} />}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              layout();
              if (chooseMonth) setshopExpand(!shopExpand);
              if (foodExpand || transExpand || lifeExpand) {
                setfoodExpand(false);
                settransExpand(false);
                setlifeExpand(false);
              }
            }}
          >
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <Ionicons name="cart-outline" style={{ fontSize: 20 }} />
              <Text style={{ fontSize: 20, marginLeft: 10 }}>購物</Text>
            </View>
            {shopExpand ? (
              <Ionicons name="chevron-up-outline" style={{ fontSize: 20, marginRight: 15 }} />
            ) : (
              <Ionicons name="chevron-down-outline" style={{ fontSize: 20, marginRight: 15 }} />
            )}
          </TouchableOpacity>
          {shopExpand && chooseMonth && shopData && <RenderList key={shopData.id} item={shopData} />}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              layout();
              if (chooseMonth) setlifeExpand(!lifeExpand);
              if (foodExpand || shopExpand || transExpand) {
                setfoodExpand(false);
                setshopExpand(false);
                settransExpand(false);
              }
            }}
          >
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <Ionicons name="shirt-outline" style={{ fontSize: 20 }} />
              <Text style={{ fontSize: 20, marginLeft: 10 }}>生活/其他</Text>
            </View>
            {lifeExpand ? (
              <Ionicons name="chevron-up-outline" style={{ fontSize: 20, marginRight: 15 }} />
            ) : (
              <Ionicons name="chevron-down-outline" style={{ fontSize: 20, marginRight: 15 }} />
            )}
          </TouchableOpacity>
          {lifeExpand && chooseMonth && lifeData && <RenderList key={lifeData.id} item={lifeData} />}
        </View>
      </ScrollView>
      <SegmentedPicker
        onConfirm={(choice) => confirmSelected(choice)}
        onCancel={() => setvisible(false)}
        visible={visible}
        size={0.5}
        confirmText="確認"
        options={[
          { key: "col_1", items: months },
          { key: "col_2", items: year },
        ]}
        defaultSelections={{ col_1: "" + thisMonth, col_2: "" + thisYear }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginBottom: 20,
    shadowOffset: "black",
    shadowOffset: { height: 10, width: 20 },
    shadowRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 310,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F4F4F4",
    shadowColor: "#000",
    shadowOffset: {
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignSelf: "center",
  },
  checkAllBtn: {
    marginTop: 50,
    marginRight: 30,
  },
  listWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  listTextWrap: {
    justifyContent: "space-between",
    width: 200,
  },
});
export default Check;
