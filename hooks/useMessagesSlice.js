import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats,onResetStateChat,onClearMessages,onNoMoreContacts,onResetContacts,onLoadFirstsMessages,onNoMoreMessages,onResetNoMoreContacts,onDeleteMessage,onLoadingMessages,onDeleteChat,onAddMessageRealTIme,onResetNoMoreMessages, onLoadingChats,onLoadedMessages, onNoChats,onfilterContactsChats } from "../store/slices/ChatSlice"
import { getStorage } from "../utils/AsyncStorage"
import {BACKEND_URL} from "@env"
import { useUserSlice } from "./useUserSlice"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat,stateChats,searchContact,NoMoreMessages,statusLoadingMessages,NoMoreContacts} = useSelector((state)=> state.chat)
    const {user,existUser} = useUserSlice()
    
    const resetStateMessages = ()=> {
        Dispach(onResetStateChat())
    }
    const LoadContactsMessage = async(userID,index,number) => {
        const data_format = {
            index:index,
            limit:number
        }

        try {
            Dispach(onLoadingChats())
            const {data} = await axios.post("https://74a2-2800-a4-1290-5900-3453-5dab-2369-1ea8.ngrok-free.app/api/chats/" + userID,data_format)
            console.log(data);

            if(data.ok === true) {
                Dispach(onLoadContactsMessage(data.Chats))
            } else if(data.ok === false) {
                // este caso es cuando no tiene ningun chat
                Dispach(onNoMoreContacts())
            }
        } catch (error) {
            
            console.log("aaaaaaaaaaaaaaaabcbed");
            console.log(error);
        }
    }
    const ClearContacts = ()=> {
        Dispach(onResetContacts())
    }
    
    const SeleccionarChat =(valor)=> {
        Dispach(onSelectedChat(valor))
    }

    const SendFirstMessage = async(info)=> {
        try {            
            // creamos el mensaje
            const {data} = await axios.post("https://74a2-2800-a4-1290-5900-3453-5dab-2369-1ea8.ngrok-free.app/api/messages/send",info)
            if(data.ok == true) {
                return {ok:true,dataF:data.data}
            }
        } catch (error) {
            
        }
            
    }

    const loadMessageFromUser = async(id_chat,index,number_of_messages,firstMessages)=> {
        Dispach(onLoadingMessages())
        try {
            const tk = await getStorage("token")
            const {data} = await axios.post("https://74a2-2800-a4-1290-5900-3453-5dab-2369-1ea8.ngrok-free.app/api/messages/" + id_chat,
            {
                ofSett:index,
                numberOfMessages:number_of_messages
            },
            {
                headers: { "Authorization": `Bearer ${tk}` },
                
            })
            if(data.ok === true) {
                Dispach(onLoadedMessages())

                if( data.messages.length === 0) {
                    Dispach(onNoMoreMessages())
                } else {
                    Dispach(onLoadChats({data:data.messages}))
                }

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
    const ResetNoMoreContacts = ()=> {
        Dispach(onResetNoMoreContacts())
    }
    const SendMessage = async(msg,id_from,id_to)=> {
        console.log("mandare los mensajes");
        const fromat_send = {
            mensaje:msg,
            id_from,
            id_to
        }
        try {
            const {data} = await axios.post("https://74a2-2800-a4-1290-5900-3453-5dab-2369-1ea8.ngrok-free.app/api/messages/send",fromat_send)
            if(data.ok) {
                console.log("llego y se inserto");
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
            const {data} = await axios.post("https://74a2-2800-a4-1290-5900-3453-5dab-2369-1ea8.ngrok-free.app/api/messages/" + id_message)

            if(data.ok === true) {
                Dispach(onDeleteMessage({id_message,day}))
            }
        } catch (error) {
            
        }
    }

    const DeleteChat = async(id_chat)=> {
        try {
            const {data} = await axios.delete(`https://74a2-2800-a4-1290-5900-3453-5dab-2369-1ea8.ngrok-free.app/api/chats/${id_chat}`)
            if(data.ok === true) {
                Dispach(onDeleteChat(id_chat))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const LoadFirstsMessages = (messages)=> {
        Dispach(onLoadFirstsMessages(messages))
    }
    
    
    return {
        contactsChat,
        messages,
        selectedChat,
        stateChats,
        searchContact,
        NoMoreMessages,
        statusLoadingMessages,
        NoMoreContacts,
        LoadContactsMessage,
        SeleccionarChat,
        loadMessageFromUser,
        SendMessage,
        ClearMessages,
        onAddMessageRealTImeSocekt,
        SearchMessage,
        ResetMoreMessages,
        Delete_message,
        SendFirstMessage,
        DeleteChat,
        LoadFirstsMessages,
        resetStateMessages,
        ClearContacts,
        ResetNoMoreContacts
        
    }
}