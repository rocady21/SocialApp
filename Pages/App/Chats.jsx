import { View,StyleSheet,Text,TextInput,TouchableOpacity,KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useUserSlice } from "../../hooks/useUserSlice"
import { useEffect, useState } from "react"
import { useMessageSlice } from "../../hooks/useMessagesSlice"
import Icon from "react-native-vector-icons/EvilIcons"
import More from "react-native-vector-icons/Feather"
import ChatCard from "../../components/ChatCard"

 const Chats = ({route})=> {

    const {name} = route
    const {user} = useUserSlice()
    const {LoadContactsMessage,SeleccionarChat} = useMessageSlice()
    const {contactsChat} = useMessageSlice()
    const [SearchMessageContact,setSearchMessageContact] = useState("")


    

    useEffect(()=> {
        SeleccionarChat(false)
        LoadContactsMessage(user.id)
    },[])

    
    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.padre}>

        <View style={styles.header}>
            <View style={styles.top}>
                <Text style={styles.textTop}>Mensajes</Text>
                <TouchableOpacity>
                    <More size={35} name="more-vertical"/>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <View style={styles.InputFalse}>
                    <Icon style={{width:"10%"}} name="search" size={30} />
                    <TextInput
                        onChange={(text)=> setSearchMessageContact(text)}
                        value={SearchMessageContact}
                        placeholder="Buscar un Mensaje"
                        style={styles.inputSearch}
                        />
                </View>
            </View>
        </View>
        <ScrollView style={styles.body}>
            {
            contactsChat[0]? contactsChat.map((contact,index)=> {
                return <ChatCard data={contact} key={index}/>
            }) : <Text>Cargando...</Text>
            }

        </ScrollView>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1
    },
    header:{
        height:200,
        width:"100%",
        backgroundColor:"white",
        borderBottomRightRadius:35,
        borderBottomLeftRadius:35,
        padding:30,
       
    },
    body:{
        flex:0.8,
        width:"100%",
        maxHeight:"80%"
    },
    top:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:5
    },
    textTop: {
        fontSize:25,
        
        
    },
    InputFalse:{
        marginTop:25,
        paddingVertical:15,
        paddingHorizontal:25,
        backgroundColor:"gray",
        borderRadius:200,
        opacity:0.2,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    inputSearch:{
        width:"85%",
        
    }

})


export default Chats