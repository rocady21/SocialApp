import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats } from "../store/slices/ChatSlice"
import { getStorage } from "../utils/AsyncStorage"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat} = useSelector((state)=> state.chat)
    
    const LoadContactsMessage = async(userID) => {
        try {
            const {data} = await axios.get("https://67ce-2800-a4-1334-ce00-b047-f20c-6674-8f41.ngrok-free.app/api/chats/" + userID)
                       
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

    const loadMessageFromUser = async(id_chat)=> {
        try {
            const tk = await getStorage("token")
            const {data} = await axios.get("https://67ce-2800-a4-1334-ce00-b047-f20c-6674-8f41.ngrok-free.app/api/messages/" + id_chat,{
                headers: { "Authorization": `Bearer ${tk}` }
            })
            Dispach(onLoadChats(data.messages))
        } catch (error) {
            console.log(error);
        }
    }

    const SendMessage = (data)=> {
        try {
            const {data} = axios.post("https://67ce-2800-a4-1334-ce00-b047-f20c-6674-8f41.ngrok-free.app/api/messages/send",data)
        } catch (error) {
            console.log(error);
        }
    }    
    return {
        contactsChat,
        messages,
        selectedChat,
        LoadContactsMessage,
        SeleccionarChat,
        loadMessageFromUser,
        SendMessage
    }
}