import { Text, View,StyleSheet } from "react-native"



const IniciarEncuesta = ()=> {
    return <View style={styles.padre}>
        
        <View style={styles.header}>
            <View style={styles.time}>
                <View style={styles.ChargeTime}></View>
            </View>
            <View style={styles.puntos}></View>
        </View>
        <View style={styles.question}></View>

        <View style={styles.options}></View>

    </View>
}

const styles = StyleSheet.create({
    padre:{
        width:"100%",
        padding:15
    },
    header:{
        display:"flex",
        flexDirection:"column",
        width:"100%"
    },
    question:{

    },
    options:{
        display:"flex",
        flexDirection:"column",
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    time:{

    },
    puntos:{
        position:"relative",
        height:20,
        width:"100%",
        borderRadius:15,
        padding:5,
        backgroundColor:"gray",
        zIndex:4
    },
    ChargeTime:{
        width:"100%",
        zIndex:100,
        padding:2,
        backgroundColor:"green",
        borderRadius:15
        
    }   
})

export default IniciarEncuesta

