import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';



const Stack = createNativeStackNavigator();

export default function LoginRouter() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown:false
      }
      } initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}