import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/App/Home';
import { View,StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import Messages from '../Pages/App/Messages';
import Profile from '../Pages/App/Profile';
import Search from '../Pages/App/Search';
import Questions from '../Pages/App/Questions';

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  console.log("A");
  return (
    <View style={styles.padre}>
    <NavigationContainer >
        <Stack.Navigator screenOptions={{
        headerShown:false
      }} initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Questions" component={Questions} />
        </Stack.Navigator>
      <Footer/>
    </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    marginTop:20,
    flex:1,
    width:"100%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"
  }
})