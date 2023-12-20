import { View,Text,StyleSheet,Button,TextInput,TouchableOpacity,Image } from "react-native"
import { useUserSlice } from "../../hooks/useUserSlice"
import { getStorage } from "../../utils/AsyncStorage"
import { useState } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import ToastManager from 'toastify-react-native'
import { SuccessToastify } from "../../utils/Toastify"



const Login = ({navigation})=> {


    const {mostrarMensaje,message,LoginUser} = useUserSlice()
    const [stateForm,setStateForm] = useState({
        email:"",
        password:""
    })
    const [ShowPassword,setShowPassword] = useState(false)


    const ShowOrHidePassword = ()=> {
        setShowPassword(!ShowPassword)
    }
    const onChangeText = (text,key)=> {
        console.log(text);
        console.log("xd");
        setStateForm(
            {
                ...stateForm,
                [key]:text
            }
        )
    }
    
    
    const SignIn = ()=> {
        console.log("A");
        if(stateForm.email !== "" && stateForm.password !== "") {
            console.log("A");
            LoginUser(stateForm)
        }
    }

    
    return (
        <View style={styles.container}>
            <ToastManager />
            <Text style={styles.title}>Iniciar Sesion</Text>
            <View style={styles.padre}>
                <View style={styles.inputContainer}>
                    <Text>Email</Text>
                    <TextInput
                        editable
                        multiline 
                        numberOfLines={4}
                        maxLength={40}
                        onChangeText={text => onChangeText(text,"email")}
                        value={stateForm.email}
                        style={styles.inputs}
                    />    
                </View>

                <View style={styles.inputContainer}>
                    <Text style={{}}>Contraseña</Text>
                    <View style={styles.padrePassword}>
                        <TextInput  
                            editable
                            secureTextEntry={ShowPassword == true? false : true}
                            onChangeText={text => onChangeText(text,"password")}
                            value={stateForm.password}
                            style={styles.inputPassword} 
                        />  

                        <Text
                        style={styles.buttonPassword}
                        title="S"
                        role="button"
                        onPress={ShowOrHidePassword}
                        >{
                            ShowPassword === true? <Icon name="eye" size={20}/> :  <Icon name="eye-off" size={20}/>
                        }</Text>

                    </View>
  
                </View>

                <Text style={styles.createAccount}>No tienes una cuenta? <Text style={styles.createAccountColor}>Crear Una</Text></Text>

                <TouchableOpacity style={styles.button} onPress={SignIn}>
                    <Text style={{color:"white",fontWeight:"bold",fontSize:16}}>Iniciar Sesión</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button2} onPress={SignIn}>
                    <Image
                        style={styles.image}
                        source={{
                            uri:"https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png"
                        }}
                    />
                    <Text style={{color:"black",fontWeight:"bold",fontSize:16}}>Iniciar Sesión con Google</Text>
                </TouchableOpacity>
            </View>
 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop:"50px",
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
        fontWeight:"bold",
        fontSize:25,
        marginBottom:15
    },
    padre:{
        margin:"auto",
        width:"90%",
        borderRadius:20,
        display:"flex",
        alignItems:"center",
        paddingHorizontal:20,
        paddingVertical:25
    },
    inputs:{
        marginBottom:25,
        height:40,
        borderBottomColor:"#BEBEBE",
        borderCurve:"circular",
        borderBottomWidth:2
        
    },
    padrePassword:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        borderBottomColor:"#BEBEBE",
        borderCurve:"circular",
        borderBottomWidth:2,
        marginBottom:15,
    },
    inputPassword:{
        height:40,
        width:"80%"
    },
    buttonPassword:{
        width:"10%"
    },
    text:{
        color:"gray",
        marginLeft:10
    },

    inputContainer:{
        width:"100%",
        margin:"auto",
        
    },
    button:{
        paddingVertical:15,
        backgroundColor:"#00146C",
        borderRadius:100,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    button2:{
        paddingVertical:15,
        borderRadius:100,
        width:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderColor:"gray",
        borderWidth:2,
        marginTop:25
    },
    image:{
        width:25,
        height:25,
        marginRight:10
    },
    createAccount: {
        fontSize:16,
        marginVertical:15
    },
    createAccountColor:{
        color:"#00146C",
        fontWeight:"bold"
    }
  });

export default Login