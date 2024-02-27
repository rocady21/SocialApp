import { View,Text,StyleSheet, ScrollView } from "react-native"
import CardQuestions from "../../components/ViewBadgesAviable/CardQuestions"

const ViewBadgesAviable = ()=> {

    return (
        <View style={styles.padre}>
            <View style={styles.header}>
                <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>Medallas Disponibles</Text>
            </View>
            <ScrollView style={styles.body}>
                <CardQuestions/>

                



            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
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