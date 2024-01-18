
import { getStorage, ref } from "firebase/storage";

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBijvOND14GVURCSkgbchdjB74oriHGWL4",
  authDomain: "social-e86df.firebaseapp.com",
  projectId: "social-e86df",
  storageBucket: "social-e86df.appspot.com",
  messagingSenderId: "265652238840",
  appId: "1:265652238840:web:4598b912c6d15e9839fe0d",
  measurementId: "G-MKSVRWZ5XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)






