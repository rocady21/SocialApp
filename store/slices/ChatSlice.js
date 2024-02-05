import { createSlice } from "@reduxjs/toolkit";


const ChatSlice = createSlice({
    name:"ChatSlice",
    initialState:{
        stateChats:"no-chats",
        messages:[],
        contactsChat:[],
        selectedChat:false,
        searchContact:[],
        NoMoreMessages:"more",
        statusLoadingMessages:"loaded"
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
            const order_contacy = data_filtrada.sort((a,b)=> {
                aID = a.id,
                bID = b.id

                return bID - aID
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
                const old_arr = state.messages.map((msg) => {
                    const matchingDay = payload.find((day) => day.day === msg.day);
                    if (matchingDay) {
                        return {
                            ...matchingDay,
                            messages: [...msg.messages, ...matchingDay.messages]
                        };
                    } else {
                        return msg;
                    }
                });
                const new_messages = payload.filter((objetoPayload) => 
                !state.messages.some((objetoMessage) => objetoMessage.day === objetoPayload.day)
                );
                
                console.log("old",old_arr);
                console.log("new",new_messages);
                if(new_messages.length > 0) {
                    const new_arr = [...new_messages, ...old_arr]
                    console.log("new_arr",new_arr);

                    let order_messages = new_arr.map((mensaje) => {
                    
                        // Asegurarse de que 'mensaje.messages' exista y sea un array antes de realizar operaciones
                        const messages_order = Array.isArray(mensaje.messages)
                          ? mensaje.messages.sort((a, b) => {
                              const dateA = new Date(a.fecha);
                              const dateB = new Date(b.fecha);
                    
                              return dateA - dateB;
                            })
                          : [];
                    
                        return { ...mensaje, messages: messages_order };
                      });
                    
                      state.statusLoadingMessages = "loaded"
                      state.messages = order_messages
                } else {
                    console.log("debo de actualizar los viejos");

                    old_arr.map((mensaje)=> {
                        messages_order = mensaje.messages.sort((a,b)=> {
                            const dateA = new Date(a.fecha);
                            const dateB = new Date(b.fecha);
                        
                            return dateA - dateB;
                        })
        
                        return messages_order
                    })
                    state.messages = old_arr
                    state.statusLoadingMessages = "loaded"
                }
                

            
            } else {
                console.log(payload);
                state.messages = payload
                state.statusLoadingMessages = "loaded"
            }

            


        },
        onClearMessages:(state)=> {
            state.messages = []
        },
        onLoadingMessages:(state)=> {
            state.statusLoadingMessages = "loading"
        },
        onLoadedMessages:(state)=> {
            state.statusLoadingMessages = "laoded"
        },
        onAddMessageRealTIme:(state,{payload})=> {

            const {newMessage,id_me,socket} = payload
                if (newMessage.usuario === id_me) {
                    newMessage["is_me"] = true
                } else {
                    newMessage["is_me"] = false
                }
            
            console.log(newMessage);
            // aqui verifico si el mensaje del socekt es mio o no, asi no lo agarro si es que lo es
            // solo traeria los menasjes del usuario que este en el mismo socket que el mio
            if(socket === "socket" && newMessage.usuario === id_me ) {
                return
            }
            else {
                if( state.messages[0]) {
                    const state_f = state.messages.map((days)=> {
                        if(days.day === "hoy") {
                            console.log("es hoy");
                            return {
                                ...days,
                                messages:[...days.messages,newMessage]
                            }
                        } else {
                            return days
                        }
                    })
                    state.messages = state_f

                } else {
                    console.log("insertare uno nuevo xd");
                    state.messages = [{
                        day:"hoy",
                        messages:[newMessage]
                    }]
                }
 
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
        },
        onDeleteMessage:(state,{payload})=> {
            
        },
        onDeleteChat:(state,{payload})=> {
            state.contactsChat = state.contactsChat.filter((contact)=> {
                return contact.id !== payload
            })
        }
    }
})


export const {onLoadContactsMessage,onSelectedChat,onDeleteChat,onLoadChats,onClearMessages,onNoMoreMessages,onLoadedMessages,onResetNoMoreMessages,onAddMessageRealTIme,onLoadingChats,onNoChats,onfilterContactsChats,onLoadingMessages} = ChatSlice.actions

export default ChatSlice