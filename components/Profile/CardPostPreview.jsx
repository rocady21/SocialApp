import { useNavigation } from "@react-navigation/native"
import { View,StyleSheet,Text, TouchableOpacity,Image,Modal } from "react-native"
import { usePosterSlice } from "../../hooks/usePostSlice"


const CardPostPreview = ({data})=> {
    const navigate = useNavigation()
    const {AddSelectedPost} = usePosterSlice()
    const ViewPost = ()=> {
        AddSelectedPost(data)
        navigate.navigate("Info_Post")
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
        height:125,
        backgroundColor:"black"
    },
    image: {
        width:"100%",
        height:"100%"
    }
})

export default CardPostPreview