import { useNavigation } from "@react-navigation/native"
import { useEffect, useRef, useState } from "react";
import { View,Text,Button,StyleSheet,ScrollView,TextInput,TouchableOpacity,Image,SafeAreaView,ActivityIndicator } from "react-native"
import { useMessageSlice } from "../../hooks/useMessagesSlice";
import Icon from "react-native-vector-icons/FontAwesome"
import Arrow from "react-native-vector-icons/SimpleLineIcons"
import More from "react-native-vector-icons/Feather"
import MessageCard from "../../components/MessageCard";
import { useUserSlice } from "../../hooks/useUserSlice";
import { io } from "socket.io-client";
const MessagesPage = ({navigation,route,infoUserSelected})=> {


    const ScrollViewRef = useRef()
    const {user} = useUserSlice()
    const {SeleccionarChat,loadMessageFromUser,messages,SendMessage,ClearMessages,onAddMessageRealTImeSocekt} = useMessageSlice()
    const [mensaje,setMensaje] = useState(``)
    const {id,nombre_user,photo,id_user_chat,user_from,user_to} = route.params


    useEffect(() => {
      loadMessageFromUser(id)
      ScrollViewRef.current.scrollToEnd({ animated: true });
      const socket = io("https://7f0b-2800-a4-130a-3600-9437-e26a-1cf1-f0d6.ngrok-free.app", {
        transports: ["websocket"],
        cors: {
          origin: "*",
        },
      });

      socket.on('mensaje_servidor', (data) => {
        console.log('Mensaje del servidor:', data.mensaje);
      });
      socket.on("chat_" + user_from + "_and_" + user_to,(data)=> {
        console.log("socekt");
        console.log(data);
        onAddMessageRealTImeSocekt(data.mensaje)
      })

      return ()=> {
        socket.disconnect()
      }
      
    }, []); // Se ejecuta al montar el componente

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
          SeleccionarChat(false)
          // tambien cada vez que se desmonte el componente, borraremos los chat
          ClearMessages()
        });
        return unsubscribe;
      }, [navigation]);



    const enviarMensaje = ()=> {
      if(mensaje !== "") {
        SendMessage(mensaje,user.id,id_user_chat,)
        setMensaje("")
      }
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
          <ScrollView 
            style={styles.Messages}
            ref={ScrollViewRef}
            contentContainerStyle={styles.contentContainer}
            onContentSizeChange={() => {
              ScrollViewRef.current.scrollToEnd({ animated: true });
            }}
          >
           
            {
              messages[0]? messages.map((msg,index)=> {
                return <MessageCard key={index} is_me={msg.is_me} message={msg.mensaje} />
            }) : <ActivityIndicator style={styles} size="small" color="black" />
            }




          </ScrollView>
          <View style={styles.sendMessage}>
            <TextInput
              value={mensaje}
              onChangeText={(text)=> setMensaje(text)}
              style={styles.textInput}
              placeholder="Mensaje..."
              onSubmitEditing={enviarMensaje}
            />
            <TouchableOpacity style={styles.bottonEnviar} onPress={enviarMensaje} >
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
    elevation:20
  },
  name:{
    textAlign:"center",
    fontSize:18,
    color:"white"
  },
  Messages: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#F1F1F1",
    marginTop: 100,
    paddingHorizontal: 25,
    paddingVertical: 10,

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
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  
})

export default MessagesPage