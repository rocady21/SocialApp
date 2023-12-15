import { View,Text,StyleSheet,Button } from "react-native"

const Login = ({navigation})=> {


    const onPressLearnMore = () => {
        navigation.push("Register")
    }
    
    return (
        <View style={styles.container}>
            <Text>Pagina de Login</Text>  
            <Button
            onPress={onPressLearnMore}
            title="Learn More"
            accessibilityLabel="Learn more about this purple button"
            />         
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Login