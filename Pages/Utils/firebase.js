import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBj0_aGTrOLk_Kp4LZS2JKC1EOIpvr9qik",
  authDomain: "social-app2-13a7c.firebaseapp.com",
  projectId: "social-app2-13a7c",
  storageBucket: "social-app2-13a7c.appspot.com",
  messagingSenderId: "880671521481",
  appId: "1:880671521481:web:cabb7e992796e35286eb18",
  measurementId: "G-Z3TGFBGCMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const mistorage = getStorage(app)