import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux';
import { store } from './store/store';
import ValidRouter from './validRouter';
import { useUserSlice } from './hooks/useUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from './utils/AsyncStorage';
import { useEffect } from 'react';

export default function App() {




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
