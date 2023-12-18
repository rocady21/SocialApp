import { View,Text,StyleSheet,Button,TextInput } from "react-native"
import { useUserSlice } from "../../hooks/useUserSlice"
import { getStorage } from "../../utils/AsyncStorage"
import { useState } from "react"



const Login = ({navigation})=> {

    const storage = getStorage("token")
    console.log(storage);

    const {mostrarMensaje,message} = useUserSlice()
    const [stateForm,setStateForm] = useState({
        email:"",
        password:""
    })

    
    
    const onChangeText = (text,key)=> {
        setStateForm(
            {
                ...stateForm,
                [key]:text
            }
        )
    }


    const onPressLearnMore = () => {
        navigation.navigate("Register")
    }
    
    return (
        <View style={styles.container}>

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
                    <Text style={styles.text}>Email</Text>
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
    padre:{
        margin:"auto",
        backgroundColor:"#E7E7E7",
        width:"80%",
        borderRadius:20,
        display:"flex",
        alignItems:"center",
        paddingHorizontal:20,
        paddingVertical:25
    },
    inputs:{
        backgroundColor:"blue",
        marginBottom:15,
        paddingVertical:0,
        height:40
        
    },
    text:{
        color:"gray",
        marginLeft:10
    },
    inputContainer:{
        width:"100%",
        margin:"auto",
        
        
    }
  });

export default Login