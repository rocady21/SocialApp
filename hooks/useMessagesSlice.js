import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { onLoadContactsMessage,onSelectedChat,onLoadChats,onResetStateChat,onClearMessages,onOrderContacts,onNoMoreContacts,onResetContacts,onHandleMessage_recive,onReadMessage_ok,onNoReadMessages,onLoadFirstsMessages,onNoMoreMessages,onResetNoMoreContacts,onDeleteMessage,onLoadingMessages,onDeleteChat,onAddMessageRealTIme,onResetNoMoreMessages, onLoadingChats,onLoadedMessages, onNoChats,onfilterContactsChats } from "../store/slices/ChatSlice"
import { getStorage } from "../utils/AsyncStorage"
import {BACKEND_URL} from "@env"
import { useUserSlice } from "./useUserSlice"

export const useMessageSlice = ()=> {

    const Dispach = useDispatch()
    const {contactsChat,messages,selectedChat,No_read_message,stateChats,searchContact,NoMoreMessages,statusLoadingMessages,NoMoreContacts,followers_or_followings,load_info_followers
        } = useSelector((state)=> state.chat)
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
            const {data} = await axios.post("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/chats/" + userID,data_format)

            if(data.ok === true) {
                Dispach(onLoadContactsMessage(data.Chats))
            } else if(data.ok === false) {
                // este caso es cuando no tiene ningun chat
                Dispach(onNoMoreContacts())
            }
        } catch (error) {

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
            const {data} = await axios.post("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/messages/send",info)
            console.log("ddd",data);
            if(data.ok === true) {
                return {ok:true,dataF:data.data}
            }
        } catch (error) {
            
        }
    }

    const Order_contacts = ()=> {
        Dispach(onOrderContacts())
    }
    
    const loadMessageFromUser = async(id_chat,index,number_of_messages,firstMessages)=> {
        Dispach(onLoadingMessages())
        try {
            const tk = await getStorage("token")
            const {data} = await axios.post("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/messages/" + id_chat,
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
    const SendMessage = async(msg,id_from,id_to,chat_id)=> {
        const fromat_send = {
            mensaje:msg,
            id_from,
            id_to
        }
        try {
            const {data} = await axios.post("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/messages/send",fromat_send)
            if(data.ok) {
                Dispach(onAddMessageRealTIme({
                    newMessage:data.msg_send,
                    id_me: user.id,
                    socket:"no-socket",
                    chat_id:chat_id
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
            const {data} = await axios.delete("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/messages/" + id_message)
            console.log(data);
            if(data.ok === true) {
                Dispach(onDeleteMessage({id_message,day}))

                return true
            }
        } catch (error) {
            console.log(error);
            return false    
        }
    }
    
    const DeleteChat = async(id_chat)=> {
        try {
            const {data} = await axios.delete(`https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/chats/${id_chat}`)
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

    const HandleMessage_recive = (contact,id_me)=> {
        Dispach(onHandleMessage_recive({new_contact:contact,id_me:id_me}))
    }

    const message_read = async (id_chat)=> {
        try {
            const {data} = await axios.get("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/show_message/" + id_chat)

            if(data.ok === true) {
                Dispach(onReadMessage_ok(id_chat))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const messages_no_read = (id)=> {
        Dispach(onNoReadMessages(id))
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
        followers_or_followings,
        load_info_followers,
        No_read_message,
        LoadContactsMessage,
        Order_contacts,
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
        ResetNoMoreContacts,
        HandleMessage_recive,
        message_read,
        messages_no_read
        
    }
}