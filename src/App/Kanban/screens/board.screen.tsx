import * as React from 'react';
import * as RN from 'react-native';
import type { Item, List, Priority } from '../../../types';
import { read, save } from '../services/storage';
import ButtonCard from '../components/button-card.component';
import Header from '../components/header.component';
import Icons from '../../../components/Icons';
import { useRecoilState } from 'recoil';
import { doneAtom, progressAtom, todoAtom } from '../../../atoms/Kanban';
import uuid from 'react-native-uuid';
import Input from '../components/input.component';
import SelectPriority from '../components/select-priority.component';

const colorPriority = {
  low: '#e1fbd6',
  medium: '#fff4e3',
  high: '#ffe4e2',
};

export default function BoardScreen(props) {
  const [todo, setTodo] = useRecoilState<any>(todoAtom);
  const [progress, setProgress] = useRecoilState<any>(progressAtom);
  const [done, setDone] = useRecoilState<any>(doneAtom);
  const [visible, setVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const valTodo = await read('todo');
      const valProgress = await read('progress');
      const valDone = await read('done');
      setTodo(valTodo ? JSON.parse(valTodo) : []);
      setProgress(valProgress ? JSON.parse(valProgress) : []);
      setDone(valDone ? JSON.parse(valDone) : []);
    })();
  }, []);

  const clean = () => {
    setTodo([]);
    setProgress([]);
    setDone([]);
    save('todo', []);
    save('progress', []);
    save('done', []);
  };

  const remove = (item: Item) => {
    if (item.list === 'todo') {
      const list = todo.filter(i => i.id !== item.id);
      save('todo', list);
      setTodo(list);
    }
    if (item.list === 'progress') {
      const list = progress.filter(i => i.id !== item.id);
      save('progress', list);
      setProgress(list);
    }
    if (item.list === 'done') {
      const list = done.filter(i => i.id !== item.id);
      save('done', list);
      setDone(list);
    }
  };

  const move = (item: Item, list: List) => {
    let payload: any = [];
    remove(item);
    if (list === 'todo') {
      payload = [
        ...todo,
        {
          ...item,
          list,
        },
      ];
      setTodo(payload);
    } else if (list === 'progress') {
      payload = [
        ...progress,
        {
          ...item,
          list,
        },
      ];
      setProgress(payload);
    } else if (list === 'done') {
      payload = [
        ...done,
        {
          ...item,
          list,
        },
      ];
      setDone(payload);
    }
    save(list, payload);
  };

  const moveToDone = (item: Item) => {
    const payload: any = [
      ...done,
      {
        ...item,
        list: 'done',
      },
    ];
    remove(item);
    save('done', payload);
    setDone(payload);
  };

  const newTodo = () => {
    const payload: any = [
      ...todo,
      {
        id: uuid.v4(),
        priority: 'high',
        title: 'Your New Task',
        list: 'todo',
      },
    ];
    save('todo', payload);
    setTodo(payload);
  };

  const editTitle = (item: Item): any => {
    if (item.title.length <= 0) return;
    let payload;
    if (item.list === 'todo') {
      payload = todo.map(i => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      });
      setTodo(payload);
    }
    if (item.list === 'progress') {
      payload = progress.map(i => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      });
      setProgress(payload);
    }
    save(item.list, payload);
  };

  const editPriority = (item: Item, priority: Priority) => {
    let payload;
    if (item.list === 'todo') {
      payload = todo.map(i => {
        if (i.id === item.id) {
          return { ...item, priority };
        }
        return i;
      });
      setTodo(payload);
    }
    if (item.list === 'progress') {
      payload = progress.map(i => {
        if (i.id === item.id) {
          return { ...item, priority };
        }
        return i;
      });
      setProgress(payload);
    }
    save(item.list, payload);
  };

  return (
    <RN.View style={styles.container}>
      <Header
        title="🤟 Let's kick off the day"
        count={done.length}
        length={todo.length + progress.length + done.length}
        onPress={clean}
      />

      <>
        <ButtonCard
          onPress={() => {
            setModalTitle('To Do');
            setVisible(true);
          }}
          title="To Do"
          count={todo.length}
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
          count={progress.length}
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
          count={done.length}
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
                    count={todo.length}
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
                      data={todo}
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
                            <SelectPriority item={item} edit={editPriority} />
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
                    count={progress.length}
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
                      data={progress}
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
                            <SelectPriority item={item} edit={editPriority} />
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
                    count={done.length}
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
                      data={done}
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
