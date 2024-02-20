import { StyleSheet, View,Text,TouchableOpacity } from "react-native"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { useRef, useState } from "react";
import { useMessageSlice } from "../../hooks/useMessagesSlice";
import { FormatHours } from "../../utils/FormatDate";

const MessageCard = ({is_me,message,time,day,id,abrirModal})=> {
    const fechaInHours = FormatHours(time)


    const openModal = ()=> {
      abrirModal(id,day)
    }
    const ref = useRef()
    
    const styles = StyleSheet.create({
        chat: {
          position:"relative",
          alignSelf: is_me === true ? "flex-end" : "flex-start",
          display: "flex",
          flexDirection: "column",
          marginVertical:10
        },
        messageCard: {
          paddingVertical:10,
          paddingHorizontal:15,
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

        buttonP:{
          display:"flex",
          flexDirection:"row",
          alignItems:"flex-start"
        }
      });

    return (
        <View style={styles.chat}>
            <View ref={ref} style={styles.messageCard}>
                <TouchableOpacity style={styles.buttonP} onPress={openModal}><SimpleLineIcons style={styles.button} name="arrow-down" size={8}/></TouchableOpacity>
                
                <Text>{message}</Text>
            </View>
            <View style={styles.date}>
                <Text>{fechaInHours}</Text>
            </View>
        </View>
    )

}



export default MessageCard