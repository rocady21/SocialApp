import { StyleSheet, View,Text } from "react-native"



const Peliculas = ()=> {
    return (
        <View style={styles.padre}>
            <Text>Peliculas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1
    }
})

export default Peliculas