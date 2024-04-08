import * as React from 'react';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Zocial,
  SimpleLineIcons,
} from '@expo/vector-icons';

export const fontFamily = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Zocial,
  SimpleLineIcons,
};

type Props = {
  type: keyof typeof fontFamily;
  name: string;
  size: number;
  color: string;
};

export default function Icons(props: Props): JSX.Element {
  const createIcon = () => {
    const Component = fontFamily[props.type];
    return React.createElement(Component, {
      name: props.name,
      size: props.size,
      color: props.color,
    });
  };
  return createIcon();
}
