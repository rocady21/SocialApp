import { createSlice } from "@reduxjs/toolkit";
import { Order_contactsF } from "../../utils/order_contacts";
import { useDispatch } from "react-redux";


const ChatSlice = createSlice({
    name: "ChatSlice",
    initialState: {
        stateChats: "no-chats",
        messages: [],
        contactsChat: [],
        selectedChat: false,
        searchContact: [],
        NoMoreMessages: "more",
        NoMoreContacts: "more",
        statusLoadingMessages: "loaded"
    },
    reducers: {
        onResetStateChat: (state) => {
            state.stateChats = "no-chats",
                state.messages = [],
                state.contactsChat = [],
                state.selectedChat = false,
                state.searchContact = [],
                state.NoMoreMessages = "more",
                state.NoMoreContacts = "more",
                state.statusLoadingMessages = "loaded"
        },
        onLoadingChats: (state, { payload }) => {
            state.stateChats = "loading"
        },
        onNoChats: (state, { payload }) => {
            state.stateChats = "no-chats"
        },
        onLoadContactsMessage: (state, { payload }) => {
            // aca si no tiene foto le pongo una random
            const data_filtrada = payload.map((contact) => {
                if (contact.photo === "" || contact.photo === "vacio") {
                    contact.photo = "https://image.emojipng.com/346/10131346.jpg"

                    return contact
                }

                return contact
            })


            state.stateChats = "chats"
            const contacts = [...state.contactsChat, ...data_filtrada]
            const order_contacts = Order_contactsF(contacts)
            state.contactsChat = order_contacts
        },
        onNoMoreMessages: (state, { payload }) => {
            state.NoMoreMessages = "no-more"
        },
        onResetNoMoreMessages: (state) => {
            state.NoMoreMessages = "more"
        },
        onSelectedChat: (state, { payload }) => {
            state.selectedChat = payload
        },
        onLoadChats: (state, { payload }) => {
            const { data } = payload
            if (state.messages[0]) {
                const old_arr = state.messages.map((msg) => {
                    const matchingDay = data.find((day) => day.day === msg.day);
                    if (matchingDay) {
                        data
                        return {
                            ...matchingDay,
                            messages: [...msg.messages, ...matchingDay.messages]
                        };
                    } else {
                        return msg;
                    }
                });
                const new_messages = data.filter((objetoPayload) =>
                    !state.messages.some((objetoMessage) => objetoMessage.day === objetoPayload.day)
                );

                if (new_messages.length > 0) {
                    const new_arr = [...new_messages, ...old_arr]

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
                    old_arr.map((mensaje) => {
                        messages_order = mensaje.messages.sort((a, b) => {
                            const dateA = new Date(a.fecha);
                            const dateB = new Date(b.fecha);

                            return dateA - dateB;
                        })

                        return messages_order
                    })
                    state.messages = old_arr
                    state.statusLoadingMessages = "loaded"
                }



            }

        },
        onClearMessages: (state) => {
            state.messages = []
        },
        onLoadingMessages: (state) => {
            state.statusLoadingMessages = "loading"
        },
        onLoadedMessages: (state) => {
            state.statusLoadingMessages = "laoded"
        },
        onAddMessageRealTIme: (state, { payload }) => {
            const now = new Date().toISOString()


            console.log("enviuare un mensaje");
            const { newMessage, id_me, socket } = payload
            if (newMessage.usuario === id_me) {
                newMessage["is_me"] = true
            } else {
                newMessage["is_me"] = false
            }
            // aqui verifico si el mensaje del socekt es mio o no, asi no lo agarro si es que lo es
            // solo traeria los menasjes del usuario que este en el mismo socket que el mio
            if (socket === "socket" && newMessage.usuario === id_me) {
                console.log("soy yopppppppppppppppppppppppppppppppppppppp");
                return
            }
            else {
                if (state.messages[0]) {
                    const state_f = state.messages.map((days) => {
                        if (days.day === "hoy") {
                            return {
                                ...days,
                                messages: [...days.messages, newMessage]
                            }
                        } else {
                            return days
                        }
                    })
                    state.messages = state_f
                    console.log("hasta aki llego");
                    const new_state = state.contactsChat.map((contact)=> {
                        if(contact.id === payload.chat_id) {
                            return {
                                ...contact,
                                time_last_message:now,
                                show_last_message:true,
                                id_user_last_message:id_me,
                                last_message:newMessage.mensaje,
                            }
                        }
                        return contact
                    })
        
                    state.contactsChat = new_state
                    


                } else {
                    state.messages = [{
                        day: "hoy",
                        messages: [newMessage]
                    }]
                }

            }

        },
        onfilterContactsChats: (state, { payload }) => {

            const valueSearch = payload.toLowerCase()

            searchContacts = state.contactsChat.map((contacts) => {
                nombreLower = contacts.nombre_user.toLowerCase()

                if (nombreLower.includes(valueSearch)) {
                    return contacts
                }

            })

            state.searchContact = searchContacts
        },
        onDeleteMessage: (state, { payload }) => {

        },
        onDeleteChat: (state, { payload }) => {
            state.contactsChat = state.contactsChat.filter((contact) => {
                return contact.id !== payload
            })
        },
        onLoadFirstsMessages: (state, { payload }) => {
            state.messages = payload
        },
        onResetContacts: (state) => {
            state.contactsChat = []
        },
        onNoMoreContacts: (state, { payload }) => {
            state.NoMoreContacts = "no-more"
        },
        onResetNoMoreContacts: (state) => {
            state.NoMoreContacts = "more"
        },
        onHandleMessage_recive: (state, { payload }) => {

            const {new_contact,id_me} = payload

            if(new_contact.id_user_last_message !== id_me) {
                const filter_contact = state.contactsChat.find((contact) => {
                    return contact.id === new_contact.id
                })
                if (filter_contact) {
    
                    const new_state = state.contactsChat.map((contact) => {
                        if (contact.id === new_contact.id) {
                            // aqui fucionaremos los mensajes
                            // validaremos si el dia existe en el arr
                            const existingDayIndex = contact.firsts_messages.findIndex(cnt => cnt.day === new_contact.firsts_messages.day);
                                if (existingDayIndex !== -1) {
                                    // Si ya existe un día con el mismo día, fusionamos los mensajes
                                    const existingDay = contact.firsts_messages[existingDayIndex];
                                    const mergedMessages = [...existingDay.messages,new_contact.firsts_messages.messages];
                                    const sortedMessages = mergedMessages.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                                    
                                    // Actualizamos los mensajes del día existente en el arreglo firsts_messages
                                    const updatedFirstMessages = [...contact.firsts_messages];
                                    updatedFirstMessages[existingDayIndex] = {
                                        ...existingDay,
                                        messages: sortedMessages
                                    };
                        
                                    return {
                                        ...new_contact,
                                        firsts_messages: updatedFirstMessages
                                    };
                                } else {
                                    // creamos el dia 
                                    const new_day = {
                                        day: new_contact.firsts_messages.day,
                                        messages: new_contact.firsts_messages.messages
                                    }
                                    return {
                                        ...new_contact,
                                        firsts_messages:[...contact.firsts_messages,new_day]
                                    }
                                }
                        } else {
                            return contact
                        }
                    })
    
    
    
                    const order_contacts = Order_contactsF(new_state)
                    
                    
                    state.contactsChat = order_contacts
    
                } else {
    
    
                    const contacts = [...state.contactsChat, new_contact]
                    const order_contacts = Order_contactsF(contacts)
                    state.contactsChat = order_contacts
                }
            }
            

        },
        onOrderContacts:(state)=> {
            const order_contacts = state.contactsChat.sort((a,b)=> {
                const fecha_a = new Date(a.time_last_message)
                const fecha_b = new Date(b.time_last_message)

                return fecha_b - fecha_a;
                
            })
            state.contactsChat = order_contacts
        },
        onMessage:(state)=> {
            console.log("jaja buenas bueans");
        },
        onReadMessage_ok:(state,{payload})=> {
            const new_state = state.contactsChat.map((contact)=> {
                if(contact.id === payload) {
                    return {
                        ...contact,
                        show_last_message:true,
                    }
                }
                return contact
            })

            state.contactsChat = new_state
        }
        
    }
})


export const { onLoadContactsMessage,onReadMessage_ok, onSelectedChat, onResetContacts,onMessage, onDeleteChat,onOrderContacts, onNoMoreContacts, onHandleMessage_recive, onLoadChats, onResetNoMoreContacts, onResetStateChat, onClearMessages, onNoMoreMessages, onLoadFirstsMessages, onLoadedMessages, onResetNoMoreMessages, onAddMessageRealTIme, onLoadingChats, onNoChats, onfilterContactsChats, onLoadingMessages } = ChatSlice.actions

export default ChatSlice