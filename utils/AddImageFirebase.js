import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from "../services/UploadImages_Firebase";
import { getFileNameFromUrl } from "./getPathURL";

export const sendPhotos = async(image)=> {
    const img_name = getFileNameFromUrl(image)
    // formateo el nombre para que no sea tan grande el nombre del archivo 
    const storageRef = ref(storage,`Posts_images/${img_name}`)
    const response = await fetch(image)
    const blob = await response.blob()

    // espesifico que tipo de archivo sera
    const contentType = 'image/jpeg'
    const uploadTask = uploadBytes(storageRef, blob,{contentType})
        .then((snapshot) => {
        console.log('Imagen cargada correctamente');
    }).catch((error)=> {
        console.log(error);
    })

    await uploadTask
    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl
}