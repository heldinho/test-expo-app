import * as React from "react";
import * as RN from "react-native";

type Props = {
  title: string;
  count: number;
  length: number;
};

export default function Header(props: Props): JSX.Element {
  return (
    <RN.View style={styles.header}>
      <RN.Text>{props.title || ''}</RN.Text>
      <RN.View style={styles.boxCountBacklog}>
        <RN.View style={styles.boxProgress}></RN.View>
        <RN.Text
          allowFontScaling={false}
          style={styles.fontCountBacklog}
        >{`${props.count || 0}/${props.length || 0} Done`}</RN.Text>
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  header: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    margin: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxCountBacklog: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  boxProgress: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 100,
  },
  fontCountBacklog: {
    fontSize: 10,
    color: "#444",
  },
});
