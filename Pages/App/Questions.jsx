import { useEffect } from "react";
import { View,StyleSheet,Text,SafeAreaView } from "react-native"


 const Questions = ({navigation})=> {

    
    return (
        <SafeAreaView style={styles.padre}>
            <Text>Pagina de QUestions</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1
    }
})


export default Questions