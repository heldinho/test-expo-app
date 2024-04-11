import * as React from 'react';
import * as RN from 'react-native';
import { colorPriority } from '../constants';
import type { Item, Priority } from '../../../types';

type Props = {
  item: Item;
  edit?: (item: Item, p: Priority) => void;
};

export default function SelectPriority(props: Props): JSX.Element {
  const [show, setShow] = React.useState(false);
  return (
    <RN.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <RN.TouchableOpacity
        onPress={() => setShow(!show)}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 100,
          backgroundColor: colorPriority[props.item.priority],
        }}
      >
        <RN.Text
          allowFontScaling={false}
          style={{ fontSize: 12, color: '#000' }}
        >
          {props.item.priority}
        </RN.Text>
      </RN.TouchableOpacity>
      <>
        {show ? (
          <>
            {['low', 'medium', 'high'].map((p: Priority) => (
              <RN.View key={p}>
                {p !== props.item.priority && (
                  <RN.TouchableOpacity
                    onPress={() => {
                      props.edit(props.item, p);
                      setShow(false);
                    }}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 100,
                      backgroundColor: colorPriority[p],
                    }}
                  >
                    <RN.Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 12,
                        color: '#000',
                      }}
                    >
                      {p}
                    </RN.Text>
                  </RN.TouchableOpacity>
                )}
              </RN.View>
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    </RN.View>
  );
}
