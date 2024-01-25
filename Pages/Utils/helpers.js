import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {Alert} from 'react-native'


export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}



export const loadImageFromGallery = async (array) => {
  const response = { status: false, image: null };

  const resultPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (resultPermissions.status === "denied") {
    Alert.alert("Debes dar permisos para acceder a las imágenes del teléfono.");
    return response;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: array,
  });

  if (result.canceled) {
    return response;
  }

  response.status = true;
  response.image = result.assets ? result.assets[0] : result.uri;
  return response;
};



export const fileToBlob = async(path) => {
  const file = await fetch(path)
  const blob = await file.blob()
  return blob
}



// export const uploadImage = async(image, path, name) => {
//   const result = { statusResponse: false, error: null, url: null }
//   const ref = firebase.storage().ref(path).child(name)
//   const blob = await fileToBlob(image)

//   try {
//       await ref.put(blob)
//       const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
//       result.statusResponse = true
//       result.url = url
//   } catch (error) {
//       result.error = error
//   }
//   return result
// };