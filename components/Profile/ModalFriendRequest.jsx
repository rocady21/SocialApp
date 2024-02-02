import { useEffect, useState } from "react"
import { View,StyleSheet,Modal,Text, ScrollView,ActivityIndicator,Image } from "react-native"
import CardFriendRequest from "./CardFirendRequest"
import { useUserSlice } from "../../hooks/useUserSlice"


const ModalFriendRequest = ({onClose,status})=> {


    const {friend_requests,StatusLoadingFriend_requests,LoadFriendRequest} = useUserSlice()

    useEffect(()=> {
        LoadFriendRequest()
    },[])
    

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={status}
            onRequestClose={() => {
                onClose()
            }}
            onDismiss={()=> onClose()}
            >
            <View style={styles.padre}>
                <Text style={{fontSize:20,fontWeight:"600",paddingHorizontal:10,textAlign:"center"}}>Solicitudes de Seguimiento</Text>
                <View style={styles.line}></View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.body}>
                    {
                        StatusLoadingFriend_requests === "loading" ? <ActivityIndicator style={styles.activity} size={"large"} color={"black"}/> :
                        StatusLoadingFriend_requests === "no-exist" ? <View style={styles.padreText}>
                                <Image style={styles.image} source={require("../../icons/friend_request.png")}/>
                                <Text>No hay solicitudes de amistad</Text>
                            </View> :
                        friend_requests.map((request,index)=> {
                            return <CardFriendRequest key={index} data={request}/>
                        })
                    }
                    
                    
                </ScrollView>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    padre:{
        marginTop:"auto",
        marginBottom:"auto",
        alignSelf:"center",
        width:"90%",
        height:"80%",
        minHeight:"80%",
        paddingVertical:20,
        backgroundColor:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    activity:{
        alignSelf:"center",
        marginTop:"auto",
        marginBottom:"auto"
    },
    line:{
        width:"100%",
        borderBottomWidth:1,
        borderBottomColor:"#E1E1E1",
        paddingVertical:10,
    },
    body:{
        paddingHorizontal:15,
        display:"flex",
        flexDirection:"column",

    },
    padreText:{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    image:{
        width:300,
        height:300
    }
})

export default ModalFriendRequest