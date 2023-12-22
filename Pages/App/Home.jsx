import { View,Text,Button,StyleSheet } from "react-native"
import { removeValueStorage } from "../../utils/AsyncStorage"
import { useUserSlice } from "../../hooks/useUserSlice"

const Home = ({navigation})=> {

    console.log("XD");

    const {existUser} = useUserSlice()

    const salir = ()=> {
        removeValueStorage("token")
        existUser()
    }
    return (
        <View style={styles.home}>
            <Text>Pagina de Home</Text>
            <Button
            title="Salir"
            onPress={salir}
            />           
        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        flex:1
    }
})

export default Home