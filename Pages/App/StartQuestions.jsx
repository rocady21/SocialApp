import { useEffect, useState } from "react"
import { Text, View,StyleSheet,TouchableOpacity } from "react-native"
import { useQuestionsSlice } from "../../hooks/useQuestionsSlice"
import QuestionComponent from "../../components/StartQuestions/Question"



const IniciarEncuesta = ({route})=> {

    const id_cuest = route.params
    
    const {questionsFromEntity,CargarPreguntasDeCuestionario,questions} = useQuestionsSlice()


    console.log(questions);

    useEffect(()=> {
        CargarPreguntasDeCuestionario(id_cuest)
    },[])
    

    
    return <View style={styles.padre}>
        
        <QuestionComponent/>

    </View>
}

const styles = StyleSheet.create({
    padre:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    header:{
        display:"flex",
        flexDirection:"column",
        width:"100%"
    },
    question:{
        marginTop:100,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        display:"flex",
        flexDirection:"row",
        padding:25,
        justifyContent:"center",
        alignContent:"center",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.6,
        shadowRadius: 6.65,
        shadowColor:"gray",
        elevation: 8,
    },
    options:{
        width:"100%",
        padding:15,
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        marginTop:"5%",
        alignItems:"center",
        borderRadius:5,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.6,
        shadowRadius: 6.65,
        shadowColor:"gray",
        elevation: 8,
        marginBottom:25
    },
    time:{
        width:"100%",
        borderRadius:15,
        backgroundColor:"#DEDEDE",
        zIndex:4,
        padding:3
    },
    info_q:{
        width:"100%",
        marginVertical:15,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15
    },
    ChargeTime:{
        width:"100%",
        zIndex:100,
        padding:4,
        backgroundColor:"#00A024",
        borderRadius:15
        
    },
    option:{
        padding:15,
        width:"100%",
        backgroundColor:"white",
        borderRadius:1000,
        borderWidth:1,
        borderColor:"#DEDEDE",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10

    }
})

export default IniciarEncuesta

