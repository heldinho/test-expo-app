import * as React from "react";
import * as RN from "react-native";

export default function Title(props) {
  return (
    <RN.Text
      style={{
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
      }}
    >
      {props.text || ""}
    </RN.Text>
  );
}
