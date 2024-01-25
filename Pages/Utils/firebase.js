import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAiAWdpahYaS12tKlQ48tdBK6DyhPCPrsQ",
  authDomain: "social-app-51a74.firebaseapp.com",
  projectId: "social-app-51a74",
  storageBucket: "social-app-51a74.appspot.com",
  messagingSenderId: "892849062065",
  appId: "1:892849062065:web:f0a00d3ba7e530da616290",
  measurementId: "G-2310J8EQSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const mistorage = getStorage(app)