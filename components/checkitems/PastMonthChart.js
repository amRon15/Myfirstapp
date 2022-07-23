import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useState, UseEffect, useRef, useCallback, useMemo } from "react";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Past from "./Past";
let tempDate = new Date();
let thisMonth = new Date();
thisMonth.setMonth(thisMonth.getMonth());
thisMonth = thisMonth.getFullYear() + "-" + thisMonth.getMonth();
let showThisMonth = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1);
let lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth = lastMonth.getFullYear() + "-" + lastMonth.getMonth();
let showLastMonth = tempDate.getFullYear() + "-" + tempDate.getMonth();
let lastTwoMonth = new Date();
lastTwoMonth.setMonth(lastTwoMonth.getMonth() - 2);
lastTwoMonth = lastTwoMonth.getFullYear() + "-" + lastTwoMonth.getMonth();
let showLastTwoMonth = tempDate.getFullYear() + "-" + (tempDate.getMonth() - 1);
let lastThreeMonth = new Date();
lastThreeMonth.setMonth(lastThreeMonth.getMonth() - 3);
lastThreeMonth = lastThreeMonth.getFullYear() + "-" + lastThreeMonth.getMonth();
let showLastThreeMonth = tempDate.getFullYear() + "-" + (tempDate.getMonth() - 2);

const PastMonthChart = ({ navigation }) => {
  const [sumOfThisMonth, setSumOfThisMonth] = useState();
  const [sumOfLastMonth, setSumOfLastMonth] = useState();
  const [sumOfLastTwo, setSumOfLastTwo] = useState();
  const [sumOfLastThree, setSumOfLastThree] = useState();
  const [showid, setShowId] = useState(0);
  const [thisMonthValue, setThisMonthValue] = useState();
  const [lastMonthValue, setLastMonthValue] = useState();
  const [lastTwo, setLastTwo] = useState();
  const [lastThree, setLastThree] = useState();
  const [fullData, setFullData] = useState();
  const [thisTypeTotal, setThisTypeTotal] = useState();
  const [lastTypeTotal, setLastTypeTotal] = useState();
  const [lastTwoTypeTotal, setlastTwoTypeTotal] = useState();
  const [lastThreeTypeTotal, setlastThreeTypeTotal] = useState();
  const [transData, setTransData] = useState();
  const [shopData, setShopData] = useState();
  const [foodData, setFoodData] = useState();
  const [lifeData, setLifeData] = useState();
  const [refresh, setRefresh] = useState();
  const snapPoints = useMemo(() => ["50%", "90%"], []);
  const transRef = useRef(null);
  const shopRef = useRef(null);
  const foodRef = useRef(null);
  const lifeRef = useRef(null);

  const loadData = async () => {
    try {
      let allData = await AsyncStorage.getItem("dataDetail");
      if (allData !== null) {
        let jsonData = JSON.parse([allData]);
        const sortData = jsonData.sort((a, b) => b.thatDate.localeCompare(a.thatDate));

        let transportData = jsonData.filter((item) => {
          if (item.type === "交通") return item;
        });
        setTransData(transportData);
        let shopData = jsonData.filter((item) => {
          if (item.type === "購物") return item;
        });
        setShopData(shopData);
        let foodData = jsonData.filter((item) => {
          if (item.type === "飲食") return item;
        });
        setFoodData(foodData);
        let lifeData = jsonData.filter((item) => {
          if (item.type === "生活/其他") return item;
        });
        setLifeData(lifeData);
        // setFullData(jsonData);
        let classifyData = [
          { id: 1, name: "交通", detail: transportData },
          { id: 2, name: "飲食", detail: foodData },
          { id: 3, name: "購物", detail: shopData },
          { id: 4, name: "生活/其他", detail: lifeData },
        ];
        // console.warn(classifyData);
        const sumThisMonth = classifyData.map((item) => {
          const sum = item.detail.reduce((prev, x) => {
            let adate = x.thatYear + "-" + x.thatMonth;
            if (adate === thisMonth) {
              return prev + x.value;
            }
            return prev;
          }, 0);
          return {
            id: item.id,
            name: item.name,
            totalValue: sum,
          };
        });
        setThisTypeTotal(sumThisMonth);
        setSumOfThisMonth(
          sumThisMonth.reduce((prev, x) => {
            return prev + x.totalValue;
          }, 0)
        );
        const sumLastMonth = classifyData.map((item) => {
          const sum = item.detail.reduce((prev, x) => {
            let adate = x.thatYear + "-" + x.thatMonth;
            if (adate === lastMonth) {
              return prev + x.value;
            }
            return prev;
          }, 0);
          return {
            id: item.id,
            name: item.name,
            totalValue: sum,
          };
        });
        setLastTypeTotal(sumLastMonth);
        setSumOfLastMonth(
          sumLastMonth.reduce((prev, x) => {
            return prev + x.totalValue;
          }, 0)
        );
        const sumLastTwo = classifyData.map((item) => {
          const sum = item.detail.reduce((prev, x) => {
            let adate = x.thatYear + "-" + x.thatMonth;
            if (adate === lastTwoMonth) {
              // console.warn(lastTwoMonth);
              return prev + x.value;
            }
            return prev;
          }, 0);
          return {
            id: item.id,
            name: item.name,
            totalValue: sum,
          };
        });
        setlastTwoTypeTotal(sumLastTwo);
        setSumOfLastTwo(
          sumLastTwo.reduce((prev, x) => {
            return prev + x.totalValue;
          }, 0)
        );
        const sumLastThree = classifyData.map((item) => {
          const sum = item.detail.reduce((prev, x) => {
            let adate = x.thatYear + "-" + x.thatMonth;
            if (adate === lastThreeMonth) {
              // console.warn(lastThreeMonth);
              return prev + x.value;
            }
            return prev;
          }, 0);
          return {
            id: item.id,
            name: item.name,
            totalValue: sum,
          };
        });
        setlastThreeTypeTotal(sumLastThree);
        setSumOfLastThree(
          sumLastThree.reduce((prev, x) => {
            return prev + x.totalValue;
          }, 0)
        );
        // console.warn(sumLastThree);
        const thisMonthTotal = sumThisMonth.reduce((prev, x) => prev + x.totalValue, 0);
        const lastMonthTotal = sumLastMonth.reduce((prev, x) => prev + x.totalValue, 0);
        const lastTwoTotal = sumLastTwo.reduce((prev, x) => prev + x.totalValue, 0);
        const lastThreeTotal = sumLastThree.reduce((prev, x) => prev + x.totalValue, 0);

        const fullThisMonth = sumThisMonth.map((item) => {
          let percentage = ((item.totalValue / thisMonthTotal) * 100).toFixed(0);
          return {
            x: percentage,
            y: item.totalValue,
            label: percentage + "%",
            name: item.name,
            id: 0,
          };
        });
        setThisMonthValue(fullThisMonth);
        const fullLastMonth = sumLastMonth.map((item) => {
          let percentage = ((item.totalValue / lastMonthTotal) * 100).toFixed(0);
          return {
            x: percentage,
            y: item.totalValue,
            label: percentage + "%",
            name: item.name,
            id: 1,
          };
        });
        setLastMonthValue(fullLastMonth);
        const fullLastTwo = sumLastTwo.map((item) => {
          let percentage = ((item.totalValue / lastTwoTotal) * 100).toFixed(0);
          return {
            x: percentage,
            y: item.totalValue,
            label: percentage + "%",
            name: item.name,
            id: 2,
          };
        });
        // console.warn(fullLastTwo);
        setLastTwo(fullLastTwo);
        const fullLastThree = sumLastThree.map((item) => {
          let percentage = ((item.totalValue / lastThreeTotal) * 100).toFixed(0);
          return {
            x: percentage,
            y: item.totalValue,
            label: percentage + "%",
            name: item.name,
            id: 3,
          };
        });
        // console.warn(fullLastThree);
        setLastThree(fullLastThree);
      }
      setRefresh(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const renderFlatlist = ({ item }) => {
    let adate = item.thatYear + "-" + item.thatMonth;
    if (adate === thisMonth && showid === 0)
      return (
        <View style={styles.listWrap}>
          <View style={styles.listTextWrap}>
            <Text style={{ fontSize: 16 }}>{item.descriptValue}</Text>
            <Text style={{ fontSize: 14, opacity: 0.6 }}>
              {item.thatYear}-{item.thatMonth + 1}-{item.thatDay} {item.thatTime}
            </Text>
          </View>
          <Text style={{ fontSize: 18, marginRight: 1 }}>${item.value}</Text>
        </View>
      );
    else if (adate === lastMonth && showid === 1)
      return (
        <View style={styles.listWrap}>
          <View style={styles.listTextWrap}>
            <Text style={{ fontSize: 16 }}>{item.descriptValue}</Text>
            <Text style={{ fontSize: 14, opacity: 0.6 }}>
              {item.thatYear}-{item.thatMonth + 1}-{item.thatDay} {item.thatTime}
            </Text>
          </View>
          <Text style={{ fontSize: 18, marginRight: 1 }}>${item.value}</Text>
        </View>
      );
    else if (adate === lastTwoMonth && showid === 2)
      return (
        <View style={styles.listWrap}>
          <View style={styles.listTextWrap}>
            <Text style={{ fontSize: 16 }}>{item.descriptValue}</Text>
            <Text style={{ fontSize: 14, opacity: 0.6 }}>
              {item.thatYear}-{item.thatMonth + 1}-{item.thatDay} {item.thatTime}
            </Text>
          </View>
          <Text style={{ fontSize: 18, marginRight: 1 }}>${item.value}</Text>
        </View>
      );
    else if (adate === lastThreeMonth && showid === 3)
      return (
        <View style={styles.listWrap}>
          <View style={styles.listTextWrap}>
            <Text style={{ fontSize: 16 }}>{item.descriptValue}</Text>
            <Text style={{ fontSize: 14, opacity: 0.6 }}>
              {item.thatYear}-{item.thatMonth + 1}-{item.thatDay} {item.thatTime}
            </Text>
          </View>
          <Text style={{ fontSize: 18, marginRight: 1 }}>${item.value}</Text>
        </View>
      );
  };
  const sepratorLine = () => {
    return <View style={{ backgroundColor: "#F3F3F3", height: 0.5, width: "100%", marginVertical: 5 }} />;
  };

  const handleSnapPress = useCallback((index, type) => {
    if (type === "trans") {
      transRef.current?.snapToIndex(index);
    } else if (type === "shop") {
      shopRef.current?.snapToIndex(index);
    } else if (type === "food") {
      foodRef.current?.snapToIndex(index);
    } else if (type === "life") {
      lifeRef.current?.snapToIndex(index);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <ScrollView>
        <RefreshControl refreshing={refresh} onRefresh={loadData} title="載入中" titleColor={"grey"} tintColor={"grey"} />
        <Past />
        <View>
          <Swiper
            style={{ height: 270 }}
            showsButtons
            loop={false}
            showsPagination={false}
            buttonWrapperStyle={{ paddingHorizontal: 30 }}
            prevButton={<Text style={{ transform: [{ scaleX: -1 }], color: "#FF9568", fontSize: 50, opacity: 0.5 }}>›</Text>}
            nextButton={<Text style={{ color: "#FF9568", fontSize: 50, opacity: 0.5 }}>›</Text>}
            onIndexChanged={(index) => {
              setShowId(index);
            }}
          >
            <View>
              <VictoryPie
                data={thisMonthValue}
                innerRadius={100}
                radius={90}
                colorScale={["#6892FF", "#FFDE68", "#FF7168", "#5CCB67"]}
                label={(item) => item.name}
                height={250}
                style={{ labels: { fillOpacity: 0 } }}
                padAngle={5}
              />
              <View style={styles.typeWrap}>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#6892FF", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {thisMonthValue && <Text>交通 {thisMonthValue[0].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#FFDE68", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {thisMonthValue && <Text>飲食 {thisMonthValue[1].label}</Text>}
                </View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#FF7168", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {thisMonthValue && <Text>購物 {thisMonthValue[2].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#5CCB67", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {thisMonthValue && <Text>生活/其他 {thisMonthValue[3].label}</Text>}
                </View>
              </View>
            </View>
            <View>
              <VictoryPie
                data={lastMonthValue}
                innerRadius={100}
                radius={90}
                colorScale={["#6892FF", "#FFDE68", "#FF7168", "#5CCB67"]}
                label={(item) => item.name}
                height={250}
                style={{ labels: { fillOpacity: 0 } }}
                padAngle={5}
              />
              <View style={styles.typeWrap}>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#6892FF", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastMonthValue && <Text>交通 {lastMonthValue[0].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#FFDE68", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastMonthValue && <Text>飲食 {lastMonthValue[1].label}</Text>}
                </View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#FF7168", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastMonthValue && <Text>購物 {lastMonthValue[2].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#5CCB67", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastMonthValue && <Text>生活/其他 {lastMonthValue[3].label}</Text>}
                </View>
              </View>
            </View>
            <View>
              <VictoryPie
                data={lastTwo}
                innerRadius={100}
                radius={90}
                colorScale={["#6892FF", "#FFDE68", "#FF7168", "#5CCB67"]}
                label={(item) => item.name}
                height={250}
                style={{ labels: { fillOpacity: 0 } }}
                padAngle={5}
              />
              <View style={styles.typeWrap}>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#6892FF", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastTwo && <Text>交通 {lastTwo[0].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#FFDE68", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastTwo && <Text>飲食 {lastTwo[1].label}</Text>}
                </View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#FF7168", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastTwo && <Text>購物 {lastTwo[2].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#5CCB67", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastTwo && <Text>生活/其他 {lastTwo[3].label}</Text>}
                </View>
              </View>
            </View>
            <View>
              <VictoryPie
                data={lastThree}
                innerRadius={100}
                radius={90}
                colorScale={["#6892FF", "#FFDE68", "#FF7168", "#5CCB67"]}
                label={(item) => item.name}
                height={250}
                style={{ labels: { fillOpacity: 0 } }}
                padAngle={5}
              />
              <View style={styles.typeWrap}>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#6892FF", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastThree && <Text>交通 {lastThree[0].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#FFDE68", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastThree && <Text>飲食 {lastThree[1].label}</Text>}
                </View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <View style={{ backgroundColor: "#FF7168", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastThree && <Text>購物 {lastThree[2].label}</Text>}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "#5CCB67", width: 15, height: 15, borderRadius: 100, marginRight: 5 }} />
                  {lastThree && <Text>生活/其他 {lastThree[3].label}</Text>}
                </View>
              </View>
            </View>
          </Swiper>
          <View style={styles.showMonthWrap}>
            {showid === 0 && <Text style={{ opacity: 0.8 }}>{showThisMonth}月份(截至目前)</Text>}
            {showid === 1 && <Text style={{ opacity: 0.8 }}>{showLastMonth}月份</Text>}
            {showid === 2 && <Text style={{ opacity: 0.8 }}>{showLastTwoMonth}月份</Text>}
            {showid === 3 && <Text style={{ opacity: 0.8 }}>{showLastThreeMonth}月份</Text>}
          </View>
        </View>
        <View>
          <View style={styles.totalWrap}>
            <View style={{ justifyContent: "space-between", flexDirection: "row", top: "3%", marginHorizontal: 10 }}>
              <View>
                <Text style={styles.typeText}>總額</Text>
              </View>
              {showid === 0 && sumOfThisMonth && <Text style={styles.typeText}>${sumOfThisMonth}</Text>}
              {showid === 1 && sumOfLastMonth && <Text style={styles.typeText}>${sumOfLastMonth}</Text>}
              {showid === 2 && sumOfLastTwo && <Text style={styles.typeText}>${sumOfLastTwo}</Text>}
              {showid === 3 && sumOfLastThree && <Text style={styles.typeText}>${sumOfLastThree}</Text>}
            </View>
          </View>
          <TouchableOpacity style={styles.transBtn} onPress={() => handleSnapPress(1, "trans")}>
            <View style={styles.transWrap}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.typeCir} />
                <Text style={styles.typeText}>交通</Text>
              </View>
              {showid === 0 && thisTypeTotal && <Text style={styles.typeText}>${thisTypeTotal[0].totalValue}</Text>}
              {showid === 1 && lastTypeTotal && <Text style={styles.typeText}>${lastTypeTotal[0].totalValue}</Text>}
              {showid === 2 && lastTwoTypeTotal && <Text style={styles.typeText}>${lastTwoTypeTotal[0].totalValue}</Text>}
              {showid === 3 && lastThreeTypeTotal && <Text style={styles.typeText}>${lastThreeTypeTotal[0].totalValue}</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.foodBtn} onPress={() => handleSnapPress(1, "food")}>
            <View style={styles.foodWrap}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.typeCir} />
                <Text style={styles.typeText}>飲食</Text>
              </View>
              {showid === 0 && thisTypeTotal && <Text style={styles.typeText}>${thisTypeTotal[1].totalValue}</Text>}
              {showid === 1 && lastTypeTotal && <Text style={styles.typeText}>${lastTypeTotal[1].totalValue}</Text>}
              {showid === 2 && lastTwoTypeTotal && <Text style={styles.typeText}>${lastTwoTypeTotal[1].totalValue}</Text>}
              {showid === 3 && lastThreeTypeTotal && <Text style={styles.typeText}>${lastThreeTypeTotal[1].totalValue}</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shopBtn} onPress={() => handleSnapPress(1, "shop")}>
            <View style={styles.shopWrap}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.typeCir} />
                <Text style={styles.typeText}>購物</Text>
              </View>
              {showid === 0 && thisTypeTotal && <Text style={styles.typeText}>${thisTypeTotal[2].totalValue}</Text>}
              {showid === 1 && lastTypeTotal && <Text style={styles.typeText}>${lastTypeTotal[2].totalValue}</Text>}
              {showid === 2 && lastTwoTypeTotal && <Text style={styles.typeText}>${lastTwoTypeTotal[2].totalValue}</Text>}
              {showid === 3 && lastThreeTypeTotal && <Text style={styles.typeText}>${lastThreeTypeTotal[2].totalValue}</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lifeBtn} onPress={() => handleSnapPress(1, "life")}>
            <View style={styles.lifeWrap}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.typeCir} />
                <Text style={styles.typeText}>生活/其他</Text>
              </View>
              {showid === 0 && thisTypeTotal && <Text style={styles.typeText}>${thisTypeTotal[3].totalValue}</Text>}
              {showid === 1 && lastTypeTotal && <Text style={styles.typeText}>${lastTypeTotal[3].totalValue}</Text>}
              {showid === 2 && lastTwoTypeTotal && <Text style={styles.typeText}>${lastTwoTypeTotal[3].totalValue}</Text>}
              {showid === 3 && lastThreeTypeTotal && <Text style={styles.typeText}>${lastThreeTypeTotal[3].totalValue}</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkBtn}
            onPress={() => {
              navigation.navigate("全部交易");
            }}
          >
            <View style={styles.checkWrap}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.typeCir} />
                <Text style={styles.typeText}>查詢全部</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={15} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {transData && (
        <BottomSheet snapPoints={snapPoints} ref={transRef} enablePanDownToClose={true} index={-1}>
          <BottomSheetFlatList
            data={transData}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatlist}
            ItemSeparatorComponent={sepratorLine}
          ></BottomSheetFlatList>
        </BottomSheet>
      )}
      {shopData && (
        <BottomSheet snapPoints={snapPoints} ref={shopRef} enablePanDownToClose={true} index={-1}>
          <BottomSheetFlatList
            data={shopData}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatlist}
            ItemSeparatorComponent={sepratorLine}
          ></BottomSheetFlatList>
        </BottomSheet>
      )}
      {foodData && (
        <BottomSheet snapPoints={snapPoints} ref={foodRef} enablePanDownToClose={true} index={-1}>
          <BottomSheetFlatList
            data={foodData}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatlist}
            ItemSeparatorComponent={sepratorLine}
          ></BottomSheetFlatList>
        </BottomSheet>
      )}
      {lifeData && (
        <BottomSheet snapPoints={snapPoints} ref={lifeRef} enablePanDownToClose={true} index={-1}>
          <BottomSheetFlatList
            data={lifeData}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatlist}
            ItemSeparatorComponent={sepratorLine}
          ></BottomSheetFlatList>
        </BottomSheet>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  typeWrap: {
    alignSelf: "center",
    bottom: "50%",
  },
  trans: {},
  food: {},
  shop: {},
  life: {},
  showMonthWrap: {
    alignItems: "center",
    bottom: "10%",
  },
  swipeBtn: {
    color: "#FF9568",
    fontSize: 20,
  },
  valueWrap: {
    flexDirection: "row",
    maxWidth: "80%",
    alignSelf: "center",
    bottom: "53%",
  },
  checkBtn: {
    backgroundColor: "#FF68B0",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
    height: 40,
  },
  transBtn: {
    backgroundColor: "#6892FF",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    height: 40,
    marginBottom: 10,
  },
  foodBtn: {
    backgroundColor: "#FFDE68",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
    height: 40,
  },
  shopBtn: {
    backgroundColor: "#FF7168",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
    height: 40,
  },
  lifeBtn: {
    backgroundColor: "#5CCB67",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    height: 40,
    marginBottom: 10,
  },
  checkWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    top: "3%",
  },
  transWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    top: "3%",
  },
  foodWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    top: "3%",
  },
  shopWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    top: "3%",
  },
  lifeWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    top: "3%",
  },
  typeCir: {
    backgroundColor: "white",
    width: 15,
    height: 15,
    borderRadius: 5,
    marginRight: 5,
    alignSelf: "center",
  },
  typeText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  listWrap: {
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  listTextWrap: {
    width: "50%",
    justifyContent: "space-between",
  },
  totalWrap: {
    // flexDirection: "row",
    marginHorizontal: 10,
    // alignItems: "center",
    backgroundColor: "#FF9568",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    height: 40,
    marginBottom: 10,
  },
  bottomSheet: { shadowColor: "#000", shadowOffset: { height: -4 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
});
export default PastMonthChart;
