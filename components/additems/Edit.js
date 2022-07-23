import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
const Edit = ({ navigation, route }) => {
  const [chooseType, setChooseType] = useState("選項");
  const [savedData, setSavedData] = useState();
  const [moneyValue, setMoneyValue] = useState();
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [mode, setMode] = useState("date");
  const [saveDate, setSaveDate] = useState("");
  const [saveTime, setSaveTime] = useState("");
  const [saveMonth, setSaveMonth] = useState("");
  const [saveYear, setSaveYear] = useState("");
  const [saveDay, setSaveDay] = useState("");
  const [showToast, setShowToast] = useState(false);
  const loaded = useRef(false);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let tempDate = new Date(date);
    let setDay = tempDate.getDate();
    let setMonth = tempDate.getMonth();
    let setYear = tempDate.getFullYear();
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
    let amPmHours = parseInt(tempDate.getHours());
    let amPmMins = parseInt(tempDate.getMinutes());
    let ftime;
    let setTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    if (amPmHours >= 12 && amPmMins >= 0 && amPmMins > 9) {
      ftime = tempDate.getHours() - 12 + " : " + tempDate.getMinutes() + " p.m";
    } else if (amPmHours >= 12 && amPmMins >= 0 && amPmMins <= 9) {
      ftime = tempDate.getHours() - 12 + " : " + "0" + tempDate.getMinutes() + " p.m";
    } else if (amPmHours < 12 && amPmMins <= 9) {
      ftime = tempDate.getHours() + " : " + "0" + tempDate.getMinutes() + " a.m";
    } else if (amPmHours < 12 && amPmMins > 9) {
      ftime = tempDate.getHours() + " : " + tempDate.getMinutes() + " a.m";
    }
    let setFullDate = setDate + setTime;
    hideDatePicker();

    if (mode === "date") {
      setShowDate(setDate);
      setSaveDay(setDay);
      setSaveMonth(setMonth);
      setSaveYear(setYear);
      setSaveDate(setFullDate);
    } else if (mode === "time") {
      setShowTime(ftime);
      setSaveTime(setTime);
    }
  };

  const showMode = (currentMode) => {
    setDatePickerVisibility(true);
    setMode(currentMode);
  };

  const onSubmitData = async () => {
    try {
      let jsonData = {
        value: parseInt(moneyValue),
        type: chooseType,
        thatDay: saveDay,
        thatMonth: saveMonth,
        thatYear: saveYear,
        thatTime: saveTime,
        thatDate: saveDate,
        descriptValue: description,
        id: new Date().getTime(),
      };
      const updatedData = [...savedData, jsonData];
      setSavedData(updatedData);
      if (moneyValue && saveDate && saveTime && chooseType !== "選項") {
        await AsyncStorage.setItem("dataDetail", JSON.stringify(updatedData));
        setMoneyValue("");
        setDescription("");
        setShowDate("");
        setSaveDate("");
        setShowTime("");
        setSaveTime("");
        setSaveMonth("");
        setSaveYear("");
        setSaveDay("");
        setChooseType("選項");
        // console.warn(updatedData);
        let toast = Toast.show("新增成功", {
          duration: 1000,
          position: Toast.positions.CENTER,
          backgroundColor: "black",
          textColor: "#fff",
          shadow: false,
          opacity: 0.5,
        });
        loaded.current = true;
      } else if (!moneyValue || !saveDate || !saveTime || chooseType == "選項") {
        // Alert.alert("新增失敗", "請輸入完整記錄(除描述外)");
        let toastErr = Toast.show("新增失敗,請輸入完整記錄(除描述外)", {
          duration: 2000,
          position: Toast.positions.CENTER,
          backgroundColor: "black",
          textColor: "#fff",
          shadow: false,
          opacity: 0.5,
          hideOnPress: false,
        });
      }
    } catch (err) {
      alert(err);
      console.warn("save" + err);
    }
    // console.warn("done");
  };

  const findData = async () => {
    const detailData = await AsyncStorage.getItem("dataDetail");
    if (detailData !== null) {
      setSavedData(JSON.parse(detailData));
    } else {
      setSavedData("");
    }
  };

  useEffect(() => {
    findData();
    setChooseType(route.params?.chooseName);
  }, [route]);

  const goChoose = (yourOption) => {
    navigation.navigate("類型", { chooseName: yourOption });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.optionWrap}>
          <View style={styles.listWrap}>
            <Text style={{ fontSize: 20 }}>金額</Text>
            <TextInput
              onChangeText={(num) => setMoneyValue(num)}
              placeholder="輸入金額"
              placeholderTextColor={"grey"}
              returnKeyType="done"
              keyboardType="numeric"
              style={styles.textInput}
              value={moneyValue}
            />
          </View>
          <Text style={styles.line}> </Text>
          <TouchableOpacity
            style={styles.typeContainer}
            onPress={() => {
              goChoose(chooseType);
            }}
          >
            <Text style={{ fontSize: 20 }}>類型</Text>
            <View style={styles.typeWrap}>
              <Text style={{ fontSize: 20, color: "grey" }} on>
                {chooseType}
              </Text>
              <Ionicons name="chevron-forward-outline" size={30} color="#FF9568" />
            </View>
          </TouchableOpacity>
          <Text style={styles.line}> </Text>
          <TouchableOpacity style={styles.listWrap} onPress={() => showMode("date")}>
            <Text style={{ fontSize: 20 }}>日期</Text>
            <Text style={{ fontSize: 20 }}>{showDate}</Text>
          </TouchableOpacity>
          <Text style={styles.line}> </Text>
          <TouchableOpacity style={styles.listWrap} onPress={() => showMode("time")}>
            <Text style={{ fontSize: 20 }}>時間</Text>
            <Text style={{ fontSize: 20 }}>{showTime}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            confirmTextIOS="確認"
            cancelTextIOS="取消"
            locale="en_GB"
            buttonTextColorIOS="#0A84FF"
            textColor="#282828"
            isDarkModeEnabled={false}
          />
        </View>
        <View style={styles.describeWrap}>
          <TextInput
            placeholder="描述"
            placeholderTextColor={"grey"}
            style={styles.describeInput}
            multiline={true}
            value={description}
            onChangeText={(text) => setDescription(text)}
            maxLength={30}
          />
        </View>
        <TouchableOpacity style={styles.addBtnContainer} onPress={onSubmitData}>
          <View style={styles.addBtn}>
            <Text style={{ fontSize: 15 }}>新增</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: Dimensions.get("window").height,
  },
  optionWrap: {
    backgroundColor: "#fff",
    width: 310,
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#F3F3F3",
  },
  line: {
    backgroundColor: "#F3F3F3",
    width: "100%",
    height: 1,
  },
  listWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    fontSize: 20,
  },
  typeContainer: {
    paddingLeft: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typeWrap: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  describeWrap: {
    backgroundColor: "#fff",
    width: 310,
    height: 100,
    marginTop: 25,
    borderRadius: 20,
    alignSelf: "center",
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#F3F3F3",
  },
  describeInput: {
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
  addBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  addBtn: {
    backgroundColor: "#FF9568",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
  },
});

export default Edit;
