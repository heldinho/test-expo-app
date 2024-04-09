import * as React from 'react';
import * as RN from 'react-native';

type Props = {
  val: string;
  onEndEditing: (value: string) => string;
};
export default function Input({ val, onEndEditing }: Props): JSX.Element {
  const [value, setValue] = React.useState(val);
  return (
    <RN.TextInput
      allowFontScaling={false}
      style={{
        flex: 0.9,
        fontSize: 12,
        color: '#444',
        padding: 0,
        paddingHorizontal: 5,
      }}
      value={value}
      onChangeText={setValue}
      onEndEditing={() => onEndEditing(value)}
    />
  );
}
