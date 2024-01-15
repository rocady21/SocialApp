import React, { useState,useEffect,useRef } from "react";
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, PermissionsAndroid } from "react-native";
import CloseIcon from "react-native-vector-icons/EvilIcons"
import { ImageContainer } from "./ImagesContainer";

const ModalAddPost = ({ stateModal, setStateModal }) => {

    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            style={styles.modal}
            visible={stateModal}
            onRequestClose={() => {
                setStateModal(false);
            }}>
            <View style={styles.padre}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <CloseIcon name="close" onPress={() => setStateModal(!stateModal)} size={25} />
                        <TouchableOpacity style={styles.button}  >
                            <Text style={{ color: "white", fontSize: 16 }}>Publicar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.description}>
                        <TextInput
                            placeholder="¿Sobre que quieres hablar?"

                            numberOfLines={5}
                            style={styles.input}
                            multiline={true}
                            textAlignVertical="top"
                        />
                    </View>
                    <ImageContainer/>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        width: "100%",
        justifyContent: "center"

    },
    title: {
        textAlign: "center",
        marginVertical: 8,
        fontSize: 20
    },
    content: {
        height: "90%",
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        paddingHorizontal: 0,
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.78,
        elevation: 15
    },
    header: {
        height: 75,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,


    },
    description: {
        width: "100%",
        maxWidth: "100%",
        height: "50%",
        maxHeight: "50%",
        paddingHorizontal: 25,
        overflow: "hidden",
        paddingVertical: 15,
        backgroundColor: "#FBFBFB"
    },
    PadreImage: {
        width: "15%"
    },
    image: {
        width: "100%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "black",

    },
    input: {
        width: "100%",
        height: "100%"
    },
    button: {
        backgroundColor: "#00146C",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },


})

export default ModalAddPost