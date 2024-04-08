import * as React from 'react';
import * as RN from 'react-native';
import { read, save } from '../services/storage';
import ButtonCard from '../components/button-card.component';
import Header from '../components/header.component';
import Icons from '../../../components/Icons';
import { useRecoilState } from 'recoil';
import { doneAtom, progressAtom, todoAtom } from '../../../atoms/Kanban';
import uuid from 'react-native-uuid';

export interface Item {
  id: string;
  priority: 'low' | 'medium' | 'high';
  title: string;
  list: 'todo' | 'progress' | 'done';
}

const colorPriority = {
  low: '#e1fbd6',
  medium: '#fff4e3',
  high: '#ffe4e2',
};

function Input({
  val,
  onEndEditing,
}: {
  val: string;
  onEndEditing: (value: string) => string;
}) {
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

export default function BoardScreen(props) {
  const [countTodo, setCountTodo] = useRecoilState<any>(todoAtom);
  const [countProgress, setCountProgress] = useRecoilState<any>(progressAtom);
  const [countDone, setCountDone] = useRecoilState<any>(doneAtom);
  const [visible, setVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const valTodo = await read('todo');
      const valProgress = await read('progress');
      const valDone = await read('done');
      setCountTodo(valTodo ? JSON.parse(valTodo) : []);
      setCountProgress(valProgress ? JSON.parse(valProgress) : []);
      setCountDone(valDone ? JSON.parse(valDone) : []);
    })();
  }, []);

  const remove = (item: Item) => {
    if (item.list === 'todo') {
      const list = countTodo.map(i => i.id !== item.id);
      save('todo', list);
      setCountTodo(list);
    }
    if (item.list === 'progress') {
      const list = countProgress.map(i => i.id !== item.id);
      save('progress', list);
      setCountProgress(list);
    }
    if (item.list === 'done') {
      const list = countDone.map(i => i.id !== item.id);
      save('done', list);
      setCountDone(list);
    }
  };

  const move = (item: Item, list: 'todo' | 'progress' | 'done') => {
    let payload: any = [];
    remove(item);
    if (list === 'todo') {
      payload = [
        ...countTodo,
        {
          ...item,
          list,
        },
      ];
      setCountTodo(payload);
    } else if (list === 'progress') {
      payload = [
        ...countProgress,
        {
          ...item,
          list,
        },
      ];
      setCountProgress(payload);
    } else if (list === 'done') {
      payload = [
        ...countDone,
        {
          ...item,
          list,
        },
      ];
      setCountDone(payload);
    }
    save(list, payload);
  };

  const moveToDone = (item: Item) => {
    const payload: any = [
      ...countDone,
      {
        ...item,
        list: 'done',
      },
    ];
    remove(item);
    save('done', payload);
    setCountDone(payload);
  };

  const newTodo = () => {
    const payload: any = [
      ...countTodo,
      {
        id: uuid.v4(),
        priority: 'high',
        title: 'Your New Task',
        list: 'todo',
      },
    ];
    save('todo', payload);
    setCountTodo(payload);
  };

  const editTitle = (item: Item): any => {
    if (item.title.length <= 0) return;
    let payload;
    if (item.list === 'todo') {
      payload = countTodo.map(i => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      });
      setCountTodo(payload);
    }
    if (item.list === 'progress') {
      payload = countTodo.map(i => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      });
      setCountTodo(payload);
    }
    save(item.list, payload);
  };

  return (
    <RN.View style={styles.container}>
      <Header
        title="🤟 Let's kick off the day"
        count={countDone.length}
        length={countTodo.length + countProgress.length + countDone.length}
      />

      <>
        <ButtonCard
          onPress={() => {
            setModalTitle('To Do');
            setVisible(true);
          }}
          title="To Do"
          count={countTodo.length}
          bgcolor="#f4f4f4"
          badgecolor="#e4e4e4"
          icon={
            <Icons
              type="Feather"
              name="pause-circle"
              size={18}
              color="#5e5c5c"
            />
          }
        />
        <ButtonCard
          onPress={() => {
            setModalTitle('In Progress');
            setVisible(true);
          }}
          title="In Progress"
          count={countProgress.length}
          bgcolor="#ebf7fc"
          badgecolor="#c7e9ff"
          icon={
            <Icons
              type="MaterialCommunityIcons"
              name="progress-check"
              size={18}
              color="#427699"
            />
          }
        />
        <ButtonCard
          onPress={() => {
            setModalTitle('Done');
            setVisible(true);
          }}
          title="Done"
          count={countDone.length}
          bgcolor="#eefae8"
          badgecolor="#cbf0b9"
          icon={
            <Icons
              type="Ionicons"
              name="checkmark-circle"
              size={18}
              color="#58c322"
            />
          }
        />
      </>

      <RN.Modal visible={visible} animationType="slide">
        <RN.View style={{ flex: 1 }}>
          <RN.View style={styles.containerModal}>
            <RN.Text
              allowFontScaling={false}
              style={{ fontSize: 20, fontWeight: '500' }}
            >
              {modalTitle}
            </RN.Text>
            <RN.TouchableOpacity
              onPress={() => {
                setModalTitle('');
                setVisible(false);
              }}
            >
              <Icons type="AntDesign" name="close" size={20} color="#444" />
            </RN.TouchableOpacity>
          </RN.View>

          <RN.View style={{ flex: 1, backgroundColor: '#fff' }}>
            <>
              {modalTitle === 'To Do' && (
                <>
                  <ButtonCard
                    disabled
                    title={modalTitle}
                    count={countTodo.length}
                    bgcolor="#f4f4f4"
                    badgecolor="#e4e4e4"
                    icon={
                      <Icons
                        type="Feather"
                        name="pause-circle"
                        size={18}
                        color="#5e5c5c"
                      />
                    }
                  />
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
                      data={countTodo}
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
                              <RN.TouchableOpacity
                                onPress={() => moveToDone(item)}
                              >
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
                                  editTitle({ ...item, title })
                                }
                              />
                            </RN.View>
                            <RN.TouchableOpacity onPress={() => remove(item)}>
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
                            <RN.TouchableOpacity
                              onPress={() => move(item, 'progress')}
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
                  <RN.TouchableOpacity
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      backgroundColor: '#444',
                      position: 'absolute',
                      bottom: 20,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => newTodo()}
                  >
                    <Icons
                      type="AntDesign"
                      name="plus"
                      size={35}
                      color="#fff"
                    />
                  </RN.TouchableOpacity>
                </>
              )}
            </>
            <>
              {modalTitle === 'In Progress' && (
                <>
                  <ButtonCard
                    disabled
                    title={modalTitle}
                    count={countProgress.length}
                    bgcolor="#ebf7fc"
                    badgecolor="#c7e9ff"
                    icon={
                      <Icons
                        type="MaterialCommunityIcons"
                        name="progress-check"
                        size={18}
                        color="#427699"
                      />
                    }
                  />
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
                      data={countProgress}
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
                              <RN.TouchableOpacity
                                onPress={() => moveToDone(item)}
                              >
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
                                  editTitle({ ...item, title })
                                }
                              />
                            </RN.View>
                            <RN.TouchableOpacity onPress={() => remove(item)}>
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
                            <RN.TouchableOpacity
                              onPress={() => move(item, 'todo')}
                            >
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
                </>
              )}
            </>
            <>
              {modalTitle === 'Done' && (
                <>
                  <ButtonCard
                    disabled
                    title={modalTitle}
                    count={countDone.length}
                    bgcolor="#eefae8"
                    badgecolor="#cbf0b9"
                    icon={
                      <Icons
                        type="Ionicons"
                        name="checkmark-circle"
                        size={18}
                        color="#58c322"
                      />
                    }
                  />
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
                      data={countDone}
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
                            <RN.TouchableOpacity onPress={() => remove(item)}>
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
                </>
              )}
            </>
          </RN.View>
        </RN.View>
      </RN.Modal>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  containerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 100,
  },
});
