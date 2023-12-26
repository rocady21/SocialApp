import { View,StyleSheet,Text,Button } from "react-native"
import { useMessageSlice } from "../../hooks/useMessagesSlice"
import { useEffect } from "react"


 const Profile = ()=> {



    const {SeleccionarChat} = useMessageSlice()

    return (
        <View style={styles.padre}>
            <Text>Pagina de Profile</Text>
            <Button
            title="Chat"
            onPress={()=> SeleccionarChat(false)}
            />     
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1
    }
})


export default Profile