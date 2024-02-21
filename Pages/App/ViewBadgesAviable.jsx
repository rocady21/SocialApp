import { View,Text,StyleSheet } from "react-native"

const ViewBadgesAviable = ()=> {

    return (
        <View style={styles.padre}>
            <Text>Aqui traeremos las badges disponibles para este anime</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1
    }
})


export default ViewBadgesAviable