import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";
import { View,Text,Button,StyleSheet,ScrollView,TextInput,TouchableOpacity,Image,SafeAreaView } from "react-native"
import { useMessageSlice } from "../../hooks/useMessagesSlice";
import Icon from "react-native-vector-icons/FontAwesome"
import Arrow from "react-native-vector-icons/SimpleLineIcons"
import More from "react-native-vector-icons/Feather"
import MessageCard from "../../components/MessageCard";

const MessagesPage = ({navigation,route,infoUserSelected})=> {


    const {SeleccionarChat,loadMessageFromUser,messages,sendMessage} = useMessageSlice()
    const [message,setMessage] = useState("")
    const {id,nombre_user,photo} = route.params

    useEffect(() => {
      // con este evento al desmontarse el componente volvera a mostrarse el navbar
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
          SeleccionarChat(false)
        });
        return unsubscribe;
      }, [navigation]);

    useEffect(()=> {
      loadMessageFromUser(id)
    },[])
      

    const actualizarMensaje = (txt)=> {
      setMessage(txt)
    }
    

    const goBack = ()=> {
      navigation.goBack()
    }
      

    return (
        <SafeAreaView style={styles.padre}>
          <View style={styles.InfoContact}>
            <TouchableOpacity onPress={goBack}>
              <Arrow name="arrow-left" size={20} color={"white"}/>
            </TouchableOpacity>

            <View style={styles.datos}>
                <Image style={styles.img} source={{
                  uri:photo
                }}/>
              <Text style={styles.name}>{nombre_user}</Text>

            </View>
            <More name="more-vertical" size={20} color={"white"}/>
          </View>
          <ScrollView style={styles.Messages}>

            {
              messages[0]? messages.map((msg,index)=> {
                return <MessageCard key={index} is_me={msg.is_me} message={msg.mensaje} />
            }) : <Text>No hay chats</Text>
            }




          </ScrollView>
          <View style={styles.sendMessage}>
            <TextInput
              value={message}
              onChange={(text)=>actualizarMensaje(text)}
              style={styles.textInput}
              placeholder="Mensaje..."
            />
            <TouchableOpacity style={styles.bottonEnviar} >
              <Icon size={20} name="send-o" color={"white"} />
            </TouchableOpacity>
            
          </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  padre:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },
  InfoContact:{
    height:75,
    width:"100%",
    backgroundColor:"#2a2a2f",
    position:"absolute",
    paddingHorizontal:15,
    paddingVertical:15,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    elevation:100
  },
  name:{
    textAlign:"center",
    fontSize:18,
    color:"white"
  },
  Messages:{
    flexGrow: 1,
    width:"100%",

    backgroundColor: "#F1F1F1",
    marginTop: 100,
    paddingHorizontal: 25,
    paddingVertical: 10,
    display:"flex",
    flexDirection:"column-reverse",
  },
  sendMessage:{
    width:"80%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginVertical:15,
    backgroundColor:"#E1E1E1",
    borderRadius:15,
    paddingHorizontal:15,
    paddingVertical:10
  },

  textInput:{
    width:"80%",

  },
  bottonEnviar:{
    width:40,
    height:40,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#00125C",
    borderRadius:100
  },
  datos:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  imgCard:{
    width:50,
    height:50
  },
  img:{
    width:40,
    height:40,
    backgroundColor:"white",
    borderRadius:50,
    marginRight:10
  }
  
})

export default MessagesPage