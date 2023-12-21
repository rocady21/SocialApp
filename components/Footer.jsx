import { View,StyleSheet,Text,TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Iconf from "react-native-vector-icons/SimpleLineIcons"
import IconM from "react-native-vector-icons/Feather"
import IconP from "react-native-vector-icons/AntDesign"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"


const Footer = ()=> {

    const navigate = useNavigation()

    const navigatePage = (pageName)=> {
        setSelected(pageName)
        navigate.navigate(pageName)
    }
    
    const [selected,setSelected] = useState()
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

            <TouchableOpacity onPress={()=> navigatePage("Messages")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Messages"? 1 : 0.2
            }])}>
                <IconM name="message-circle" size={35}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigatePage("Questions")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Questions"? 1 : 0.2
            }])}>
                <Iconf name="badge" size={35}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigatePage("Profile")} style={StyleSheet.flatten([styles.buttonStyles,{
                opacity: selected == "Profile"? 1 : 0.2
            }])}>
                <IconP name="user" size={35}/>
            </TouchableOpacity>
        </View>
        )
}

const styles = StyleSheet.create({
    footer: {
        flex:0.1,
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

})

export default Footer