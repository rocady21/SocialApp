import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats,onClearMessages,onNoMoreMessages,onAddMessageRealTIme,onResetNoMoreMessages, onLoadingChats, onNoChats,onfilterContactsChats } from "../store/slices/ChatSlice"
import { getStorage } from "../utils/AsyncStorage"
import {BACKEND_URL} from "@env"
import { useUserSlice } from "./useUserSlice"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat,stateChats,searchContact,NoMoreMessages} = useSelector((state)=> state.chat)
    const {user,existUser} = useUserSlice()
    
    
    const LoadContactsMessage = async(userID) => {
        try {
            Dispach(onLoadingChats())
            const {data} = await axios.get("https://d4ed-2800-a4-12c0-8b00-479-2df1-75d4-ed4e.ngrok-free.app/api/chats/" + userID)
            if(data.ok === true) {
                Dispach(onLoadContactsMessage(data.Chats))
            } else if(data.ok === false) {
                // este caso es cuando no tiene ningun chat
                Dispach(onNoChats())
            }
        } catch (error) {
            console.log(error);
        }
    }

    const SeleccionarChat =(valor)=> {
        Dispach(onSelectedChat(valor))
    }

    const loadMessageFromUser = async(id_chat,index,number_of_messages)=> {
        try {
            const tk = await getStorage("token")
            const {data} = await axios.post("https://d4ed-2800-a4-12c0-8b00-479-2df1-75d4-ed4e.ngrok-free.app/api/messages/" + id_chat,
            {
                ofSett:index,
                numberOfMessages:number_of_messages
            },
            {
                headers: { "Authorization": `Bearer ${tk}` },
                
            })

            if( data.messages.length === 0) {
                Dispach(onNoMoreMessages())
            } else {
                Dispach(onLoadChats(data.messages))
            }
        } catch (error) {
            if(error.response.status == 401){
                existUser()
            }
        }
    }

    const ResetMoreMessages = ()=> {
        Dispach(onResetNoMoreMessages())
    }
    const SendMessage = async(msg,id_from,id_to)=> {

        const fromat_send = {
            mensaje:msg,
            id_from,
            id_to
        }
        try {
            const {data} = await axios.post("https://d4ed-2800-a4-12c0-8b00-479-2df1-75d4-ed4e.ngrok-free.app/api/messages/send",fromat_send)
            if(data.ok) {
                Dispach(onAddMessageRealTIme({
                    newMessage:data.msg_send,
                    id_me: user.id,
                    socket:"no-socket"
                }))
            }
        } catch (error) {
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
        }
    }
    const SearchMessage = (value)=> {
        Dispach(onfilterContactsChats(value))
    }
    
    return {
        contactsChat,
        messages,
        selectedChat,
        stateChats,
        searchContact,
        NoMoreMessages,
        LoadContactsMessage,
        SeleccionarChat,
        loadMessageFromUser,
        SendMessage,
        ClearMessages,
        onAddMessageRealTImeSocekt,
        SearchMessage,
        ResetMoreMessages
        
        
    }
}