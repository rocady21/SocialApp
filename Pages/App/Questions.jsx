import { useEffect, useState } from "react";
import { View,StyleSheet,Text,SafeAreaView,ScrollView,TouchableOpacity,ActivityIndicator,Image } from "react-native"

import { useQuestionsSlice } from "../../hooks/useQuestionsSlice";
import { useNavigation } from "@react-navigation/native";



 const Questions = ({navigation})=> {

    const {LoadCateogries,category,handleLoadEntitiesFromCat,handelClearEntitiesFromCateogries,entitiesfromCateogry} = useQuestionsSlice()
    const [id_selected_cat,setId_selected_cat] = useState(null)
    useEffect(()=> {
        LoadCateogries()
    },[])


    useEffect(()=> {
        if(category [0]) {
            loadEntitiesFromCategory(category[0].id)
        }
    },[category])

    const loadEntitiesFromCategory = (id)=> {
        if(id !== id_selected_cat) {
            setId_selected_cat(id)
            handelClearEntitiesFromCateogries()
            handleLoadEntitiesFromCat(id)
            console.log("llamare");
        } else {
            console.log("no llamare");

        }
    }
    
    const ViewBadgesAviables = (id)=>{
        navigation.navigate("ViewBadgesAviable",id)
    }

    return (
        <SafeAreaView  style={styles.padre}>
            <View style={styles.padreA}>
                <Text style={{fontSize:25,fontWeight:"500",textAlign:"center"}}>Gana tus medallas</Text>
            </View>
            <View>
                <Text style={styles.categoriasText}>Categorias</Text>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollview}>


            {
                category[0]? category.map((cat)=> {
                    return <TouchableOpacity onPress={()=>loadEntitiesFromCategory(cat.id)} key={cat.id} style={styles.button}>
                    <Text>{cat.nombre}</Text>
                </TouchableOpacity>
                }) : <ActivityIndicator style={styles.indicator} color={"black"} size={"large"} />
            }

            </ScrollView>


            <View style={styles.content}> 
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.padreScroll}>
                        {
                            entitiesfromCateogry[0]? entitiesfromCateogry.map((ent)=> {
                                return  <TouchableOpacity key={ent.id} onPress={()=> ViewBadgesAviables(ent.id)} style={styles.cardJuego}>
                                <Image source={{uri:ent.foto}} style={styles.image}
                                      onError={(error) => console.log("Error al cargar la imagen:", error)}
                                />
                                <Text style={styles.textCard}>{ent.nombre}</Text>
                            </TouchableOpacity>
                            }) : <Text>No hay entidades</Text>
                        }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    padre:{
        marginTop:15,
        flex:1,
        display:"flex",
        flexDirection:"column",
        margin:10
    },
    padreA:{
        marginVertical:6,
        
        backgroundColor:"white",
        borderRadius:15,
        padding:20,
        textAlign:"center"
    },
    categoriasText:{
        fontWeight:"800",
        fontSize:15
    },
    scrollview:{
        flex:1,
        display:"flex",
        flexDirection:"row",
        marginTop:15,
        maxWidth:"100%",
        maxHeight:35
    },
    button:{
        marginHorizontal:10,
        paddingVertical:5,
        borderRadius:5,
        paddingHorizontal:10,
        backgroundColor:"white",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",

    },
    content:{
        width:"100%",
        flex:1,
        marginTop:15
    },
    padreScroll:{
        padding:5,
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between"
    },
    cardJuego:{
        marginVertical:10,
        width:"48%",
        borderRadius:5,
        height:250
    }, 
    image:{
        width:"100%",
        height:"90%",
        borderRadius:5
    },
    textCard:{
        fontWeight:"800",
        fontSize:16,
        textAlign:"left",
        marginTop:5
    }
    
})


export default Questions