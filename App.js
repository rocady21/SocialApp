import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux';
import { store } from './store/store';
import ValidRouter from './validRouter';
import {useState } from 'react';



export default function App() {
  const [socket, setSocket] = useState(null);


  
  return (
    <Provider store={store}>
       <ValidRouter/>
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



