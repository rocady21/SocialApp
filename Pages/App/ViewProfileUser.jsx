
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity, Modal, ActivityIndicator } from "react-native"
import { useMessageSlice } from "../../hooks/useMessagesSlice"
import { useEffect } from "react"
import { useState } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import ModalAddPost from "../../components/ModalAddPost"
import { usePosterSlice } from "../../hooks/usePostSlice"
import { useUserSlice } from "../../hooks/useUserSlice"
import CardPostPreview from "../../components/Profile/CardPostPreview"
import ToastManager from "toastify-react-native"




const Profile = ({ route }) => {

    // hooks
    const [isFollower, setIsFollower] = useState()
    const [stateModal, setStateModal] = useState(false)
    const { LoadPostsUser, postsUser, ClearPostUsers, statusPosts } = usePosterSlice()
    const { user, user_profile, loadInfoUserById, ClearUser_info } = useUserSlice()
    const [statusData,setsetStatusData] = useState(false)

    const load_data = async()=> {
        Promise.all(
            loadInfoUserById(route.params.id),
            LoadPostsUser(route.params.id)
        )

        setsetStatusData(true)
        
    }
    useEffect(() => {
        // aqui cargare los posts del usuario 
        load_data()

        return () => {
            ClearPostUsers()
            ClearUser_info()
        }
    }, [])

    const coso = false


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <ToastManager />

            {user_profile.nombre  ?
            <View style={styles.padre}>
                <ModalAddPost stateModal={stateModal} setStateModal={(state) => setStateModal(state)} />

                <View style={styles.info}>
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: "https://lapi.com.mx/web/image/product.template/5449/image_1024?unique=9f103a0"
                            }}

                        />
                    </View>
                    <View style={styles.infoUser}>
                        <Text style={styles.textInfo}>{user_profile.nombre + " " + user_profile.apellido}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button}>
                                <Text>Posts</Text>
                                <Text>{user_profile.number_posts}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <Text>Seguidores</Text>
                                <Text>{user_profile.seguidores_user}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <Text>Seguidos</Text>
                                <Text>{user_profile.seguidos_user}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                </View>

                <View style={styles.buttonsInteractions}>
                    <TouchableOpacity style={styles.buttonI}>
                        {/*Aqui es en donde validaremos si seguimos al usuario o no */}
                        <Text>Seguir</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonI}>
                        <Text>Enviar Mensaje</Text>

                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => setStateModal(true)} style={styles.post}>
                    <Icon name="add-sharp" size={40} />
                </TouchableOpacity>




                <View style={styles.insignias}>
                    <View style={styles.postsTitle}>
                        <Text style={styles.title} >Posts</Text>
                    </View>

                    <ScrollView contentContainerStyle={{ flexGrow: 1, display: "flex" }} >
                        <View style={styles.posts}>
                            {
                                statusPosts === "posts" ?
                                    <View style={styles.postsList}>
                                        {
                                            postsUser.map((post) => {
                                                return <CardPostPreview key={post.id} data={post} />
                                            })
                                        }
                                    </View>
                                    : statusPosts === "loading" ? <View style={styles.indicator}>
                                        <ActivityIndicator color={"black"} size={"large"} />
                                    </View> : <View style={styles.NoPosts}><Text style={styles.NoPostsText}>Aún no hay publicaciones.</Text></View>
                            }


                        </View>
                    </ScrollView>


                </View>
            </View> :   <View style={styles.padreIndic}><ActivityIndicator style={styles.indicatorF} color={"black"} size={"large"} /></View>
            }
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        filter: "blur(2)",
    },
    indicator: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",

    },
    info: {
        display: "flex",
        flexDirection: "row",
        marginTop: 50,
        alignSelf: "center",

    },


    image: {
        width: 100,
        height: 100,
        padding: 1,
        borderColor: "gray",
        borderRadius: 100,
        borderWidth: 2

    },
    textInfo: {
        fontSize: 20,
        alignSelf: "center"

    },
    insignias: {
        margin: "auto",

        color: "black",
        backgroundColor: "white",
        width: "100%",
        maxHeight: 300,
        height: 300



    },
    infoUser: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10
    },
    buttons: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 5,
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5

    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    postsTitle: {
        width: "100%",
        paddingVertical: 10,
        textAlign: "center",
        borderBottomColor: "gray",
        borderBottomWidth: 1
    },
    title: {
        fontSize: 15,
        textAlign: "center",
    },
    posts: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",


    },
    postsList: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttonsInteractions: {
        width: "80%",
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttonI: {
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: "#DADADA",
        borderRadius: 5,
        color: "black",
        fontWeight: "600"
    },
    post: {
        width: 50,
        margin: 0.6,
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E7E7E7",
        borderRadius: 50
    },
    NoPosts: {
        width: "100%"
    },
    NoPostsText: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 50
    },
    padreIndic:{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"center"
    }

})


export default Profile