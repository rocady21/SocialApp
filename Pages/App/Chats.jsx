import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native"
import { useUserSlice } from "../../hooks/useUserSlice"
import { useCallback, useEffect, useState } from "react"
import { useMessageSlice } from "../../hooks/useMessagesSlice"
import Icon from "react-native-vector-icons/EvilIcons"
import More from "react-native-vector-icons/Feather"
import ChatCard from "../../components/ChatCard"
import { useFocusEffect } from "@react-navigation/native"
import React from "react"
import { SvgXml } from "react-native-svg"
import icon_error from "../../icons/icon_error"



const Chats = ({ route }) => {

    const { name } = route
    const { user } = useUserSlice()
    const { LoadContactsMessage, SeleccionarChat, SearchMessage, searchContact } = useMessageSlice()
    const { contactsChat, stateChats } = useMessageSlice()
    const [SearchMessageContact, setSearchMessageContact] = useState("")



    // este useEffect es de react-navigation y sirve para detectar cuando estas o sales de una pantalla
    useFocusEffect(
        useCallback(() => {
            // Lógica específica cuando la pantalla Home se enfoca
            console.log('La pantalla de chats se enfocó');
            SeleccionarChat(false)
            LoadContactsMessage(user.id)
            return () => {
                console.log('La pantalla de chats se desenfocó');
            };
        }, [])
    );

    useEffect(() => {
        if (SearchMessageContact !== "") {
            SearchMessage(SearchMessageContact)
        }
    }, [SearchMessageContact])



    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.padre}>

            <View style={styles.header}>
                <View style={styles.top}>
                    <Text style={styles.textTop}>Mensajes</Text>
                    <TouchableOpacity>
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
            <ScrollView style={styles.body}>
                {

                    SearchMessageContact == "" ?
                        (stateChats === "chats" ? contactsChat.map((contact, index) => {
                            return <ChatCard data={contact} key={index} />
                        }) : stateChats === "no-chats" ?
                            <View style={styles.error}>
                                <SvgXml
                                    height={250}
                                    width={250}
                                    xml={icon_error}
                                />
                                <Text style={styles.textE}>No tienes ningun chat aun.</Text>

                            </View>

                            : <ActivityIndicator style={styles.indicator} color={"black"} size={"large"} />) : (searchContact[0] ? searchContact.map((value, index) => {
                                return <ChatCard data={value} key={index} />
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
    }


})


export default Chats