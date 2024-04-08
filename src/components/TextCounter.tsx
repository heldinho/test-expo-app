import * as React from 'react';
import * as RN from 'react-native';
import { useRecoilState } from 'recoil';
import { counterAtom } from '../atoms/CounterAtom';

export default function TextCounter() {
  const count = useRecoilState(counterAtom);
  return (
    <RN.View>
      <RN.Text style={{ textAlign: 'center' }}>{count}</RN.Text>
    </RN.View>
  );
}
