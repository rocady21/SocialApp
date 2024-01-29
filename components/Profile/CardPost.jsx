import React, { useEffect, useState } from "react"
import { View,Text,StyleSheet,Image,TouchableOpacity,Modal,TouchableWithoutFeedback } from "react-native"
import More from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Fontisto from "react-native-vector-icons/Fontisto"

import Feather from "react-native-vector-icons/Feather"
import { usePosterSlice } from "../../hooks/usePostSlice"
import Like_Component from "./Likes_Component"
import { useUserSlice } from "../../hooks/useUserSlice"
import { formatDate } from "../../utils/FormatDate"
const CardPost = ({route})=> {
    // hooks
    const [modalVisible, setModalVisible] = useState(false);
    const [modalComment, setModalComment] = useState(false);
    const {user} = useUserSlice()
    const {selectedPost,postsUser,addLike,quitLike,QuitSelectedPosts} = usePosterSlice()
    // hooks para simular carrousel

    const {comments,id,infoPost,info_comments,info_likes,likes,photos,user_posted_info} = selectedPost

    const [indexPhoto,setindexPhoto] = useState(0)

    const isLikedPost = info_likes.find((like)=> like.id == user.id ) ? true : false
    
    const formated_date = formatDate(infoPost.fecha,false)
    
    const AddOrQuitLike = ()=> {
        if(isLikedPost == true) {
            quitLike({id_post:infoPost.id,id_user:user.id})
        } else {
            addLike({id_post:infoPost.id,id_user:user.id})
        }
    }
                    user.exist_friend_request === true && <View style={styles.puntoN}></View>

    const Next = ()=> {
        if( indexPhoto == photos.length - 1) {
            setindexPhoto(0)
        } else {
            setindexPhoto(indexPhoto + 1)
        }
    }
    
    const Back = ()=> {
        if( indexPhoto === 0) {
            setindexPhoto(photos.length - 1 )
        } else {
            setindexPhoto(indexPhoto -1)
        }
    }
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
                            uri: photos[indexPhoto].photo_url
                        }}
                        />
                    {
                        photos.length !== 1 && <View style={styles.CarrouselPadre}>
                            <TouchableOpacity onPress={Back} style={styles.arrowLeft}>
                        <MaterialIcons name="keyboard-arrow-left" size={30} color={"white"}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Next} style={styles.arrowRight}>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color={"white"}/>
                    </TouchableOpacity>
                        </View>

                    }
                </View>
                <View style={styles.interactions}>
                    <View style={styles.buttonsI}>
                        {
                            isLikedPost === true? <MaterialIcons onPress={AddOrQuitLike} name="favorite" size={28} color={"#FD5252"}/> : <MaterialIcons onPress={AddOrQuitLike} name="favorite-border" size={28} color={"black"}/>
                        }
                        
                        <Fontisto name="comment" onPress={()=> setModalComment(true)} style={{marginLeft:10}} size={20} color={"black"}/>
                    </View>
                    <Feather name="send" size={30} color={"black"}/>
                </View>
                <View style={styles.infoPost}>
                    <View style={styles.likes}>
                        <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)} style={styles.likesButton}>
                            <Text>
                                {isLikedPost === true && likes == 1? "a ti te gusto esto." : isLikedPost == true && likes > 1? "a ti y " + (likes - 1)  + " les gusto esto.": "a " + likes + " les gusto esto."  }
                            </Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.description}>
                        <Text>{infoPost.descripcion}</Text>
                    </View>
                </View>
                <View style={styles.time}>
                    <Text style={styles.textTime}>{formated_date}</Text>
                </View>
                
                
            </View>
            <Modal style={{width:"100%", height:"100%"}}

                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}
            >
                <View  style={styles.padreModal}>

                    <View style={styles.ModalInfo}>
                        <View style={styles.headerModal}>
                            <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                                <EvilIcons name="close" size={25}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoModal}>
                        {
                            info_likes[0]? info_likes.map((info,index)=> {
                                return <Like_Component key={index} info={info}/>
                            }) : <Text style={{textAlign:"center"}}>No hay likes aún.</Text>
                        }
                        </View>

                    </View>

                </View>
            </Modal>

            {
            //modal de comentarios 
            }

            <Modal style={{width:"100%", height:"100%"}}
                animationType="slide"
                transparent={true}
                visible={modalComment}
                onRequestClose={() => {
                setModalComment(false)
                }}
                
            >
                <View style={{display:"flex",flexDirection:"row",alignContent:"flex-end",height:"100%"}}>
                    <View  style={styles.comments}>
                        <Text style={styles.titleComment}>Comentarios</Text>
                        {
                        info_comments !== null? info_comments.map((comment)=>{
                            return <Text key={comment.id}>Hay comentarios</Text>
                        }) : <Text style={styles.commentTitle}>No hay comentarios aun</Text>
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )

}


const styles = StyleSheet.create({
    padreTodo:{
        width:"100%",
        flex:1,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
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
        color:"#C2C2C2",
        marginHorizontal:5
    },
    padreModal: {

        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    ModalInfo:{
        width:300,
        backgroundColor:"white",
        borderRadius:10,
    },
    infoModal:{
        display:"flex",
        flexDirection:"column",
        padding:10
    },
    headerModal:{
        paddingVertical:8,
        paddingHorizontal:5,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        borderBottomColor:"#D5D5D5",
        borderBottomWidth:1
    },
    comments:{
        width:"100%",
        height:500,
        backgroundColor:"white",
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        alignSelf:"flex-end",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    titleComment:{
        fontSize:20,
        fontWeight:"500",
        borderBottomColor:"#DDDDDD",
        borderBottomWidth:2,
        padding:10
    },
    commentTitle:{
        textAlign:"center",
        marginTop:25,
        fontSize:20
    }
    
})

export default CardPost