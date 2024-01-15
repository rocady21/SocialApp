import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats,onClearMessages,onAddMessageRealTIme, onLoadingChats, onNoChats } from "../store/slices/ChatSlice"
import { getStorage } from "../utils/AsyncStorage"
import {BACKEND_URL} from "@env"
import { useUserSlice } from "./useUserSlice"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat,stateChats} = useSelector((state)=> state.chat)
    const {user} = useUserSlice()
    
    const LoadContactsMessage = async(userID) => {
        try {
            Dispach(onLoadingChats())
            const {data} = await axios.get("https://a716-2800-a4-1323-9600-7d5c-52fc-18bc-82a3.ngrok-free.app/api/chats/" + userID)
            console.log(data);
            if(data.ok === true) {
                Dispach(onLoadContactsMessage(data.Chats))
            } else if(data.ok === false) {
                console.log("no hay");
                // este caso es cuando no tiene ningun chat
                Dispach(onNoChats())
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
            const {data} = await axios.get("https://a716-2800-a4-1323-9600-7d5c-52fc-18bc-82a3.ngrok-free.app/api/messages/" + id_chat,{
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
            const {data} = await axios.post("https://a716-2800-a4-1323-9600-7d5c-52fc-18bc-82a3.ngrok-free.app/api/messages/send",fromat_send)
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
        stateChats,
        LoadContactsMessage,
        SeleccionarChat,
        loadMessageFromUser,
        SendMessage,
        ClearMessages,
        onAddMessageRealTImeSocekt
        
    }
}