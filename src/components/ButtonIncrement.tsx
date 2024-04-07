import * as React from "react";
import * as RN from "react-native";
import { useSetRecoilState } from "recoil";
import { counterAtom } from "../atoms/CounterAtom";

export default function ButtonCounter(props) {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <RN.Button
      title={props.title || ""}
      onPress={() =>
        setCount((count) => (props.negative ? count - 1 : count + 1))
      }
    />
  );
}
