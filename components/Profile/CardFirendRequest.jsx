import { StyleSheet,Text, View,Image,TouchableOpacity } from "react-native"


const CardFriendRequest = ()=> {
    return (
        <View style = {styles.p}>
            <Image
                style={styles.image}
                source={{
                    uri:"https://pm1.aminoapps.com/7437/94d97579c10de207683fe749f48d76e96df2e50br1-1444-2048v2_hq.jpg"
                }}
            />
            <View style={styles.info}>
                <Text>Rodrigo Olivera Silva solicitó seguirte.</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonA}><Text style={{color:"white",textAlign:"center"}}>Aceptar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonR}><Text style={{color:"black",textAlign:"center"}}>Rechazar</Text></TouchableOpacity>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    p:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        paddingVertical:15,
        alignItems:"center"
    },
    image:{
        width:45,
        height:45,
        borderRadius:35,
    },
    info:{
        width:"60%",
        paddingHorizontal:8
    },
    buttons:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    },
    buttonA:{
        padding:5,
        backgroundColor:"#00146C",
        borderRadius:5,
        marginBottom:5
    },
    buttonR:{
        padding:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#E1E1E1"
    }
})

export default CardFriendRequest