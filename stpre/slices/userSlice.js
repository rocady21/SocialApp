import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "message",
  initialState: {
    message: "XD",
    user: {},
    token : "",
    messageError:""
  },
  reducers: {
    setMessage: (state,{payload})=> {
      state.message = payload
    },
    addNewUser: (state,{payload})=> {
      state.user = payload.user,
      state.token = payload.token
    },
    credentialsError:(state,{paylaod})=> {
      state.messageError = payload
    }
  }
})

export const { setMessage,credentialsError,addNewUser } = userSlice.actions
export default userSlice