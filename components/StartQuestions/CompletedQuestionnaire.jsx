import { useEffect } from "react"
import { View,Text,StyleSheet } from "react-native"
import { useQuestionsSlice } from "../../hooks/useQuestionsSlice"



const CompletedQuestionnaire = ()=> {
    const {FinishendQuestionnare} = useQuestionsSlice()
    useEffect(()=> {
        FinishendQuestionnare()
    },[])
    return ( 
        <View style={styles.padre}></View>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1
    }
})

export default CompletedQuestionnaire