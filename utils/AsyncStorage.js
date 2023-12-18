import AsyncStorage from "@react-native-async-storage/async-storage"
// obtener datos
const getStorage = async (key)=> {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            console.log(value)
            return value
        }
    } catch (error) {
        console.log(error);
    }
}

const setItemStorage = async (key,value)=> {
    try {
        const valueF = typeof value == "object"? JSON.stringify(value) : value
        const data = await AsyncStorage.setItem(key,JSON.stringify(valueF))

    } catch (error) {
        console.log(error);
    }
}


const removeValueStorage = async (key) => {
    try {
      await AsyncStorage.removeItem('key')
    } catch(e) {
      // remove error
      console.log(e);
    }
  
    console.log('Done.')
  }


export {
    getStorage,
    setItemStorage,
    removeValueStorage
    
}