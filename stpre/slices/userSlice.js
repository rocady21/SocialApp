import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "message",
  initialState: {
    message: "XD",
    user: {},
    userStatus:"no-user",
    messageError:""
  },
  reducers: {
    setMessage: (state,{payload})=> {
      state.message = payload
    },
    addNewUser: (state,{payload})=> {
      state.user = payload.user,
      state.userStatus ="user"
    },
    credentialsError:(state,{paylaod})=> {
      state.messageError = payload
    },
    onExistUser:(state,{payload})=> {
      state.user = {},
      state.userStatus = "no-user"

    }
  }
})

export const { setMessage,credentialsError,addNewUser,onExistUser } = userSlice.actions
export default userSlice