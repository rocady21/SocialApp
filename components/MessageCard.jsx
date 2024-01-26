import { StyleSheet, View,Text,TouchableOpacity } from "react-native"
import { FormatHours } from "../utils/FormatDate";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { useRef, useState } from "react";
import { useMessageSlice } from "../hooks/useMessagesSlice";

const MessageCard = ({is_me,message,time,day,id})=> {
    const fechaInHours = FormatHours(time)
    const [show_infoM,setShow_infoM] = useState(false)
    const {Delete_message} = useMessageSlice()
    const delete_message = ()=> {
      Delete_message(id,day)
    }

    const ref = useRef()
    
    const styles = StyleSheet.create({
        chat: {
          alignSelf: is_me === true ? "flex-end" : "flex-start",
          display: "flex",
          flexDirection: "column",
          marginVertical:15
        },
        messageCard: {
          padding: 12,
          borderTopRightRadius: 15, 
          borderTopLeftRadius: is_me ? 15 : 0, 
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: is_me ? 0 : 15,
          backgroundColor:  is_me === true ? "#b5d1ec" : "#DFDFDF", 
          maxWidth: "60%",
          display:"flex",
          flexDirection:is_me == true? "row" : "row-reverse"
        },
        gradientBackground: {
          flex: 1,
          borderRadius: 15,
        },
        date: {
          alignSelf: is_me === true ? "flex-end" : "flex-start",
        },
        button:{
          alignSelf:"center",
          marginRight: is_me == true? 6 : 0,
          marginLeft: is_me == true? 0 : 6
        },
        delete_message:{
          top:-50,
          left:-50,
          position:"absolute",
          width:100,
          height:50,
          backgroundColor:"red",
          borderRadius:15,
          display:"flex",
          flexDirection:"column"
        },
        buttonP:{
          display:"flex",
          flexDirection:"row",
          alignItems:"flex-start"
        }
      });

    return (
        <View style={styles.chat}>
            {show_infoM === true && <View style={styles.delete_message}>
                <TouchableOpacity onPress={()=> delete_message() }>
                  <Text>Borrar Mensaje</Text>
                </TouchableOpacity>
            </View>}
            <View ref={ref} style={styles.messageCard}>
                <TouchableOpacity style={styles.buttonP} onPress={()=> setShow_infoM(!show_infoM)}><SimpleLineIcons style={styles.button} name="arrow-down" size={8}/></TouchableOpacity>
                
                <Text>{message}</Text>
            </View>
            <View style={styles.date}>
                <Text>{fechaInHours}</Text>
            </View>
        </View>
    )

}



export default MessageCard