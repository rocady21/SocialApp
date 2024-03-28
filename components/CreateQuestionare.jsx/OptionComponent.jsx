import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, TextInput,CheckBox, Touchable } from "react-native"



const OptionComponent = ({opt,index,setStateOptions})=> {

    const [stateAction,setStateAction] = useState("button")
    const [text,setText] = useState(opt.text)
    const [is_true,setIs_true] = useState(opt.is_true)

    useEffect(()=> {
        if(text !== "") {
            setStateOptions(index,"text",text)
        }
    },[text])

    const update_is_true = ()=> {
        setIs_true(!is_true)
        setStateOptions(index,"is_true",!is_true)
    }

    

    return (
        <View style={styles.padreA}>
            {
                stateAction === "input" ? 
                <TextInput
                    placeholder="ingrese una Opcion"
                    value={text}
                    style={styles.padre}
                    onChangeText={(txt)=> setText(txt)}
                    onBlur={()=> {
                        setStateAction("button")
                    }}
                /> :
                <View style={styles.padre}>
                    <TouchableOpacity style={styles.text} onPress={()=> setStateAction("input")}> 
                        <Text style={{fontSize:14,fontWeight:"400"}}>
                            {text === ""? "Ingrese una Opcion" : text }
                        </Text>
                    </TouchableOpacity>
                    
                    <View style={styles.checkpadre}>
                        <TouchableOpacity onPress={()=> update_is_true()} style={styles.checkbox}>
                            <View style={{width:"100%",height:"100%",backgroundColor: opt.is_true === true ? "#82CAFF" : "#DDDDDD",borderRadius:100 }}></View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        
        </View>
    )
}


const styles = StyleSheet.create({
    padreA : {
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    padre:{
        marginTop:20,
        width:"70%",
        backgroundColor:"white",
        borderRadius:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.6,
        shadowRadius: 6.65,
        shadowColor:"gray",
        elevation: 8,
    },
    checkbox:{
        
        alignSelf:"center",
        width:15,
        height:15,
        borderRadius:10,
        backgroundColor:"#DDDDDD",
        padding:2,
    },
    text:{
        width:"80%"
    },
    checkpadre:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"20%"
    }

})


export default OptionComponent