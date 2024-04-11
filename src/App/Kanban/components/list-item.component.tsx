import * as React from 'react';
import * as RN from 'react-native';
import type { Item, List, Priority } from '../../../types';
import Icons from '../../../components/Icons';
import { colorPriority } from '../constants';
import Input from './input.component';
import SelectPriority from './select-priority.component';

type Props = {
  type: List;
  data: Item[];
  remove: (item: Item) => void;
  moveToDone?: (item: Item) => void;
  editTitle?: (item: Item) => any;
  editPriority?: (item: Item, p: Priority) => void;
  move?: (item: Item, list: List) => void;
};

export default function ListItem(props: Props): JSX.Element {
  switch (props.type) {
    case 'todo':
      return (
        <RN.View
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderColor: '#f1f1f1',
          }}
        >
          <RN.FlatList
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 100,
              gap: 20,
            }}
            data={props.data}
            renderItem={({ item }) => (
              <RN.View
                style={{
                  borderRadius: 8,
                  elevation: 5,
                  backgroundColor: '#fff',
                  padding: 20,
                  gap: 25,
                }}
              >
                <RN.View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RN.View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <RN.TouchableOpacity onPress={() => props.moveToDone(item)}>
                      <Icons
                        type="Fontisto"
                        name="checkbox-passive"
                        size={18}
                        color="#444"
                      />
                    </RN.TouchableOpacity>
                    <Input
                      val={item.title}
                      onEndEditing={title =>
                        props.editTitle({ ...item, title })
                      }
                    />
                  </RN.View>
                  <RN.TouchableOpacity onPress={() => props.remove(item)}>
                    <Icons
                      type="FontAwesome"
                      name="trash-o"
                      size={18}
                      color="#444"
                    />
                  </RN.TouchableOpacity>
                </RN.View>
                <RN.View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <SelectPriority item={item} edit={props.editPriority} />
                  <RN.TouchableOpacity
                    onPress={() => props.move(item, 'progress')}
                  >
                    <Icons
                      type="MaterialCommunityIcons"
                      name="progress-check"
                      size={18}
                      color="#444"
                    />
                  </RN.TouchableOpacity>
                </RN.View>
              </RN.View>
            )}
          />
        </RN.View>
      );
    case 'progress':
      return (
        <RN.View
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderColor: '#f1f1f1',
          }}
        >
          <RN.FlatList
            contentContainerStyle={{
              padding: 20,
              gap: 20,
            }}
            data={props.data}
            renderItem={({ item }) => (
              <RN.View
                style={{
                  borderRadius: 8,
                  elevation: 5,
                  backgroundColor: '#fff',
                  padding: 20,
                  gap: 10,
                }}
              >
                <RN.View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RN.View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <RN.TouchableOpacity onPress={() => props.moveToDone(item)}>
                      <Icons
                        type="Fontisto"
                        name="checkbox-passive"
                        size={18}
                        color="#444"
                      />
                    </RN.TouchableOpacity>
                    <Input
                      val={item.title}
                      onEndEditing={title =>
                        props.editTitle({ ...item, title })
                      }
                    />
                  </RN.View>
                  <RN.TouchableOpacity onPress={() => props.remove(item)}>
                    <Icons
                      type="FontAwesome"
                      name="trash-o"
                      size={18}
                      color="#444"
                    />
                  </RN.TouchableOpacity>
                </RN.View>
                <RN.View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <SelectPriority item={item} edit={props.editPriority} />
                  <RN.TouchableOpacity onPress={() => props.move(item, 'todo')}>
                    <Icons
                      type="Feather"
                      name="pause-circle"
                      size={18}
                      color="#5e5c5c"
                    />
                  </RN.TouchableOpacity>
                </RN.View>
              </RN.View>
            )}
          />
        </RN.View>
      );
    case 'done':
      return (
        <RN.View
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderColor: '#f1f1f1',
          }}
        >
          <RN.FlatList
            contentContainerStyle={{
              padding: 20,
              gap: 20,
            }}
            data={props.data}
            renderItem={({ item }) => (
              <RN.View
                style={{
                  borderRadius: 8,
                  elevation: 5,
                  backgroundColor: '#fff',
                  padding: 20,
                  gap: 10,
                }}
              >
                <RN.View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RN.View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <Icons
                      type="Ionicons"
                      name="checkmark-circle"
                      size={18}
                      color="#58c322"
                    />
                    <RN.Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 12,
                        color: '#444',
                      }}
                    >
                      {item.title}
                    </RN.Text>
                  </RN.View>
                  <RN.TouchableOpacity onPress={() => props.remove(item)}>
                    <Icons
                      type="FontAwesome"
                      name="trash-o"
                      size={18}
                      color="#444"
                    />
                  </RN.TouchableOpacity>
                </RN.View>
                <RN.View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RN.View
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 100,
                      backgroundColor: colorPriority[item.priority],
                    }}
                  >
                    <RN.Text
                      allowFontScaling={false}
                      style={{ fontSize: 12, color: '#444' }}
                    >
                      {item.priority}
                    </RN.Text>
                  </RN.View>
                </RN.View>
              </RN.View>
            )}
          />
        </RN.View>
      );
    default:
      return <></>;
  }
}
