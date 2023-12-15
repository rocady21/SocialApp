import { View,Text,StyleSheet } from "react-native"

const Login = ()=> {
    return (
        <View style={style.padre}>
            <Text>Pagina de Login</Text>           
        </View>
    )
}

const style = StyleSheet.create({
    padre:{
        flex:"1",
        alignItems:"center",

    }
})

export default Login