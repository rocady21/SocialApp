import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react";
import { View,Text,Button } from "react-native"
import { useMessageSlice } from "../../hooks/useMessagesSlice";

const MessagesPage = ({navigation})=> {


    const {SeleccionarChat} = useMessageSlice()

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
          // Detectar cuando el usuario sale de la pantalla
          SeleccionarChat(false)

          // Puedes prevenir el evento de navegación si es necesario
          // e.preventDefault(); // Descomentar si se desea prevenir la navegación
        });
    
        // Retornar una función de limpieza para eliminar el event listener cuando el componente se desmonta
        return unsubscribe;
      }, [navigation]);
    

    return (
        <View>
            <Text>Pagina de Mensajes</Text>
            <Button
            title="Chat"
            onPress={()=> navigation.navigate("Chats")}
            />   
        </View>
    )
}

export default MessagesPage