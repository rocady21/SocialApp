import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat } from "../store/slices/ChatSlice"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat} = useSelector((state)=> state.chat)
    
    const LoadContactsMessage = async(userID) => {
        try {
            const {data} = await axios.get("https://3307-2800-a4-1332-4500-c99f-7e2f-897e-4cad.ngrok-free.app/api/chats/" + userID)
                       
            if(data.ok === true) {
                Dispach(onLoadContactsMessage(data.Chats))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const SeleccionarChat =(valor)=> {
        console.log(valor);
        Dispach(onSelectedChat(valor))
    }
    
    return {
        contactsChat,
        messages,
        selectedChat,
        LoadContactsMessage,
        SeleccionarChat
    }
}