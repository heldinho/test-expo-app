import * as React from "react";
import * as RN from "react-native";
import { read } from "../services/storage";
import uuid from "react-native-uuid";
import ButtonCard from "../components/button-card.component";
import Header from "../components/header.component";
import { AntDesign } from "@expo/vector-icons";

export default function BoardScreen(props) {
  const [countTodo, setCountTodo] = React.useState(0);
  const [countProgress, setCountProgress] = React.useState(0);
  const [countDone, setCountDone] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const valTodo = await read("todo");
      const valProgress = await read("progress");
      const valDone = await read("done");
      setCountTodo(valTodo ? JSON.parse(valTodo).length : 0);
      setCountProgress(valProgress ? JSON.parse(valProgress).length : 0);
      setCountDone(valDone ? JSON.parse(valDone).length : 0);
    })();
  }, []);

  return (
    <RN.View style={styles.container}>
      <Header title="🤟 Let's kick off the day" count={0} length={10} />

      <ButtonCard
        title="To Do"
        count={countTodo}
        bgcolor="#f4f4f4"
        badgecolor="#e4e4e4"
        icon={{
          fontfamily: "Feather",
          name: "progress-check",
          size: 18,
          color: "#5e5c5c",
        }}
      />

      <ButtonCard
        title="In Progress"
        count={countProgress}
        bgcolor="#ebf7fc"
        badgecolor="#c7e9ff"
        icon={{
          fontfamily: "MaterialCommunityIcons",
          name: "progress-check",
          size: 18,
          color: "#427699",
        }}
      />

      <ButtonCard
        title="Done"
        count={countDone}
        bgcolor="#eefae8"
        badgecolor="#cbf0b9"
        icon={{
          fontfamily: "Ionicons",
          name: "progress-check",
          size: 18,
          color: "#58c322",
        }}
      />

      <RN.Modal visible animationType="slide">
        <RN.View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
          <RN.View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <RN.Text>To Do</RN.Text>
            <AntDesign name="close" size={24} color="#444" />
          </RN.View>
        </RN.View>
      </RN.Modal>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
