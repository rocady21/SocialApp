import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,Modal } from "react-native"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useMessageSlice } from "../../hooks/useMessagesSlice"
import Icon from "react-native-vector-icons/EvilIcons"
import More from "react-native-vector-icons/Feather"
import { useFocusEffect } from "@react-navigation/native"
import React from "react"
import { SvgXml } from "react-native-svg"
import icon_error from "../../icons/icon_error"
import ChatCard from "../../components/Chat/ChatCard"
import { useUserSlice } from "../../hooks/useUserSlice"
import ModalDeletePost from "../../components/Chat/ModalDeletePost"
import { io } from "socket.io-client"



const Chats = ({ route }) => {


    const ref = useRef()
    const { user } = useUserSlice()
    const { LoadContactsMessage, SeleccionarChat, SearchMessage, searchContact,NoMoreContacts ,ClearContacts,ResetNoMoreContacts,Order_contacts} = useMessageSlice()
    const { contactsChat, stateChats } = useMessageSlice()
    const [SearchMessageContact, setSearchMessageContact] = useState("")
    const [modalDelete,setModalDelete] = useState(false)
    const [selected_chat,setSelectedChat] = useState(selected_chat)
    const number_of_contacts = 5
    const [index,setIndex] = useState(0)
    const [scrollBottom,setScrollBottom] = useState(false)
    

    const handleScroll = (e)=> {
        const positionY = Math.round(e.nativeEvent.contentOffset.y)
        const HeightScroll = Math.round(e.nativeEvent.contentSize.height)
        const positionInHeight = Math.round(e.nativeEvent.layoutMeasurement.height)

        const difference = HeightScroll - positionInHeight;

        // Verificar si el scroll está en la parte inferior
        if (positionY >= difference) {
            // El scroll está en la parte inferior
            setScrollBottom(true)
            setIndex(index + number_of_contacts)

            // Realiza las acciones que necesites cuando el scroll está en la parte inferior
        } else {
            setScrollBottom(false)
        }

    }

    useEffect(()=>{
        if(scrollBottom === true && NoMoreContacts === "more") {
            LoadContactsMessage(user.id,index,number_of_contacts)
        }
    },[scrollBottom])

    
    useLayoutEffect(()=>{ 
                console.log("jjee");
                if(contactsChat.length === 0) {
                    LoadContactsMessage(user.id,index,number_of_contacts)
                }
                return ()=> {
                    ResetNoMoreContacts()
                }
        

    },[])
    
    useEffect(() => {
        if (SearchMessageContact !== "") {
            SearchMessage(SearchMessageContact)
        }
    }, [SearchMessageContact])

    const openModal = ()=> {
        setModalDelete(true)
    }


    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.padre}>
            {
                modalDelete === true && <ModalDeletePost id_chat={selected_chat.id} modalDelete={modalDelete} setModalDelete={(value)=>setModalDelete(value)}/>
            }
            <View style={styles.header}>
                <View style={styles.top}>
                    <Text style={styles.textTop}>Mensajes</Text>
                    <TouchableOpacity onPress={()=>setModalDelete(true)}>
                        <More size={35} name="more-vertical" />
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.bottom}>
                    <View style={styles.InputFalse}>
                        <Icon style={{ width: "10%" }} name="search" size={30} />
                        <TextInput
                            onChangeText={(text) => setSearchMessageContact(text)}
                            value={SearchMessageContact}
                            placeholder="Buscar un Mensaje"
                            style={styles.inputSearch}
                        />
                    </View>
                </View>
            </View>
            <ScrollView ref={ref} onScroll={(e)=> handleScroll(e)} style={styles.body}>
                {

                    SearchMessageContact == "" ?
                        (contactsChat[0] ? contactsChat.map((contact, index) => {
                            return <ChatCard setSelectedChat={(value)=> setSelectedChat(value)} OpenModal={openModal} data={contact} key={index} />
                        }) : !contactsChat[0] ?
                            <View style={styles.error}>
                                <SvgXml
                                    height={250}
                                    width={250}
                                    xml={icon_error}
                                />
                                <Text style={styles.textE}>No tienes ningun chat aun.</Text>

                            </View>

                            : <ActivityIndicator style={styles.indicator} color={"black"} size={"large"} />) : (searchContact[0] ? searchContact.map((value, index) => {
                                return <ChatCard setSelectedChat={(value)=> setSelectedChat(value)} OpenModal={openModal} data={value} key={index} />
                            }) : <View style={styles.error}>
                                <SvgXml
                                    height={250}
                                    width={250}
                                    xml={icon_error}
                                />
                                <Text style={styles.textE}>No hay ningun usuario con ese nombre.</Text>

                            </View>)
                }

            </ScrollView>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        width: "100%"
    },
    header: {
        height: 200,
        width: "100%",
        backgroundColor: "white",
        borderBottomRightRadius: 35,
        borderBottomLeftRadius: 35,
        padding: 30,

    },
    body: {
        flex: 0.8,
        width: "100%",
        maxHeight: "80%",
        height: "80%",
        display: "flex",
    },
    indicator: {
        alignSelf: "center",
        marginTop: "45%"
    },
    top: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },
    textTop: {
        fontSize: 25,


    },
    InputFalse: {
        marginTop: 25,
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: "gray",
        borderRadius: 200,
        opacity: 0.2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputSearch: {
        width: "85%",

    },
    error: {
        alignItems: "center",
        marginTop: 50,
        width: "100%",
        height: "100%",
    },
    textE: {
        fontSize: 20,
        marginTop: 5
    },



})


export default Chats