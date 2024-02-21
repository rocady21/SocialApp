import { useNavigation } from "@react-navigation/native"
import { StyleSheet, ScrollView ,Text,View,Image, TouchableOpacity } from "react-native"



const Juegos = ()=> {

    const navigation = useNavigation()

    const ViewBadgesAviables = ()=>{
        navigation.navigate("ViewBadgesAviable")
    }
    
    return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.padre}>
                <TouchableOpacity onPress={()=> ViewBadgesAviables()} style={styles.cardJuego}>
                    <Image source={{uri:"https://cdn.galleries.smcloud.net/t/galleries/gf-e1rX-kFnV-qyyR_league-of-legends-harmonogram-patchowania-2024-kiedy-wejda-nowe-skorki-emotki-bohaterowie-994x828.webp"}} style={styles.image} />
                    <Text style={styles.textCard}>League of Legends</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> ViewBadgesAviables()} style={styles.cardJuego}>
                    <Image source={{uri:"https://phantom-marca.unidadeditorial.es/ea3186b64a7272d07e7f3d30524badba/resize/828/f/jpg/assets/multimedia/imagenes/2023/09/27/16958254315930.jpg"}} style={styles.image} />
                    <Text style={styles.textCard}>Counter Strike</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> ViewBadgesAviables()} style={styles.cardJuego}>
                    <Image source={{uri:"https://media.vandal.net/m/78531/valorant-202052910331074_1.jpg"}} style={styles.image} />
                    <Text style={styles.textCard}>Valorant</Text>
                </TouchableOpacity>

                

            </ScrollView>
    )
}

const styles = StyleSheet.create({
    padre:{
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

export default Juegos