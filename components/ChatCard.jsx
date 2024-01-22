import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useUserSlice } from "../hooks/useUserSlice"
import { useNavigation } from "@react-navigation/native"
import { useMessageSlice } from "../hooks/useMessagesSlice"
import { formatDate } from "../utils/FormatDate"

const ChatCard = ({ data }) => {
    const {user} = useUserSlice()

    const navigate = useNavigation()
    const {SeleccionarChat} = useMessageSlice()
    const ShowChat = ()=> {
        SeleccionarChat(true)  
        navigate.navigate("Messages",data)
    }
    const time_format = formatDate(data.time_last_message,true)
    
    return (
        <View style={styles.padre}>
            <View style={styles.foto}>
                <Image
                    style={styles.image}
                    source={{
                        uri: data.photo
                    }}
                />
            </View>
            <TouchableOpacity onPress={ShowChat} style={styles.info}>
                <Text style={styles.title}>{data.nombre_user}</Text>
                <Text numberOfLines={1} style={styles.text}> 
                {
                    data.id_user_last_message === user.id && "Yo:" + " "  
                }
                {data.last_message}</Text>
            </TouchableOpacity>
            <View style={styles.time}>
                <Text>{time_format}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    padre: {
        marginVertical: 0,
        width: "100%",
        padding: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

    },
    foto: {
        height: "100%",
        width: "15%"
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "60%",
        marginLeft: 25

    },
    title:{
        fontSize:18,
        marginBottom:5,
        fontWeight:"600"
    },
    time: {
        width: "10%"

    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 50,
    },
    text: {
        width: "100%"
    }
})

export default ChatCard