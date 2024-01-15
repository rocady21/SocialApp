import { useNavigation } from "@react-navigation/native"
import { View,StyleSheet,Text, TouchableOpacity,Image } from "react-native"


const CardPostPreview = ({data})=> {
    const navigate = useNavigation()
    const ViewPost = ()=> {
        navigate.navigate("Info_Post",data)
    }
    
    return (
        <TouchableOpacity onPress={ViewPost} style={styles.post}>
            <Image
                source={{
                    uri: data.photos[0].photo_url
                }}
                style={styles.image}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post:{
        width:"33%",
        margin:0.6,
        height:150,
        backgroundColor:"black"
    },
    image: {
        width:"100%",
        height:"100%"
    }
})

export default CardPostPreview