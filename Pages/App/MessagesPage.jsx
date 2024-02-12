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

const MessagesPage = ({ navigation, route }) => {
  console.log("selected_chat",selectedChat);
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
  } = useMessageSlice();
  const [mensaje, setMensaje] = useState(``);
  const { id, nombre_user, photo, id_user_chat, user_from, user_to } = route.params
  const [mounted,setMounted] = useState(false)
  
  const numbersofMessages = 10;
  const [index, setIndex] = useState(10);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);


  const handleScroll = (event) => {
    event.persist();
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolledToTop(offsetY === 0);
  };

  useEffect(() => {
    if (isScrolledToTop && index !== 0 && NoMoreMessages === "more" && mounted === true) {
      console.log("llamar");
      loadMessageFromUser(id, index, numbersofMessages);
      setIndex(index + numbersofMessages);
    }
  }, [isScrolledToTop]);

  useEffect(() => {
    setMounted(true)
    const socket = io("https://a769-2800-a4-127d-200-48cf-2a8-448f-36ae.ngrok-free.app", {
      transports: ["websocket"],
      
    });
    socket.emit('message_to_server',{"ok":true});
    
    socket.on("mensaje_servidor",(data)=> {
      console.log("esta es la data",data);
    })

    socket.on("chat_" + user_from + "_and_" + user_to, (data) => {
      console.log("a bueno");
      setIndex(index + 1)
      onAddMessageRealTImeSocekt(data.mensaje);
    });
      


    return () => {
      console.log("se desconecta");
      socket.disconnect();
      SeleccionarChat(false)
      ClearMessages();
      ResetMoreMessages();
      
    };
  }, []);


  
  



  const enviarMensaje = () => {
    if (mensaje !== "") {
      setIndex(index + 1)
      SendMessage(mensaje, user.id, id_user_chat);
      setMensaje("");
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.padre}>
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
  
})

export default MessagesPage