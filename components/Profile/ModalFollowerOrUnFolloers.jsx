import { useEffect } from "react"
import { StyleSheet, View,Modal,Text,ScrollView, ActivityIndicator, Image } from "react-native"
import { useUserSlice } from "../../hooks/useUserSlice"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

const ModalFollowerOrUnFolloers = ({state,closeModal})=> {

    const navigation = useNavigation()
    const {LoadFollowers,LoadFollowings,load_info_followers,followers_or_followings,clearState} = useUserSlice()
    const close = ()=> {
        closeModal()
    }

    console.log(followers_or_followings);
    
    const view_profile = (id)=> {
        navigation.navigate("View_profile_user",{id})
    }
    
    useEffect(()=>{
        if(state.type === "Seguidores") {
            LoadFollowers()
        } else {
            LoadFollowings()
        }

        return ()=> {
            clearState()
        }
    },[])
    
    return <Modal
    animationType="slide"
    transparent={true}
    style={styles.modal}
    visible={state.state}
    onRequestClose={() => {
        close()
    }}>
        <View style={styles.p}>
            <Text style={styles.title}>{state.type}</Text>
            <ScrollView style={styles.content}>
                {
                    load_info_followers === true? <View style={styles.padre}>
                        {
                        followers_or_followings[0]? followers_or_followings.map((flwr)=> {
                            return <TouchableOpacity onPress={()=> view_profile(flwr.id)} style={styles.padreCard}>
                                <Image style={styles.image} source={{
                                    uri:flwr.foto === "vacio" ? "https://image.emojipng.com/346/10131346.jpg" : flwr.foto 
                                }}/>

                                <Text style={{marginTop:5}}>{flwr.nombre + " " + flwr.apellido}</Text>

                            </TouchableOpacity>
                        }) : <Text>No tienes {state.type}</Text>
                        }
                    </View> : <ActivityIndicator style={styles.indicator} color={"black"} size={"large"} />
                }
            </ScrollView>
        </View> 

    </Modal>

}

const styles = StyleSheet.create({
    p:{
        minHeight:300,
        maxHeight:600,
        marginTop:"auto",
        marginBottom:"auto",
        width:"80%",
        alignSelf:"center",
        borderRadius:15,
        backgroundColor:"white"
    },
    modal:{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center"
    },
    title:{
        textAlign:"center",
        padding:15,
        borderBottomColor:"gray",
        borderBottomWidth:1,
        
    },
    content:{
        padding:15
    },
    padre:{
        display:"flex",
        flexDirection:"column"

    },
    image:{
        width:50,
        height:50,
        borderRadius:50,
        marginRight:15,
    },
    padreCard:{
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingVertical:15,
        paddingHorizontal:5,
        alignItems:"flex-start"
    }
})

export default ModalFollowerOrUnFolloers