import { useEffect } from "react"
import { View,Text,StyleSheet,ActivityIndicator,Image,TouchableOpacity } from "react-native"
import { useQuestionsSlice } from "../../hooks/useQuestionsSlice"
import Badge from "react-native-vector-icons/Foundation"
import { useNavigation } from "@react-navigation/native"


const CompletedQuestionnaire = ()=> {
    const {FinishendQuestionnare,cuest_user,results_cuest,ResetQuestionareState} = useQuestionsSlice()
    const navigation = useNavigation()

    
    useEffect(()=> {
        FinishendQuestionnare(cuest_user.id)

        return ()=> {
            console.log("sali de resultado");
            ResetQuestionareState()
        }
    },[])

    const NavigateQuestion = ()=> {
        navigation.navigate("Questions")
    }
    return ( 
        <View style={styles.padre}>
            <View style={styles.head}>
                <View style={styles.icon}>
                    <Badge name={"sheriff-badge"} size={20} />
                </View>
                <Text style={{marginLeft:10, fontSize:18}}>Resultado</Text>
            </View>
            {
                results_cuest !== undefined? 
                <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={{color:"#909090"}}>Nombre</Text>
                    <Text style={{color:"#909090"}}> {results_cuest.name} </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{color:"#909090"}}>Preguntas</Text>
                    <Text style={{color:"#909090"}}> {results_cuest.questions} </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{color:"#909090"}}>Puntos conseguidos</Text>
                    <Text style={{color:"#909090"}}> {results_cuest.points} </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{color:"#909090"}}>Puntos requeridos</Text>
                    <Text style={{color:"#909090"}}> {results_cuest.expected_points} </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{color:"#909090"}}>Estado</Text>
                    <Text style={{color:"#909090"}}> {results_cuest.status} </Text>
                </View>

                {
                    results_cuest.status === "Aprobada"? <View style={styles.aprobada}>
                        <Text style={{color:"#909090"}}>Felicidades!!!</Text>
                        <Text style={{color:"#909090"}}>Has logrado conseguir la insignia {results_cuest.badge.nombre} </Text>
                        <Image style={styles.image} source={{
                            uri:results_cuest.badge.image
                        }}/>
                    </View> : <View style={styles.perdida}>
                        <Text style={{textAlign:"center",color:"#909090"}}>Lo siento, No has conseguido los puntos suficientes para esta encuesta</Text>
                        <Text style={{color:"#909090",marginVertical:10,}}>Mejor suerte para la proxima :D </Text>
                    </View>
                }

            <TouchableOpacity style={styles.button} onPress={NavigateQuestion}>
                <Text style={{color:"white",fontWeight:"500",fontSize:18}}>Volver al inicio</Text>
            </TouchableOpacity>


            </View> : 
            <ActivityIndicator color={"black"} size={"large"} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        backgroundColor:"white",
        padding:25,
        borderRadius:10,
        borderWidth:1,
        borderColor:"#C2C2C2",
        width:"85%",
        margin:"auto",
        marginTop:"auto",
        marginBottom:"auto",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    button:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        padding:10,
        backgroundColor:"black",
        borderRadius:5,
        marginVertical:5
    },
    head:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        marginBottom:15,
    },  
    content:{
        display:"flex",
        flexDirection:"column",
    },
    icon:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:"#EAEAEA",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.01,
        shadowRadius: 1.30,

        elevation: 8,
    },
    row:{
        marginVertical:5,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    aprobada:{
        margin:"auto",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    image:{
        width:75,
    },
    perdida:{
        marginTop:10,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        
    }
})

export default CompletedQuestionnaire