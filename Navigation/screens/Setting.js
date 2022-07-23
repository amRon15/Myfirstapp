import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, Animated } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RNExitApp from "react-native-exit-app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useMemo } from "react";
import Toast from "react-native-root-toast";

const Settings = () => {
  const [neverSee, setNeverSee] = useState("");
  const [shut, setShut] = useState("");
  const [dotyou, setDotYou] = useState("");
  const [sry, setSry] = useState("");
  const [tapTime, setTapTime] = useState(0);
  const [fake, setFake] = useState();
  const [real, setReal] = useState();
  const [tap, setTap] = useState(0);
  const translation = useState(new Animated.Value(0))[0];
  const translationX = useState(new Animated.Value(0))[0];

  const loadData = async () => {
    let seeya = await AsyncStorage.getItem("seeya");
    let silence = await AsyncStorage.getItem("shut");
    let dot = await AsyncStorage.getItem("dot");
    let sosry = await AsyncStorage.getItem("polite");
    let fakename = await AsyncStorage.getItem("liarname");
    let realname = await AsyncStorage.getItem("realname");
    if (seeya !== null) {
      setNeverSee(seeya);
    }
    if (silence !== null) {
      setShut(silence);
    }
    if (dot !== null) {
      setDotYou(dot);
    }
    if (sosry !== null) {
      setSry(sosry);
    }
    if (fakename !== null) {
      setFake(fakename);
    }
    if (realname != null) {
      setReal(realname);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const silencePress = () => {
    if (tapTime >= 3) {
      let toast = Toast.show("此按鍵停止發言", {
        duration: 2000,
        position: Toast.positions.CENTER,
        backgroundColor: "black",
        textColor: "#fff",
        shadow: false,
      });
      move();
    } else if (tapTime < 3) {
      let toast = Toast.show("🤫", {
        duration: 2000,
        position: Toast.positions.CENTER,
        backgroundColor: "black",
        textColor: "#fff",
        shadow: false,
      });
    }
  };

  const dotPress = () => {
    if (tapTime >= 3) {
      let toast = Toast.show("此按鍵已失去説話功能", {
        duration: 2000,
        position: Toast.positions.CENTER,
        backgroundColor: "black",
        textColor: "#fff",
        shadow: false,
      });
      move();
    } else if (tapTime < 3) {
      let toast = Toast.show("...", {
        duration: 2000,
        position: Toast.positions.CENTER,
        backgroundColor: "black",
        textColor: "#fff",
        shadow: false,
      });
    }
  };

  const btnPress = () => {
    if (sry || tap >= 2) {
      Alert.prompt(
        "不好意思,這是意見反映",
        "不好意思,請寫下意見交給我吧!",
        [
          { text: "提交", onPress: () => secondPress() },
          { text: "取消", onPress: () => console.log("not ok"), style: "cancel" },
        ],
        "plain-text"
      );
    } else
      Alert.prompt(
        "意見反映",
        "寫下意見交給我吧!",
        [
          {
            text: "提交",
            onPress: () => {
              secondPress();
            },
          },
          { text: "取消", onPress: () => console.log("not ok"), style: "cancel" },
        ],
        "plain-text"
      );
  };

  const secondPress = () => {
    if (sry || tapTime >= 2) {
      Alert.alert("不好意思,確定提交嗎?", "不好意思,您可以按取消以繼續填寫", [
        {
          text: "確認提交",
          onPress: () => thirdPress(),
        },
        { text: "取消", onPress: () => btnPress(), style: "cancel" },
      ]);
    } else
      Alert.alert("確定提交?", "按取消以繼續填寫", [
        {
          text: "確認提交",
          onPress: () => thirdPress(),
        },
        { text: "取消", onPress: () => btnPress(), style: "cancel" },
      ]);
  };

  const thirdPress = () => {
    if (sry || tapTime >= 2) {
      Alert.alert("感謝您提供寶貴的意見!", "不好意思,請問您願意玩個游戲嗎?", [
        {
          text: "好",
          onPress: () => gameStart(),
        },
        { text: "不好意思", onPress: () => secondsorryNoGame() },
        { text: "不想,別煩了", onPress: () => noGame() },
      ]);
    } else
      Alert.alert("感謝提供意見!", "對了!你想玩個游戲嗎?😉", [
        {
          text: "好",
          onPress: () => gameStart(),
        },
        { text: "不好意思", onPress: () => sorryNoGame() },
        { text: "不想,別煩了", onPress: () => noGame() },
      ]);
  };
  const secondsorryNoGame = () => {
    Alert.alert("不好意思,打擾你了!", "祝你有個愉快的一天!", [
      {
        text: "謝謝你",
        onPress: () => {
          thankyou();
          setTap((prev) => prev + 1);
        },
      },
      {
        text: "😐",
        onPress: () => {
          neutral();
          setTap((prev) => prev + 1);
        },
      },
      {
        text: "😑",
        onPress: () => {
          emoless();
          setTap((prev) => prev + 1);
        },
      },
    ]);
  };
  const neutral = () => {
    let toast = Toast.show("😐,距離感", {
      duration: 3000,
      position: Toast.positions.CENTER,
      backgroundColor: "black",
      textColor: "#fff",
      shadow: false,
      opacity: 0.5,
    });
  };

  const emoless = () => {
    let toast = Toast.show("😑,太..太有禮貌了", {
      duration: 3000,
      position: Toast.positions.CENTER,
      backgroundColor: "black",
      textColor: "#fff",
      shadow: false,
      opacity: 0.5,
    });
  };

  const thankyou = () => {
    let toast = Toast.show("不用客氣,能服務您是我的榮幸!            歡迎再次光臨!", {
      duration: 3000,
      position: Toast.positions.CENTER,
      backgroundColor: "black",
      textColor: "#fff",
      shadow: false,
      opacity: 0.5,
    });
  };
  const gameStart = () => {
    Alert.alert("敬請期待", "被騙了吧?", [
      {
        text: "好吧",
        onPress: () => sorrytoyou(),
      },
      {
        text: "fxxx you",
        onPress: () => getMad(),
      },
    ]);
  };
  const sorrytoyou = () => {
    Alert.alert("抱歉騙你了", "要聽個笑話嗎?😁", [
      { text: "好", onPress: () => joke() },
      {
        text: "對不起我真的沒心情",
        onPress: () => {
          noMood();
          setTap((prev) => prev + 1);
        },
      },
      { text: "不好意思", onPress: () => secondsorryNoGame() },
    ]);
  };
  const noGame = () => {
    Alert.alert("😢", "😢😢😢😢😢😢", [
      {
        text: "對不起今天過得不太順利",
        onPress: () => getSad(),
      },
      {
        text: "滾開好嗎?",
        onPress: () => getMad(),
      },
    ]);
  };
  const getSad = () => {
    Alert.alert("😢😢😢😢😢😢", "要聽個笑話嗎?😁", [
      { text: "好", onPress: () => joke() },
      { text: "對不起我真的沒心情", onPress: () => noMood() },
    ]);
  };
  const joke = () => {
    Alert.alert("😁", "其實我不會收到你填寫的意見,有問題還是直接發信息吧!", [
      {
        text: "額",
        onPress: () => yourName(),
      },
    ]);
  };
  const yourName = () => {
    Alert.prompt(
      "對了",
      "我該怎麽稱呼你呢?",
      [
        {
          text: "這樣",
          onPress: (name) => {
            isityourname(name);
          },
        },
      ],
      "plain-text"
    );
  };

  const isityourname = (name) => {
    if (name.length < 10 && name.length > 0) {
      Alert.alert("OK", "就這樣稱呼你嗎?", [
        {
          text: "沒錯",
          onPress: () => {
            setTap((prev) => prev + 1);
            setrealname(name);
            getRealname();
          },
        },
        {
          text: "其實不是",
          onPress: () => notrealname(),
        },
      ]);
    } else if (name.length >= 10) {
      Alert.alert("名字短一點比較好記", "抱歉🥲", [
        {
          text: "好吧",
          onPress: () => yourNameagain(),
        },
      ]);
    } else if (name.length === 0) {
      Alert.alert("別擔心", "你的名字只有我知道", [
        {
          text: " ",
          onPress: () => yourNameagain(),
        },
      ]);
    }
  };

  const yourNameagain = () => {
    Alert.prompt(
      "  ",
      "我該怎麽稱呼你呢?",
      [
        {
          text: "這樣",
          onPress: (name) => {
            isityourname(name);
          },
        },
      ],
      "plain-text"
    );
  };

  const getRealname = () => {
    Alert.alert("好的!", "我記住了!", [
      {
        text: " ",
      },
    ]);
  };

  const notrealname = () => {
    Alert.prompt(
      "🙄",
      "騙",
      [
        {
          text: "其實是這個",
          onPress: (name) => {
            getname(name);
          },
        },
      ],
      "plain-text"
    );
  };

  const getname = (name) => {
    if (name.length < 10 && name.length > 0) {
      Alert.alert("好的騙子", "我記住了騙子", [
        {
          text: " ",
          onPress: () => {
            setTap((prev) => prev + 1);
            setliarname(name);
          },
        },
      ]);
    } else if (name.length >= 10) {
      Alert.alert("名字短一點比較好記", "抱歉🤪", [
        {
          text: "好吧",
          onPress: () => getshortname(),
        },
      ]);
    } else if (name.length === 0) {
      Alert.alert("無名氏?", "告訴我你的名字吧", [
        {
          text: "好吧",
          onPress: () => yourNameagain(),
        },
      ]);
    }
  };

  const getshortname = () => {
    Alert.prompt(
      "請",
      " ",
      [
        {
          text: "其實是這個",
          onPress: (name) => {
            getname(name);
          },
        },
      ],
      "plain-text"
    );
  };
  const setrealname = async (name) => {
    await AsyncStorage.setItem("realname", name);
  };
  const setliarname = async (name) => {
    await AsyncStorage.setItem("liarname", name);
  };

  const noMood = () => {
    Alert.alert(
      "I sit at my window this morning where the world like a passer-by stops for a moment, nods to me and goes",
      "- Rabindranath Tagore, Stray Birds",
      [
        {
          text: "  ",
          onPress: () => console.log("bye"),
        },
      ]
    );
  };
  const getMad = () => {
    Alert.alert("😭😭😭", "說話太過分了", [
      {
        text: "  ",
        onPress: () => {
          silence("silence");
          setTap((prev) => prev + 1);
        },
      },
      {
        text: "...",
        onPress: () => {
          dot("dot");
          setTap((prev) => prev + 1);
        },
      },
    ]);
  };

  const silence = async (string) => {
    await AsyncStorage.setItem("shut", string);
    Alert.alert(" ", " ");
  };
  const dot = async (string) => {
    await AsyncStorage.setItem("dot", string);
    Alert.alert("...", " ", [{ text: "???" }]);
  };
  const sorryNoGame = () => {
    Alert.alert("😔", "好吧", [
      { text: "我還是玩玩看", onPress: () => gameStart() },
      {
        text: "真的不好意思",
        onPress: () => {
          reallySorry();
          setTap((prev) => prev + 2);
        },
      },
      {
        text: "煩死了,可以不用再見到你嗎?",
        onPress: () => {
          neverSeeAgain("bye");
          setTap((prev) => prev + 1);
        },
      },
    ]);
  };

  const neverSeeAgain = async (string) => {
    await AsyncStorage.setItem("seeya", string);
  };
  const reallySorry = () => {
    Alert.alert("😟", "噢對不起,再見了", [
      {
        text: "沒關係,再見",
        onPress: () => {
          sosorry("sosry");
          setTap((prev) => prev + 1);
        },
      },
    ]);
  };
  const sosorry = async (string) => {
    await AsyncStorage.setItem("polite", string);
  };

  const tapuseless = () => {
    if (tapTime >= 3) {
      let toast = Toast.show("請你離開吧", {
        duration: 1000,
        position: Toast.positions.CENTER,
        backgroundColor: "black",
        textColor: "#fff",
        shadow: false,
        opacity: 0.5,
      });
    } else if (tapTime < 3) {
      let toast = Toast.show("此按鍵已被遺棄", {
        duration: 1000,
        position: Toast.positions.CENTER,
        backgroundColor: "black",
        textColor: "#fff",
        shadow: false,
        opacity: 0.5,
      });
    }
  };

  const thisReal = () => {
    let toast = Toast.show("😊很高興再見啊" + real, {
      duration: 1000,
      position: Toast.positions.CENTER,
      backgroundColor: "black",
      textColor: "#fff",
      shadow: false,
      opacity: 0.5,
    });
  };

  const thisfake = () => {
    let toast = Toast.show("😙你好啊騙子" + fake, {
      duration: 1000,
      position: Toast.positions.CENTER,
      backgroundColor: "black",
      textColor: "#fff",
      shadow: false,
      opacity: 0.5,
    });
  };
  const clear = async () => {
    await AsyncStorage.removeItem("seeya");
    await AsyncStorage.removeItem("shut");
    await AsyncStorage.removeItem("dot");
    await AsyncStorage.removeItem("polite");
    await AsyncStorage.removeItem("realname");
    await AsyncStorage.removeItem("liarname");
  };

  const move = () => {
    Animated.timing(translation, {
      toValue: 500,
      friction: 5,
      duration: 7000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    clear();
    // console.warn(tap);
  }, []);

  return (
    <View style={styles.container}>
      {neverSee ? (
        <Animated.View style={{ paddingRight: translation }}>
          <TouchableOpacity
            onPress={() => {
              tapuseless();
              setTapTime((prev) => prev + 1);
            }}
          >
            <View style={styles.btn}>
              <Text style={{ fontSize: 20 }}>意見反映</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : shut ? (
        <Animated.View style={{ paddingRight: translation }}>
          <TouchableOpacity
            onPress={() => {
              silencePress();
              setTapTime((prev) => prev + 1);
            }}
          >
            <View style={styles.btn}>
              <Text style={{ fontSize: 20 }}>意見反映</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : dotyou ? (
        <Animated.View style={{ paddingRight: translation }}>
          <TouchableOpacity
            onPress={() => {
              dotPress();
              setTapTime((prev) => prev + 1);
            }}
          >
            <View style={styles.btn}>
              <Text style={{ fontSize: 20 }}>意見反映</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : real ? (
        <TouchableOpacity
          onPress={() => {
            thisReal();
            setTapTime((prev) => prev + 1);
          }}
        >
          <View style={styles.btn}>
            <Text style={{ fontSize: 20 }}>意見反映</Text>
          </View>
        </TouchableOpacity>
      ) : fake ? (
        <TouchableOpacity
          onPress={() => {
            thisfake();
            setTapTime((prev) => prev + 1);
          }}
        >
          <View style={styles.btn}>
            <Text style={{ fontSize: 20 }}>意見反映</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (tap === 0) btnPress();
          }}
        >
          <View style={styles.btn}>
            <Text style={{ fontSize: 20 }}>意見反映</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: Dimensions.get("window").height,
  },
  btn: { marginTop: 200, textAlign: "center", alignItems: "center", justifyContent: "center", transform: [{ rotateX: "deg" }] },
});
export default Settings;
