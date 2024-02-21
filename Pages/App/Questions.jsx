import { useEffect, useState } from "react";
import { View,StyleSheet,Text,SafeAreaView,ScrollView,TouchableOpacity } from "react-native"
import Juegos from "../../components/Questions/Juegos";
import Biologia from "../../components/Questions/Biologia";
import Historia from "../../components/Questions/Hisotira";
import Tecnologia from "../../components/Questions/Tecnologia";
import Peliculas from "../../components/Questions/Peliculas";


 const Questions = ({navigation})=> {


    const [stateContent,setStateContent] = useState("Juegos")
     
    return (
        <SafeAreaView  style={styles.padre}>
            <View style={styles.padreA}>
                <Text style={{fontSize:25,fontWeight:"500",textAlign:"center"}}>Gana tus medallas</Text>
            </View>
            <View>
                <Text style={styles.categoriasText}>Categorias</Text>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollview}>
                <TouchableOpacity onPress={()=> setStateContent("Juegos")} style={styles.button}>
                    <Text>Juegos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setStateContent("Peliculas")} style={styles.button}>
                    <Text>Peliculas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setStateContent("Tecnologia")} style={styles.button}>
                    <Text>Tecnologia</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setStateContent("Historia")} style={styles.button}>
                    <Text>Historia</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setStateContent("Biologia")} style={styles.button}>
                    <Text>Biologia</Text>
                </TouchableOpacity>

            </ScrollView>

            <View style={styles.content}> 
                {
                    stateContent === "Juegos"? <Juegos/> : 
                    stateContent === "Peliculas"? <Peliculas/> : 
                    stateContent === "Tecnologia"? <Tecnologia/> : 
                    stateContent === "Historia"? <Historia/> : 
                    <Biologia/>
                    
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    padre:{
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
    }
})


export default Questions