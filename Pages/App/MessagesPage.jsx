import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useMessageSlice } from "../../hooks/useMessagesSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import Arrow from "react-native-vector-icons/SimpleLineIcons";
import More from "react-native-vector-icons/Feather";
import { io } from "socket.io-client";
import { useUserSlice } from "../../hooks/useUserSlice";
import MessageCard from "../../components/Chat/MessageCard";
import Close from "react-native-vector-icons/EvilIcons"

const MessagesPage = ({ navigation, route }) => {
  const ScrollViewRef = useRef(null);
  const { user } = useUserSlice();
  const {
    selectedChat,
    messages,
    statusLoadingMessages,
    NoMoreMessages,
    SeleccionarChat,
    loadMessageFromUser,
    SendMessage,
    ClearMessages,
    onAddMessageRealTImeSocekt,
    ResetMoreMessages,
    message_read,
    Delete_message
  } = useMessageSlice();
  const [mensaje, setMensaje] = useState(``);
  const { id, nombre_user, photo, id_user_chat, user_from, user_to,id_user_last_message,show_last_message } = route.params
  const [mounted,setMounted] = useState(false)
  const numbersofMessages = 10;
  const totalMensajes = messages?.reduce((total, objeto) => total + objeto.messages.length, 0);
  const [index, setIndex] = useState(totalMensajes);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [modalInfoMessage,setModalInfoMessage] = useState({id_selected:null,status:false,day:null})


  const handleScroll = (event) => {
    event.persist();
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolledToTop(offsetY === 0);
  };

  useEffect(() => {
    if (isScrolledToTop && index !== 0 && NoMoreMessages === "more" && mounted === true) {
      loadMessageFromUser(id, index, numbersofMessages);
      setIndex(index + numbersofMessages);
    }
  }, [isScrolledToTop]);

  useEffect(() => {
    setMounted(true)
    if(id_user_last_message !== user.id ) {
      message_read(id)
    }
    const socket = io('https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app', {
      transports: ["websocket"],
      
    });
    socket.emit('message_to_server',{"ok":true});
    
    socket.on("mensaje_servidor",(data)=> {
    })

    socket.on("chat_" + user_from + "_and_" + user_to, (data) => {
      setIndex(index + 1)
      onAddMessageRealTImeSocekt(data.mensaje);
    });
      


    return () => {
      socket.disconnect();
      console.log("se desconecta");
      SeleccionarChat(false)
      ClearMessages();
      ResetMoreMessages();
      
    };
  }, []);


  const open_modal = (id_message,day)=> {
    setModalInfoMessage({status:true,id_selected:id_message,day:day})    
  }
  
  const DeleteMessage_F = async()=> {
    if(modalInfoMessage.id_selected !== null){
      const resp = await Delete_message(modalInfoMessage.id_selected,modalInfoMessage.day)
      if(resp === true) {
        setModalInfoMessage({day:null,id_selected:null,status:false})
      }
    }
  }
  


  const enviarMensaje = () => {
    if (mensaje !== "") {
      setIndex(index + 1)
      SendMessage(mensaje, user.id, id_user_chat,id);
      setMensaje("");
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.padre}>

    {
        modalInfoMessage.status === true && <View style={styles.delete_message}>
            <View style={styles.headerModal}>
              <TouchableOpacity onPress={()=> setModalInfoMessage({id_selected:null,status:false,day:null})}>
                  <Close name="close" size={20}/>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsModal}>
              <TouchableOpacity onPress={DeleteMessage_F} style={styles.buttonMF}>
                <Text style={{textAlign:"center"}}>Borrar Mensaje</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMF}>
                <Text style={{textAlign:"center"}}>Editar Mensaje</Text>
              </TouchableOpacity>
            </View>
        </View>
      }
      <View style={styles.InfoContact}>
        <TouchableOpacity onPress={goBack}>
          <Arrow name="arrow-left" size={20} color={"white"} />
        </TouchableOpacity>

        <View style={styles.datos}>
          <Image style={styles.img} source={{ uri: photo }} />
          <Text style={styles.name}>{nombre_user}</Text>
        </View>
        <More name="more-vertical" size={20} color={"white"} />
      </View>
      <ScrollView
        style={styles.Messages}
        ref={ScrollViewRef}
        contentContainerStyle={styles.contentContainer}
        onContentSizeChange={() => {
          ScrollViewRef.current.scrollToEnd({ animated: false });
        }}
        onScroll={handleScroll}
      >


        {
        messages[0] ? (

        messages.map((msg_day, index) => (
          <View key={index} style={styles.messages_day}>
            <Text style={{ textAlign: "center", marginVertical: 5 }}>
              {msg_day.day}
            </Text>
            {msg_day.messages.map((msg, index) => (
              <MessageCard
                key={msg.id}
                is_me={msg.is_me}
                message={msg.mensaje}
                time={msg.fecha}
                day={msg_day.day}
                id={msg.id}
                abrirModal={(id,day)=> open_modal(id,day)}
                />
            ))}
          </View>
        ))
      ) : !messages[0]? (
        <Text>¡Envía tu primer mensaje!</Text>
      ) : <ActivityIndicator style={styles.indicator} color={"black"} size={"large"} />}
      </ScrollView>
      <View style={styles.sendMessage}>
        <TextInput
          value={mensaje}
          onChangeText={(text) => setMensaje(text)}
          style={styles.textInput}
          placeholder="Mensaje..."
          onSubmitEditing={enviarMensaje}
        />
        <TouchableOpacity style={styles.bottonEnviar} onPress={enviarMensaje}>
          <Icon size={20} name="send-o" color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  padre:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop:15
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
  delete_message:{
    position:"absolute",
    right:"auto",
    left:"auto",
    bottom:"auto",
    top:"40%",
    minWidth:150,
    padding:10,
    backgroundColor:"white",
    borderRadius:5,
    display:"flex",
    zIndex:100,
    flexDirection:"column",
  },
  headerModal:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    marginBottom:15,
  },
  buttonsModal:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    
  },
  buttonMF:{
    padding:10,
    borderTopColor:"#D6D6D6",
    borderTopWidth:1
  }
  
})

export default MessagesPage