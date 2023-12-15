import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginRouter from './routes/LoginRouter';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './stpre/store';

export default function App() {
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
