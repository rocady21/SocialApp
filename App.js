import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginRouter from './routes/LoginRouter';
import AppRouter from './routes/AppRouter';

export default function App() {
  const token = ""
  return (
    token !== ""? <AppRouter/> : <LoginRouter/>
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
