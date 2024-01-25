import { ref,getStorage, uploadBytes } from "firebase/storage";
import { mistorage } from "./firebase";
import { fileToBlob } from "./helpers";


export const uploadImage = async(image, path, name) => {
  const result = { statusResponse: false, error: null, url: null }
//   const ref = firebase.storage().ref(path).child(name)
  const refstorage = ref(mistorage, `Image_Perfil/${name}`);

  const blob = await fileToBlob(image)
  const contentType = 'image/jpeg'
   try {
    const as = uploadBytes(refstorage, blob, {contentType})
      .then(()=>{console.log("funciono-img")})
      .catch((error)=>{console.log("no funca-img =>  ", error )})

  } catch (error) {
      result.error = error
  }
  return result
};