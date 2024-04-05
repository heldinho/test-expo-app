import * as React from "react";
import * as RN from "react-native";

export default function BoardScreen(props) {
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.header}>
        <RN.Text>🤟 Let's kick off the day</RN.Text>
        <RN.View style={styles.boxCountBacklog}>
          <RN.View style={styles.boxProgress}></RN.View>
          <RN.Text
            allowFontScaling={false}
            style={styles.fontCountBacklog}
          >{`0/2 Done`}</RN.Text>
        </RN.View>
      </RN.View>

      <RN.TouchableOpacity style={styles.boxCard}>
        <RN.View style={styles.cardTitle}>
          <RN.Text allowFontScaling={false} style={styles.font12}>
            To Do
          </RN.Text>
        </RN.View>
        <RN.View style={styles.cardLength}>
          <RN.Text allowFontScaling={false} style={styles.font12}>
            2
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>

      <RN.TouchableOpacity
        style={[styles.boxCard, { backgroundColor: "#ebf7fc" }]}
      >
        <RN.View style={[styles.cardTitle, { backgroundColor: "#c7e9ff" }]}>
          <RN.Text allowFontScaling={false} style={styles.font12}>
            In Progress
          </RN.Text>
        </RN.View>
        <RN.View style={[styles.cardLength, { backgroundColor: "#c7e9ff" }]}>
          <RN.Text allowFontScaling={false} style={styles.font12}>
            2
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>

      <RN.TouchableOpacity
        style={[styles.boxCard, { backgroundColor: "#eefae8" }]}
      >
        <RN.View style={[styles.cardTitle, { backgroundColor: "#cbf0b9" }]}>
          <RN.Text allowFontScaling={false} style={styles.font12}>
            Done
          </RN.Text>
        </RN.View>
        <RN.View style={[styles.cardLength, { backgroundColor: "#cbf0b9" }]}>
          <RN.Text allowFontScaling={false} style={styles.font12}>
            2
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  font12: {
    fontSize: 12,
    color: "#222",
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
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
