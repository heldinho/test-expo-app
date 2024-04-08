import * as React from 'react';
import * as RN from 'react-native';

type Props = {
  title: string;
  count: number;
  bgcolor: string;
  badgecolor: string;
  icon: React.ReactElement;
  onPress?: () => void;
  disabled?: boolean;
};

export default function ButtonCard(props: Props): JSX.Element {
  return (
    <RN.TouchableOpacity
      style={[styles.boxCard, { backgroundColor: props.bgcolor }]}
      onPress={props.onPress}
      disabled={props.disabled || false}
    >
      <RN.View
        style={[styles.cardTitle, { backgroundColor: props.badgecolor }]}
      >
        {props.icon || <></>}
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
    color: '#222',
  },
  boxCard: {
    backgroundColor: '#f4f4f4',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  cardTitle: {
    backgroundColor: '#e4e4e4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    gap: 8,
  },
  cardLength: {
    width: 40,
    height: 40,
    backgroundColor: '#e4e4e4',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
