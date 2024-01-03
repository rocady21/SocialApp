import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats,onClearMessages,onAddMessageRealTIme } from "../store/slices/ChatSlice"
import { getStorage } from "../utils/AsyncStorage"
import {BACKEND_URL} from "@env"
import { useUserSlice } from "./useUserSlice"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat} = useSelector((state)=> state.chat)
    const {user} = useUserSlice()
    
    const LoadContactsMessage = async(userID) => {
        try {
            const {data} = await axios.get("https://7f0b-2800-a4-130a-3600-9437-e26a-1cf1-f0d6.ngrok-free.app/api/chats/" + userID)
                       
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
            const {data} = await axios.get("https://7f0b-2800-a4-130a-3600-9437-e26a-1cf1-f0d6.ngrok-free.app/api/messages/" + id_chat,{
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
            const {data} = await axios.post("https://7f0b-2800-a4-130a-3600-9437-e26a-1cf1-f0d6.ngrok-free.app/api/messages/send",fromat_send)
            if(data.ok) {
                Dispach(onAddMessageRealTIme({
                    newMessage:data.msg_send,
                    id_me: user.id,
                    socket:"no-socket"
                }))
            }
        } catch (error) {
            console.log(error);
        }
    }    
    const ClearMessages = ()=> {
        Dispach(onClearMessages())
    }
    const onAddMessageRealTImeSocekt = (newMsg)=> {
        try {
            Dispach(onAddMessageRealTIme({
                newMessage:newMsg,
                id_me: user.id,
                socket:"socket"
            }))
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
        SendMessage,
        ClearMessages,
        onAddMessageRealTImeSocekt
        
    }
}