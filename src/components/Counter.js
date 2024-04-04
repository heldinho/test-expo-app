import * as React from "react";
import * as RN from "react-native";
import TextCounter from "./TextCounter";
import ButtonCounter from "./ButtonIncrement";

export default function Counter() {
  return (
    <RN.View style={{ gap: 20, padding: 20 }}>
      <TextCounter />
      <RN.View
        style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}
      >
        <ButtonCounter title="Incrementar" />
        <ButtonCounter title="Decrementar" negative />
      </RN.View>
    </RN.View>
  );
}
