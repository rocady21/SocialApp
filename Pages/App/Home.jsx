import { View,Text,Button } from "react-native"
import { removeValueStorage } from "../../utils/AsyncStorage"
import { useUserSlice } from "../../hooks/useUserSlice"

const Home = ({navigation})=> {

    const {existUser} = useUserSlice()

    const salir = ()=> {
        removeValueStorage("token")
        existUser()
    }
    return (
        <View>
            <Text>Pagina de Home</Text>
            <Button
            title="Salir"
            onPress={salir}
            />           
        </View>
    )
}

export default Home