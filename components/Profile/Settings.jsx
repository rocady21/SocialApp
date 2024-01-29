import { useEffect, useRef, useState } from "react"
import { View, StyleSheet, Animated, Text, TouchableOpacity } from "react-native"
import { Dimensions } from 'react-native';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import IonIcons from "react-native-vector-icons/Ionicons"
import ModalFriendRequest from "./ModalFriendRequest";
import { useUserSlice } from "../../hooks/useUserSlice";

const SettingsComponent = () => {
    const {user} = useUserSlice()
    const windowWidthS = (Dimensions.get('window').width);
    const [modal, setModal] = useState(false)
    const translateX = useRef(new Animated.Value(windowWidthS)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [translateX]);

    const styles = StyleSheet.create({
        p: {
            paddingVertical: 40,
            flex: 1,
            position: "absolute",
            backgroundColor: "white",
            width: "60%",
            alignSelf: "flex-end",
            height: "100%",
            zIndex: 100,
            transform: [{ translateX: translateX }],
            shadowColor: "#000000",
            shadowOffset: {
            width: 0,
            height: 4,
            },
            shadowOpacity:  0.19,
            shadowRadius: 5.62,
            elevation: 6
        },
        buttonFather: {
            width: "100%",
            paddingVertical: 20,
            paddingHorizontal: 25,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        options: {
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
        },
        puntoN:{
            width:7,
            height:7,
            borderRadius:3,
            backgroundColor:"red",
            marginLeft:15
        },
    })

    return (
        <Animated.View style={styles.p}>
            {
                modal === true && <ModalFriendRequest status={modal} onClose={()=> setModal(!modal)}/>
            }
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>Configuraciones</Text>
            <View style={styles.options}>
                <TouchableOpacity style={styles.buttonFather}>
                    <SimpleLineIcons size={18} name="settings" />
                    <Text style={{ marginLeft: 8 }}>Privacidad y seguridad</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setModal(true)} style={styles.buttonFather}>
                    <SimpleLineIcons size={18} name="people" />
                    <Text style={{ marginLeft: 8 }}>Solicitudes de Amistad</Text>
                    {
                        user.exist_friend_request === true && <View style={styles.puntoN}></View>

                    }

                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFather}>
                    <IonIcons size={18} name="notifications-outline" />
                    <Text style={{ marginLeft: 8 }}>Notificaciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFather}>
                    <IonIcons size={18} name="medal-outline" />
                    <Text style={{ marginLeft: 8 }}>Insignias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFather}>
                    <IonIcons size={18} name="bookmark-outline" />
                    <Text style={{ marginLeft: 8 }}>Guardado</Text>
                </TouchableOpacity>

            </View>

        </Animated.View>

    )
}



export default SettingsComponent