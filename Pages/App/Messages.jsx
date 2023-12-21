import { View,StyleSheet,Text } from "react-native"


 const Messages = ()=> {
    return (
        <View style={styles.padre}>
            <Text>Pagina de Messages</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1
    }
})


export default Messages