import { useState } from "react";
import { StyleSheet, Touchable } from "react-native";
import { View,Text,Modal,TouchableOpacity,TextInput } from "react-native"
import OptionComponent from "./OptionComponent";


const ModalCreateQuestion = ({modalCreateQuestion,handleModalCreateQuestion})=> {


    const [Question,setQuestion ] = useState("")
    const [error,stateError] = useState("Debes de ingresar 4 opciones validas")
    const [state,setState] = useState("button")
    const [options,setOptions] = useState([
        {
            text:"",
            is_true:false
        },
        {
            text:"",
            is_true:false
        },
        {
            text:"",
            is_true:false
        },
        {
            text:"",
            is_true:false
        },
    ]
    )

    const changeToButton = ()=> {
        setState("input")
    }

    const setStateOptions = (index,key,value)=> {
        setOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            const new_s = updatedOptions.map((prev)=> {
                if(prev.is_true === true) {
                    return {
                        ...prev,
                        is_true: false
                    }
                }
                return prev
            })
            new_s[index][key] = value;
            return new_s;
          });
    }

    const Añadir = ()=> {
        let search_error = ""
    }

    return (
        <Modal
        animationType="slide"
        visible={modalCreateQuestion}
        style={styles.modalPadre}
        transparent={true}
        onRequestClose={() => {
            handleModalCreateQuestion()
        }}>
            <View style={styles.modal}>
                {
                    error !== "" && 
                    <View style={styles.error}>
                        <Text style={{color:"white"}}>jeejejejej</Text> 
                    </View>
                }

                <View style={styles.content}>
                    {
                        state === "input" ? <TextInput
                        style={styles.question}
                        placeholder="Ingrese aqui su pregunta"
                        value={Question}
                        onChangeText={(text)=> setQuestion(text)}
                        onBlur={()=> {
                            setState("button")
                        }}
                        /> : 
                        <TouchableOpacity onPress={(changeToButton)} style={styles.question}>
                            <Text style={{fontSize:16,fontWeight:"400"}}> 
                            {Question === ""? "Ingrese aqui su pregunta" : Question }
                            </Text>
                        </TouchableOpacity>
                    }

                    <View style={styles.options}>
                        {
                            options.map((opt,index)=> {
                                return <OptionComponent opt={opt} index={index} key={index} setStateOptions={(index,key,value)=> setStateOptions(index,key,value)} />
                            })
                        }
                    </View>

                </View>

                <TouchableOpacity onPress={Añadir} style={styles.button}>
                    <Text style={{color:"white",fontWeight:"700",fontSize:18}}>Añadir</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    )
}


const styles = StyleSheet.create({
    error:{
        alignSelf:"center",
        paddingVertical:10,
        paddingHorizontal:20,
        width:"80%",
        margin:"auto",
        backgroundColor:"#FF8484",
        borderLeftColor:"red",
        borderLeftWidth:10,
        
    },
    modalPadre:{
        width:"100%",
        position:"absolute",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        height:"100%"
    },
    modal:{
        padding:15,
        position:"relative",
        alignSelf:"center",
        width:"85%",
        backgroundColor:"white",
        top:"auto",
        bottom:"auto",
        marginTop:"auto",
        marginBottom:"auto",
        minHeight:500,
        shadowColor: "#464646",
        shadowOffset: {
            width: 5,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,

    },
    head:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    content:{
        
    },
    button:{
        margin:10,
        position:"absolute",
        bottom:0,
        right:0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:8,
        paddingHorizontal:15,
        backgroundColor:"black"
    },
    question:{
        marginTop:20,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        display:"flex",
        flexDirection:"row",
        padding:25,
        justifyContent:"center",
        alignContent:"center",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.6,
        shadowRadius: 6.65,
        shadowColor:"gray",
        elevation: 8,
    },
    options:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    }
})
export default ModalCreateQuestion