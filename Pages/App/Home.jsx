import { View,Text,Button,StyleSheet } from "react-native"
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
    const {HandleMessage_recive} = useMessageSlice()
    const obtToken = async ()=> {
        const token = await getStorage("token")
        setToken(token)
    }


    useEffect(()=> {
        obtToken()
        const socket = io('https://33d3-2800-a4-125d-c500-a92f-a808-838d-e92c.ngrok-free.app', {
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