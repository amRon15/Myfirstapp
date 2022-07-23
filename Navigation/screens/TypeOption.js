import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const TypeOption = ({ route }) => {
  const navigation = useNavigation();

  const [type, setType] = useState("");
  // const [ change, setChange ] = useState(false)
  const [keyId, setKeyId] = useState(0);

  const typeChange = (num, name) => {
    setType(name);
    setKeyId(num);
    // setChange(!change)
  };

  // useEffect(()=>{
  //     console.warn('changed')
  //     console.warn(type)
  // },[])

  const goBack = (name) => {
    navigation.navigate("新增交易", { chooseName: name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionWrap}>
        <TouchableOpacity
          style={styles.listWrap}
          onPress={() => {
            typeChange(1, "交通");
            goBack("交通");
          }}
        >
          <Text style={styles.font}>交通</Text>
          <Ionicons name="checkmark" style={keyId === 1 || route.params?.chooseName === "交通" ? styles.activetick : styles.unactiveTick} />
        </TouchableOpacity>
        <Text style={styles.line}> </Text>
        <TouchableOpacity
          style={styles.listWrap}
          onPress={() => {
            typeChange(2, "飲食");
            goBack("飲食");
          }}
        >
          <Text style={styles.font}>飲食</Text>
          <Ionicons name="checkmark" style={keyId === 2 || route.params?.chooseName === "飲食" ? styles.activetick : styles.unactiveTick} />
        </TouchableOpacity>
        <Text style={styles.line}> </Text>
        <TouchableOpacity
          style={styles.listWrap}
          onPress={() => {
            typeChange(3, "購物");
            goBack("購物");
          }}
        >
          <Text style={styles.font}>購物</Text>
          <Ionicons name="checkmark" style={keyId === 3 || route.params?.chooseName === "購物" ? styles.activetick : styles.unactiveTick} />
        </TouchableOpacity>
        <Text style={styles.line}> </Text>
        <TouchableOpacity
          style={styles.listWrap}
          onPress={() => {
            typeChange(4, "生活/其他");
            goBack("生活/其他");
          }}
        >
          <Text style={styles.font}>生活/其他</Text>
          <Ionicons name="checkmark" style={keyId === 4 || route.params?.chooseName === "生活/其他" ? styles.activetick : styles.unactiveTick} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", height: Dimensions.get("window").height },
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
  font: {
    fontSize: 20,
  },
  listWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activetick: {
    color: "#FF773D",
    fontSize: 20,
  },
  unactiveTick: {
    color: "white",
  },
});

export default TypeOption;
