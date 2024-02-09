import { View,Text,Button,StyleSheet } from "react-native"
import { getStorage, removeValueStorage } from "../../utils/AsyncStorage"
import { useUserSlice } from "../../hooks/useUserSlice"
import { useMessageSlice } from "../../hooks/useMessagesSlice"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

const Home = ({route})=> {
    
    const [token,setToken ] = useState("")
    const {existUser,validToken} = useUserSlice()

    const obtToken = async ()=> {
        const token = await getStorage("token")
        setToken(token)
    }

    useEffect(()=> {
        obtToken()

    },[])
    

    const salir = ()=> {
        removeValueStorage("token")
        existUser()
    }

    
  
    useFocusEffect(
        useCallback(() => {
            // Lógica específica cuando la pantalla Home se enfoca


              if(token !== "" && token !== "no-token") {
                validToken(token)


            }

        }, [])
    );
  


    return (
        <View style={styles.home}>
            <Text>Pagina de Home</Text>
            <Button
            title="Salir"
            onPress={salir}
            />      
        
        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        flex:1
    }
})

export default Home