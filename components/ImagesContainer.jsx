import React, { useState,useEffect,useRef } from "react"

import {View,StyleSheet,PermissionsAndroid,Image} from "react-native"
import IconPhoto from "react-native-vector-icons/FontAwesome"
import {launchCamera,launchImageLibrary} from "react-native-image-picker"
import * as ImagePicker from "expo-image-picker"


export const ImageContainer = ({setImage})=> {
    const [imageSelected,setImageSelected] = useState("")
    const options = {
        mediaType: "photo",
        title:"Select Image",
        maxWidth:2000,
        maxHeiht:2000,
        quality:0.8,
       
    }

    const handleSelectPhoto = async () => {
        // Pedir permiso
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (status === "granted") {
          const result = await ImagePicker.launchImageLibraryAsync({...options, multiple:true});
    
          if (!result.canceled) {
            console.log(result.assets);
            setImage(result.assets[0].uri)
          }
        } else {
          Alert.alert("Permission Denied", "Please grant permission to access the gallery.");
        }
      };
        

    return (
        <View style={styles.footer}>
            {imageSelected !== "" ? <Image
                    style={styles.Image}
                    source={{
                        uri: imageSelected
                    }}
                /> :
            <IconPhoto onPress={handleSelectPhoto} size={50} name="photo" />
            }

            
        </View>
    )
}

const styles = StyleSheet.create({
    footer : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "35%",
    },
    camera:{
        flex:1,
        borderRadius:20
    },
    Image: {
        width:200,
        height:200    
    }
})