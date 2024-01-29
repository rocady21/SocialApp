import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats,onClearMessages,onNoMoreMessages,onDeleteMessage,onAddMessageRealTIme,onResetNoMoreMessages, onLoadingChats, onNoChats,onfilterContactsChats } from "../store/slices/ChatSlice"
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
            const {data} = await axios.get("https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/chats/" + userID)
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
            const {data} = await axios.post("https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/messages/" + id_chat,
            {
                ofSett:index,
                numberOfMessages:number_of_messages
            },
            {
                headers: { "Authorization": `Bearer ${tk}` },
                
            })
            console.log(data);
            if( data.messages.length === 0) {
                Dispach(onNoMoreMessages())
            } else {
                Dispach(onLoadChats(data.messages))
            }
        } catch (error) {
            if(error.response.status == 401){
                existUser()
                Dispach(onClearMessages())
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
            const {data} = await axios.post("https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/messages/send",fromat_send)
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

    const Delete_message = async (id_message,day)=> {
        try {
            const {data} = await axios.post("https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/messages/" + id_message)

            if(data.ok === true) {
                Dispach(onDeleteMessage({id_message,day}))
            }
        } catch (error) {
            
        }
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
        ResetMoreMessages,
        Delete_message
        
        
    }
}