import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    message: "",
    user: {},
    user_profile:{},
    userStatus:"no-user",
    messageError:"",
    statusSearch:"preview",
    searchUsers:[]
  },
  reducers: {
    setMessage: (state,{payload})=> {
      state.message = payload
    },
    addNewUser: (state,{payload})=> {
      state.user = payload,
      state.userStatus ="user"
    },
    credentialsError:(state,{payload})=> {
      state.messageError = payload
    },
    onExistUser:(state)=> {
      state.user = {},
      state.userStatus = "no-user"

    },
    onLoadingSearch:(state)=> {
      state.statusSearch == "loading"
    },
    onSearchResults: (state,{payload})=> {
      state.statusSearch = "loaded",
      state.searchUsers = payload
    },
    onNoResults:(state)=> {
      state.statusSearch = "no-results"
    },
    onPreviewState:(state)=> {
      state.statusSearch = "preview",
      state.searchUsers = []
    },
    onLoadUser_info:(state,{payload})=> {
      state.user_profile = payload
    },
    onClearUser_info:(state,{payload})=> {
      state.user_profile = {}
    }
  }
})

export const { setMessage,credentialsError,addNewUser,onExistUser,onLoadingSearch,onSearchResults,onNoResults,onPreviewState,onLoadUser_info,onClearUser_info } = userSlice.actions
export default userSlice