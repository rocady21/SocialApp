import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats,onClearMessages } from "../store/slices/ChatSlice"
import { getStorage } from "../utils/AsyncStorage"
import {BACKEND_URL} from "@env"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat} = useSelector((state)=> state.chat)
    
    const LoadContactsMessage = async(userID) => {
        try {
            const {data} = await axios.get(BACKEND_URL + "/api/chats/" + userID)
                       
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
            const {data} = await axios.get(BACKEND_URL + "/api/messages/" + id_chat,{
                headers: { "Authorization": `Bearer ${tk}` }
            })
            Dispach(onLoadChats(data.messages))
        } catch (error) {
            console.log(error);
        }
    }

    const SendMessage = async(msg,id_from,id_to)=> {

        const fromat_send = {
            mensaje:msg,
            id_from,
            id_to
        }
        try {
            const {data} = await axios.post(BACKEND_URL + "/api/messages/send",fromat_send)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }    
    const ClearMessages = ()=> {
        Dispach(onClearMessages())
    }
    return {
        contactsChat,
        messages,
        selectedChat,
        LoadContactsMessage,
        SeleccionarChat,
        loadMessageFromUser,
        SendMessage,
        ClearMessages
    }
}