import { ref, uploadBytes, getDownloadURL   } from "firebase/storage";
import { mistorage } from "./firebase";
import { fileToBlob } from "./helpers";

export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };
  const refstorage = ref(mistorage, `image_prueba/${name}`);

  try {
    const blob = await fileToBlob(image);
    const contentType = 'image/png';

    await uploadBytes(refstorage, blob, { contentType });

    const starsRef = ref(mistorage, `image_prueba/${name}`);
    console.log("este es el starsRef => ", starsRef)
    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        console.log("descargado exitoso => url: ", url)
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist 
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
    const url = await getDownloadURL(refstorage);
    result.url = url;

    result.statusResponse = true;
      console.log("restult =>", result)
  } catch (error) {
    console.log("no funca-img => ", error);
    result.error = error;
  }

  return result;
};

// export const updateProfile = async(data) => {
//   const result = { statusResponse: true, error: null }
//   try {
     
//   } catch (error) {
//       result.statusResponse = false
//       result.error = error
//   }
//   return result     
// }
