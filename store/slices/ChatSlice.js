import { createSlice } from "@reduxjs/toolkit";


const ChatSlice = createSlice({
    name:"ChatSlice",
    initialState:{
        stateChats:"no-chats",
        messages:[],
        contactsChat:[],
        selectedChat:false,
        searchContact:[],
        NoMoreMessages:"more"
    },
    reducers:{
        onLoadingChats:(state,{payload})=> {
            state.stateChats = "loading"
        },
        onNoChats:(state,{payload})=> {
            state.stateChats = "no-chats"
        },
        onLoadContactsMessage:(state,{payload})=> {
            // aca si no tiene foto le pongo una random
            const data_filtrada = payload.map((contact)=> {
                if(contact.photo === "" || contact.photo === "vacio") {
                    contact.photo = "https://image.emojipng.com/346/10131346.jpg"

                    return contact
                }

                return contact
            })
            state.stateChats = "chats"
            state.contactsChat = data_filtrada
        },
        onNoMoreMessages:(state,{payload})=> {
            state.NoMoreMessages = "no-more"
        },
        onResetNoMoreMessages:(state)=> {
            state.NoMoreMessages = "more"
        },
        onSelectedChat:(state,{payload})=> {
            state.selectedChat = payload
        },
        onLoadChats:(state,{payload})=> {

            if(state.messages[0]) {
                state.messages = [...state.messages,...payload]
            } else {
                state.messages = payload
            }

            const order_messages = state.messages.sort((a,b)=> a.id - b.id)

            state.messages = order_messages
        },
        onClearMessages:(state)=> {
            state.messages = []
        },
        onAddMessageRealTIme:(state,{payload})=> {

            console.log(payload);
            const {newMessage,id_me,socket} = payload
                if (newMessage.usuario === id_me) {
                    newMessage["is_me"] = true
                } else {
                    newMessage["is_me"] = false
                }
            
            // aqui verifico si el mensaje del socekt es mio o no, asi no lo agarro si es que lo es
            // solo traeria los menasjes del usuario que este en el mismo socket que el mio
            if(socket === "socket" && newMessage.usuario === id_me ) {
                return
            }
            else {
                state.messages = [...state.messages,newMessage]
            }

        },
        onfilterContactsChats:(state,{payload})=> {

            const valueSearch = payload.toLowerCase()

            searchContacts = state.contactsChat.map((contacts)=> {
                nombreLower = contacts.nombre_user.toLowerCase()

                if( nombreLower.includes(valueSearch)) {
                    return contacts
                }

            })

            state.searchContact = searchContacts
        }
    }
})


export const {onLoadContactsMessage,onSelectedChat,onLoadChats,onClearMessages,onNoMoreMessages,onResetNoMoreMessages,onAddMessageRealTIme,onLoadingChats,onNoChats,onfilterContactsChats} = ChatSlice.actions

export default ChatSlice