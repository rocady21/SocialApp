import { View,Text,StyleSheet, ScrollView } from "react-native"
import CardQuestions from "../../components/ViewBadgesAviable/CardQuestions"
import { useEffect } from "react"
import { useQuestionsSlice } from "../../hooks/useQuestionsSlice"
import { useUserSlice } from "../../hooks/useUserSlice"

const ViewBadgesAviable = ({route})=> {

    const {user} = useUserSlice()
    const {handleLoadQuestionsFromEntity,questionsFromEntity,ResetState} = useQuestionsSlice()
    const id = route.params    
    useEffect(()=> {
        ResetState()
        handleLoadQuestionsFromEntity(id,user.id)

    },[])
    

    return (
        <View style={styles.padre}>
            <View style={styles.header}>
                <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>Medallas Disponibles</Text>
            </View>
            <ScrollView style={styles.body}>

                {
                    questionsFromEntity[0]? questionsFromEntity.map((cuest)=> {
                        return <CardQuestions key={cuest.id} data = {cuest}/>
                    }) : <Text>No hay cuestionarios disponibles para esta entidad</Text>
                }
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        marginTop:15,
        flex:1,
        margin:10
    },
    header:{
        width:"100%",
        paddingVertical:15,
        backgroundColor:"white",
        borderRadius:15,
    },
    body:{
        width:"100%",
        margin:"auto",
        marginVertical:15,
        display:"flex",
        flexDirection:"column",
    }
})


export default ViewBadgesAviable