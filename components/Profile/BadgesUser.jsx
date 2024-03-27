import { StyleSheet } from "react-native"
import { View,Text,ScrollView,Image } from "react-native"
import Badge from "react-native-vector-icons/SimpleLineIcons"
import { useUserSlice } from "../../hooks/useUserSlice"
const BadgesUser = ()=>  {
    const {user} = useUserSlice()
    const badges = user.badges_user

    return (
        <View style={styles.padre}>
            <View style={styles.padreIcon}>
                <Badge name={"badge"} color={"#8F8F8F"} size={25} />
            </View>
            <ScrollView horizontal={true} style={styles.content}>
                {
                    badges[0]? badges.map((badge)=> {
                        return <View style={styles.badgeCard}>
                            <Image style={styles.image} source={{uri:"https://i.pinimg.com/originals/4c/46/ee/4c46ee47e0710a6d928454f68fc4ee17.png"}}/>
                        </View>
                    }) : <Text>No hay insignias </Text>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    padre:{
        display:"flex",
        flexDirection:"row",
        
        borderRadius:15,
        height:70,
        minHeight:70,
        backgroundColor:"white",
        margin:"auto",
        width:"80%",
        shadowColor: "#464646",
        shadowOffset: {
            width: 5,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    padreIcon:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        width:"25%",
        borderRadius:15,
        backgroundColor:"#E0E0E0",
        shadowColor: "#000",
        shadowOffset: {
            width: -5,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    content:{
        display:"flex",
        flexDirection:"row",
        padding:10,
        width:"75%"
    },
    image:{

        width:25,
        height:25,

    },
    badgeCard:{
        borderColor:"#C8C8C8",
        borderWidth:1,
        width:50,
        height:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        justifyContent:"center",
        
    }
})

export default BadgesUser