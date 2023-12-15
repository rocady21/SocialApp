import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/App/Home';

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}