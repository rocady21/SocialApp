import { createSlice } from "@reduxjs/toolkit";


const ChatSlice = createSlice({
    name:"ChatSlice",
    initialState:{
        messages:[],
        contactsChat:[],
        selectedChat:false
    },
    reducers:{
        onLoadContactsMessage:(state,{payload})=> {
            // aca si no tiene foto le pongo una random
            const data_filtrada = payload.map((contact)=> {
                if(contact.photo === "" || contact.photo === "vacio") {
                    contact.photo = "https://image.emojipng.com/346/10131346.jpg"

                    return contact
                }

                return contact
            })
            state.contactsChat = data_filtrada
        },
        onSelectedChat:(state,{payload})=> {
            state.selectedChat = payload
        }
    }
})


export const {onLoadContactsMessage,onSelectedChat} = ChatSlice.actions

export default ChatSlice