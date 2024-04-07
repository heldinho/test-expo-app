import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export async function read(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) return value;
    return null;
  } catch (error) {
    console.log(error);
  }
}
