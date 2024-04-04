import * as React from "react";
import * as RN from "react-native";
import { RecoilRoot } from "recoil";
import Counter from "./src/components/Counter";
import Animation from "./src/components/Animation";
import Title from "./src/components/Title";

export default function App() {
  //   const [count, setCount] = useRecoilState(counterAtom);
  return (
    <RN.SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <Title text="Application Expo" />
      <RN.View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <RecoilRoot>
          <Counter />
        </RecoilRoot>
      </RN.View>
      <RN.View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Animation />
      </RN.View>
    </RN.SafeAreaView>
  );
}
