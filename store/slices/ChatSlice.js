import { createSlice } from "@reduxjs/toolkit";


const ChatSlice = createSlice({
    name:"ChatSlice",
    initialState:{
        stateChats:"no-chats",
        messages:[],
        contactsChat:[],
        selectedChat:false
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
        onSelectedChat:(state,{payload})=> {
            state.selectedChat = payload
        },
        onLoadChats:(state,{payload})=> {
            state.messages = payload
        },
        onClearMessages:(state)=> {
            state.messages = []
        },
        onAddMessageRealTIme:(state,{payload})=> {

            console.log("state");
            console.log(payload);
            const {newMessage,id_me,socket} = payload
                if (newMessage.usuario === id_me) {
                    newMessage["is_me"] = true
                    console.log("soy yo");
                } else {
                    newMessage["is_me"] = false
                    console.log("no soy yo");
                }
            
            // aqui verifico si el mensaje del socekt es mio o no, asi no lo agarro si es que lo es
            // solo traeria los menasjes del usuario que este en el mismo socket que el mio
            if(socket === "socket" && newMessage.usuario === id_me ) {
                return
            }
            else {
                state.messages = [...state.messages,newMessage]
            }

        } 
    }
})


export const {onLoadContactsMessage,onSelectedChat,onLoadChats,onClearMessages,onAddMessageRealTIme,onLoadingChats,onNoChats} = ChatSlice.actions

export default ChatSlice