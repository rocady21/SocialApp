import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View,TouchableOpacity,Image } from "react-native"



const CardQuestions = ({data})=> {

    const navigation = useNavigation()

    const IniciarEncuesta = ()=> {
            navigation.navigate("IniciarEncuesta",data.id)
    }
    
    return (
        <View style={styles.padre}>
            <Text style={styles.tittle}>{data.nombre}</Text>
            <Text style={styles.tittle}>P/{data.number_of_questions}</Text>
            <Text style={styles.text}>{data.descripcion}</Text>

            <View style={styles.body}>


                <View style={styles.Insg}>
                    <Text style={styles.level}>Epic</Text>
                </View>
                <Text style={{}}>5 mn</Text>

                <Image
                    style={styles.Image}
                    source={{uri:data.insignia.img}}
                />

            </View>



            <TouchableOpacity style={styles.button} onPress={IniciarEncuesta}>
                <Text style={{color:"white",fontWeight:"500",fontSize:18}}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        backgroundColor:"white",
        margin:"auto",
        width:"80%",
        alignSelf:"center",
        padding:15,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#DEDEDE",
        shadowColor: "#000000",
        borderRadius:15,
        shadowOffset: {
        width: 0,
        height: 6,
        },
        shadowOpacity:  0.21,
        shadowRadius: 6.65,
        elevation: 9,
        marginBottom:25
    },
    tittle:{
        fontSize:30,
        fontWeight:"700",
        marginVertical:5

    },
    level:{
        marginVertical:5,
        textShadowColor: 'rgba(199, 0, 199, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5
    },
    text:{
        fontWeight:"200",
        color:"black",
        fontSize:12,
        opacity:0.8,
        textAlign:"center",
        marginVertical:5


    },
    button:{
        padding:10,
        backgroundColor:"black",
        borderRadius:5,
        marginVertical:5
    },
    Insg:{
        paddingVertical:5,
        paddingHorizontal:15,
        borderRadius:20,
        borderWidth:1,
        borderColor:"#DEDEDE",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        marginVertical:5,
    },
    Image:{
        width:75,
        height:75
    },
    body:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        marginVertical:5
    }
})

export default CardQuestions