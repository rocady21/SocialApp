import React, { useEffect } from "react"
import { View,Text,StyleSheet,Image,TouchableOpacity } from "react-native"
import More from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import { usePosterSlice } from "../hooks/usePostSlice"
const CardPost = ({route})=> {

    const {comments,id,infoPost,info_comments,info_likes,likes,photos,user_posted_info} = route.params
    const {} = usePosterSlice()

    useEffect(()=> {
        return ()=> {
            
        }
    },[])
    
    console.log(photos);
    
    
    return (
        <View style={styles.padreTodo}>
            <View style={styles.padre} >
                <View style={styles.header}>
                    <View style={styles.info}>
                        <Image
                            source= {user_posted_info.foto !== "vacio"? user_posted_info.photo : {
                                uri:"https://image.emojipng.com/346/10131346.jpg"
                            }}
                            style={styles.image}
                        />
                        <Text style={styles.textInfo}>{user_posted_info.nombre + " " + user_posted_info.apellido}</Text>
                    </View>
                    <TouchableOpacity>
                        <More size={25} name="more-vertical"/>
                    </TouchableOpacity>

                </View>
                <View style={styles.body}>
                    <Image 
                        style={styles.imageBody}
                        source={{
                            uri: photos[0].photo_url
                        }}
                    />
                    {
                        photos.length !== 1 && <View style={styles.CarrouselPadre}>
                            <TouchableOpacity style={styles.arrowLeft}>
                        <MaterialIcons name="keyboard-arrow-left" size={30} color={"white"}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowRight}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color={"white"}/>
                    </TouchableOpacity>
                        </View>

                    }
                </View>
                <View style={styles.interactions}>
                    <View style={styles.buttonsI}>
                        <MaterialIcons name="favorite-border" size={28} color={"black"}/>
                        <EvilIcons name="comment" style={{marginLeft:10}} size={30} color={"black"}/>
                    </View>
                    <Feather name="send" size={30} color={"black"}/>
                </View>
                <View style={styles.infoPost}>
                    <View style={styles.likes}>
                        <TouchableOpacity style={styles.likesButton}>
                            <Text>
                                a {likes} {likes == 1 ? "persona les gustó esto." : "personas les gustó esto."}
                            </Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.description}>
                        <Text>{infoPost.descripcion}</Text>
                    </View>
                </View>
                <View style={styles.time}>
                    <Text style={styles.textTime}>Hace 5 dias</Text>
                </View>
                
                
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    padreTodo:{
        flex:1
    },
    padre:{
        display:"flex",
        width:"100%",
        marginTop:50,
        
    },
    header:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:15
    },
    body:{
        marginVertical:5,
        width:"100%",
        height:350,
        position:"relative",

    },
    imageBody:{
        width:"100%",
        height:"100%"
    },
    interactions:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:10
    },
    image: {
        width:40,
        height:40,
        borderRadius:50
    },
    textInfo:{
        fontSize:16,
        marginLeft:10
    },
    info:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    arrowLeft:{
        position:"absolute",
        top:157.5,
        left:0,
        alignSelf:"center"
        
    },
    arrowRight:{
        position:"absolute",
        top:157.5,
        right:0
    },
    buttonsI:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    infoPost:{
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        marginHorizontal:10
    },
    description:{
        
    },
    likesButton:{
        marginVertical:8,
        display:"flex",
        flexDirection:"row"
    },
    CarrouselPadre:{
        width:"100%",
        height:"100%",
        position:"absolute",
        
    },
    time:{
        marginTop:15,
    },
    textTime:{
        fontSize:16,
        color:"#C2C2C2"
    }
    
})

export default CardPost