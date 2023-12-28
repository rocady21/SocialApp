import { View,StyleSheet, TouchableOpacity } from "react-native"


const CardPost = ()=> {
    return (
        <TouchableOpacity style={styles.post}></TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post:{
        width:"33%",
        margin:0.6,
        height:150,
        backgroundColor:"black"
    }
})

export default CardPost