import { StyleSheet, View,Text } from "react-native"
import { FormatHours } from "../utils/FormatDate";

const MessageCard = ({is_me,message,time})=> {
    const fechaInHours = FormatHours(time)
    const styles = StyleSheet.create({
        chat: {
          alignSelf: is_me === true ? "flex-end" : "flex-start",
          display: "flex",
          flexDirection: "column",
          marginVertical:15
        },
        messageCard: {
          padding: 15,
          borderTopRightRadius: 15, 
          borderTopLeftRadius: is_me ? 15 : 0, 
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: is_me ? 0 : 15,
          backgroundColor:  is_me === true ? "#b5d1ec" : "#DFDFDF", 
          maxWidth: "60%"
        },
        gradientBackground: {
          flex: 1,
          borderRadius: 15,
        },
        date: {
          alignSelf: is_me === true ? "flex-end" : "flex-start",
        },
      });

    return (
        <View style={styles.chat}>
            <View style={styles.messageCard}>
                <Text>{message}</Text>
            </View>
            <View style={styles.date}>
                <Text>{fechaInHours}</Text>
            </View>
        </View>
    )

}



export default MessageCard