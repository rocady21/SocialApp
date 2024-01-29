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
    searchUsers:[],
    friend_requests:[],
    StatusLoadingFriend_requests:"loading"
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
    },
    onFriend_Request:(state,{payload})=> {
      state.StatusLoadingFriend_requests = "exist"
      state.friend_requests = payload
    },
    onNoFriend_Request:(state)=> {
      state.StatusLoadingFriend_requests = "no-exist"

    },
  }
})

export const { setMessage,credentialsError,addNewUser,onFriend_Request,onNoFriend_Request,onExistUser,onLoadingSearch,onSearchResults,onNoResults,onPreviewState,onLoadUser_info,onClearUser_info } = userSlice.actions
export default userSlice