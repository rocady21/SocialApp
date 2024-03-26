import { View,Text,Button,StyleSheet,SafeAreaView } from "react-native"
import { getStorage, removeValueStorage } from "../../utils/AsyncStorage"
import { useUserSlice } from "../../hooks/useUserSlice"
import { useMessageSlice } from "../../hooks/useMessagesSlice"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { io } from "socket.io-client"

const Home = ({route})=> {
    
    const [token,setToken ] = useState("")
    const [socket,setSocket] = useState()
    const {existUser,validToken,user,userStatus} = useUserSlice()
    const {HandleMessage_recive,resetStateMessages} = useMessageSlice()
    
    const obtToken = async ()=> {
        const token = await getStorage("token")
        setToken(token)
    }


    useEffect(()=> {
        obtToken()
        const socket = io('https://6674-2800-a4-c0aa-2200-4d17-4eb3-c057-640e.ngrok-free.app', {
            transports: ["websocket"],

          });
          socket.on("user_id_" + user.id,(data)=> {
              HandleMessage_recive(data.contact,user.id)
            })
            socket.on("response_data",(data)=>{
                console.log(data);
            })
            
            setSocket(socket)
            return ()=> {
                socket.disconnect()
                console.log("exit");
            }
        },[])
    

    const salir = ()=> {
        removeValueStorage("token")
        existUser()
        resetStateMessages()
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
        <SafeAreaView style={styles.home}>
            <Text>Pagina de Homeeeee</Text>
            <Button
            title="Salir"
            onPress={salir}
            />      
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    home:{
        flex:1,
        marginTop:15
    }
})

export default Home