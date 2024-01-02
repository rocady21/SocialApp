import { StyleSheet, View,Text } from "react-native"

const MessageCard = ({is_me,message})=> {

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
                <Text>10:30 AM</Text>
            </View>
        </View>
    )

}



export default MessageCard