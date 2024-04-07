import * as React from "react";
import * as RN from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  title: string;
  count: number;
  bgcolor: string;
  badgecolor: string;
  icon: {
    fontfamily?: any;
    name: any;
    size: number;
    color: string;
  };
};

export default function ButtonCard(props: Props): JSX.Element {
  return (
    <RN.TouchableOpacity
      style={[styles.boxCard, { backgroundColor: props.bgcolor }]}
    >
      <RN.View
        style={[styles.cardTitle, { backgroundColor: props.badgecolor }]}
      >
        {props.icon.fontfamily === "Feather" && (
          <Feather name="pause-circle" size={18} color="#5e5c5c" />
        )}
        {props.icon.fontfamily === "MaterialCommunityIcons" && (
          <MaterialCommunityIcons
            name="progress-check"
            size={18}
            color="#427699"
          />
        )}
        {props.icon.fontfamily === "Ionicons" && (
          <Ionicons name="checkmark-circle" size={18} color="#58c322" />
        )}
        <RN.Text allowFontScaling={false} style={styles.font12}>
          {props.title}
        </RN.Text>
      </RN.View>
      <RN.View
        style={[styles.cardLength, { backgroundColor: props.badgecolor }]}
      >
        <RN.Text allowFontScaling={false} style={styles.font12}>
          {props.count}
        </RN.Text>
      </RN.View>
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  font12: {
    fontSize: 12,
    color: "#222",
  },
  boxCard: {
    backgroundColor: "#f4f4f4",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  cardTitle: {
    backgroundColor: "#e4e4e4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    gap: 8,
  },
  cardLength: {
    width: 40,
    height: 40,
    backgroundColor: "#e4e4e4",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
