import React from "react";
import { View,StyleSheet,TouchableOpacity,Image,Text } from "react-native";



const Like_Component = ({info})=> {

    const ViewProfile = ()=> {
        
    }
    return ( 
        <View style={styles.padre}>
            <View style={styles.info}>
                <Image
                    style={styles.Image}
                    source={{
                        uri:"https://image.emojipng.com/346/10131346.jpg"
                    }}
                />
                <Text style={{fontSize:16}}>{info.nombre + " " + info.apellido} </Text>
            </View>
            <TouchableOpacity onPress={ViewProfile} style={styles.viewProfile}>
                <Text style={{color:"white",margin:0,padding:0}}>Ver Perfil</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        marginVertical:15,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    Image:{
        width:40,
        height:40,
        borderRadius:50,
        marginRight:8
    },
    info:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    viewProfile:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        backgroundColor:"#00146C",
        paddingVertical:2,
        paddingHorizontal:8
        
    }
})

export default Like_Component