import { View,StyleSheet,Text,TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Iconf from "react-native-vector-icons/SimpleLineIcons"
import IconM from "react-native-vector-icons/Feather"
import IconP from "react-native-vector-icons/AntDesign"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useUserSlice } from "../hooks/useUserSlice"
import { useMessageSlice } from "../hooks/useMessagesSlice"


const Footer = ()=> {
    const navigate = useNavigation()

    const navigatePage = (pageName)=> {
        setSelected(pageName)
        navigate.navigate(pageName)
    }
    const {user} = useUserSlice()
    const [selected,setSelected] = useState()
    const {contactsChat,messages_no_read,No_read_message} = useMessageSlice()


    useEffect(()=> {
        messages_no_read(user.id)
    },[contactsChat])
    
    return (
        <View style = {styles.footer}>
            <TouchableOpacity onPress={()=> navigatePage("Home")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Home"? 1 : 0.2
            }])}>
                <Icon name="home-outline" size={35}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigatePage("Search")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Search"? 1 : 0.2
            }])}>
                <Icon name="search-outline" size={35}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigatePage("Chats")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Chats"? 1 : 0.2
            }])}>
                <IconM name="message-circle" size={35}/>

                {
                    No_read_message !== 0 &&
                    <View style={styles.messages}>
                        <Text style={{fontSize:15,color:"white"}}>{No_read_message}</Text>
                    </View>
                }

            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigatePage("Questions")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Questions"? 1 : 0.2
            }])}>
                <Iconf name="badge" size={35}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigatePage("Profile")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Profile"? 1 : 0.2
            }])}>
                {
                    user.exist_friend_request === true && <View style={styles.puntoN}></View>
                }
                <IconP name="user" size={35}/>
            </TouchableOpacity>
        </View>
        )
}

const styles = StyleSheet.create({
    footer: {
        height:50,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",


    },
    buttonStyles: {
        flex:1,
        height:"100%",
        width:"5%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    puntoN:{
        width:10,
        height:10,
        borderRadius:3,
        backgroundColor:"red",
        position:"absolute",
        left:"40%",
        top:5,
        zIndex:300
    },
    messages:{
        top:5,
        right:15,
        opacity:1,
        position:"absolute",
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:"red",
        borderRadius:100
    }

})

export default Footer