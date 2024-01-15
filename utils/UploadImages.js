import * as Permissions from "expo-permissions"
import * as ImgePicker from "expo-image-picker"
import {Alert} from "react-native"


// funcion para importar imagenes desde galeria
export const UploadImagesFromGallery = async (array)=> {
    const response = {status:false,image:null}
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
    if( resultPermissions.status === "denied") {
        Alert.alert("Debes de darle permiso para acceder a las imagenes")
        return response
    }
    const result = await ImgePicker.launchImageLibraryAsync({
        allowsEditing:true,
        aspect:array
    })
    if(result.canceled) {
        return response
    }
    response.status = true
    response.image = result.uri
    return response
}