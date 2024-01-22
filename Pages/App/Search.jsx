import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity,ActivityIndicator } from "react-native"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import IonIcons from "react-native-vector-icons/Ionicons"
import icon_error from "../../icons/icon_error"
import { SvgXml } from "react-native-svg"
import { useUserSlice } from "../../hooks/useUserSlice"
import { useNavigation } from "@react-navigation/native"

const Search = () => {

    const [search, setSearch] = useState("")
    const {user,SearchUser,statusSearch,searchUsers,DefaultSearch} = useUserSlice()
    const navigation = useNavigation()
    useEffect(()=> {
        return ()=> {
            DefaultSearch()
        }
    },[])
    

    useEffect(()=> {
        if(search === "") {

            DefaultSearch()
        } else if(search !== "") {
            SearchUser(search)
        }
        
    },[search])

    const ViewProfile = (id)=> {
        navigation.navigate("View_profile_user",{id})
    }
    
    return (
        <View style={styles.padre}>
            <View style={styles.search}>
                <View style={styles.PSearch}>
                    <EvilIcons name="search" size={25} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                    {
                        search !== "" && <Feather style={{ marginRight: 12 }} onPress={() => setSearch("")} size={25} name="x" color={"gray"} />
                    }
                    <IonIcons name="filter-outline" size={25} />


                </View>
            </View>
            <ScrollView style={styles.results}>
                {
                    statusSearch === "loading" ? <View style={styles.loading}>
                        <ActivityIndicator color={"black"} size={"large"} />

                    </View> : statusSearch == "no-results" ? <View style={styles.SvgXml}>
                        <SvgXml
                            height={250}
                            width={250}
                            xml={icon_error}
                            style={{ margin: "auto" }}
                        />
                        <Text>No hay resultados</Text>
                    </View> : statusSearch === "preview" ? <Text style={styles.textS}>Busca lo que quieras!</Text> :
                        searchUsers.map((data,index)=> {
                            return <TouchableOpacity key={index} onPress={()=>ViewProfile(data.id)} style={styles.card}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: "https://i.pinimg.com/originals/36/df/e6/36dfe6af52a5111f9fafe59b11aab04b.jpg"
                                }}
                            />
                            <View style={styles.info}>
                                <Text style={styles.titleInfo}>{data.id == user.id? "Yo" : data.nombre + " " + data.apellido}</Text>
                                <Text style={styles.followers}>{data.seguidores} {data.seguidores !== 1? "seguidores" : "seguidor"}</Text>
                            </View>
                        </TouchableOpacity>

                        })

                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    padre: {
        flex: 1
    },
    search: {
        flex: 0.15,
        width: "100%",
        paddingHorizontal: 25,
        paddingVertical: 15
    },
    results: {
        flex: 0.85,
        maxHeight: "85%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 20

    },
    text: {
        color: "white",
        fontSize: 25

    },
    PSearch: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#E5E5E5",
        borderRadius: 10,
    },
    input: {
        width: "80%",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    SvgXml: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 50,
        width: "100%",
        height: "100%",
    },
    card: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical:10
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 100
    },
    info: {
        marginLeft: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "start"
    },
    titleInfo: {
        fontWeight: "700",
        fontSize: 16
    },
    followers: {
        fontSize: 14,
        color: "#C5C5C5"
    },
    loading:{
        display:"flex",
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"center"
    },
    textS:{
        fontSize:20,
        textAlign:"center",
        marginTop:100
    }

})


export default Search