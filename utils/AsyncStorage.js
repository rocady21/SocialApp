import AsyncStorage from "@react-native-async-storage/async-storage"
// obtener datos
const getStorage = async (key)=> {
    try {
        const value = await AsyncStorage.getItem(key)
        console.log("XDA");
        console.log(value);
        return value
    } catch (error) {
        console.log(error);
        return "no-token"
    }
}

const setItemStorage = async (key,value)=> {
    try {
        const data = await AsyncStorage.setItem(key,JSON.stringify(value))
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


const removeValueStorage = async (key) => {
    console.log(key);
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      // remove error
      console.log(e);
    }
  
    console.log('Done.')
  }


  const ClearStorage = async()=> {
    try {
        await AsyncStorage.clear()
      } catch(e) {
        // clear error
        console.log(error);
      }
  }
  

export {
    getStorage,
    setItemStorage,
    removeValueStorage,
    ClearStorage
    
}