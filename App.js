import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginRouter from './routes/LoginRouter';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './stpre/store';
import { useEffect } from 'react';
import { setItemStorage } from './utils/AsyncStorage';

export default function App() {
  
  
  useEffect(()=>{
    setItemStorage("token","323423234tgrmgrmms3112kfm4mmn6n30230s")
  },[])
  const token = ""
  return (
    <Provider store={store}>
      {token !== ""? <AppRouter/> : <LoginRouter/>}
    </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
