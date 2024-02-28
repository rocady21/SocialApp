import { useEffect, useState } from "react"
import { Text, View,StyleSheet,TouchableOpacity } from "react-native"



const IniciarEncuesta = ()=> {

    
    const [stateOptions,setStateOptions] = useState("")


    useEffect(()=> {
        setTimeout(() => {
            console.log("siguiente pregunta");
        }, 5000);
    },[])
    
    const onSelectedOption = (option)=> {
        setStateOptions(option)
    }
    
    return <View style={styles.padre}>
        
        <View style={styles.header}>
            <View style={styles.time}>
                <View style={styles.ChargeTime}></View>
            </View>
            <View style={styles.info_q}>
                <Text>1/15</Text>
                <Text>5 Puntos</Text>

            </View>
        </View>
        <View style={styles.question}>
            <Text style={{fontSize:20,fontWeight:"400"}}>Quien era luffy?</Text>
        </View>

        <View style={styles.options}>

            <TouchableOpacity onPress={()=>onSelectedOption("Un Pirata")} style={[styles.option, {backgroundColor: stateOptions === "Un Pirata" ? "#00D41D" : "white"}]}>
                <Text>Un Pirata</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>onSelectedOption("Un guerrero")} style={[styles.option, {backgroundColor: stateOptions === "Un guerrero" ? "#00D41D" : "white"}]}>
                <Text>Un guerrero</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>onSelectedOption("Un vendedor")} style={[styles.option, {backgroundColor: stateOptions === "Un vendedor" ? "#00D41D" : "white"}]}>
                <Text>Un vendedor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.option, {backgroundColor: stateOptions === "Un samurai" ? "#00D41D" : "white"}]} onPress={()=>onSelectedOption("Un samurai")}>
                <Text>Un samurai</Text>
            </TouchableOpacity>

        </View>

    </View>
}

const styles = StyleSheet.create({
    padre:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    header:{
        display:"flex",
        flexDirection:"column",
        width:"100%"
    },
    question:{
        marginTop:100,
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
        width:"100%",
        padding:15,
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        marginTop:"5%",
        alignItems:"center",
        borderRadius:5,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.6,
        shadowRadius: 6.65,
        shadowColor:"gray",
        elevation: 8,
        marginBottom:25
    },
    time:{
        width:"100%",
        borderRadius:15,
        backgroundColor:"#DEDEDE",
        zIndex:4,
        padding:3
    },
    info_q:{
        width:"100%",
        marginVertical:15,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15
    },
    ChargeTime:{
        width:"100%",
        zIndex:100,
        padding:4,
        backgroundColor:"#00A024",
        borderRadius:15
        
    },
    option:{
        padding:15,
        width:"100%",
        backgroundColor:"white",
        borderRadius:1000,
        borderWidth:1,
        borderColor:"#DEDEDE",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10

    }
})

export default IniciarEncuesta

