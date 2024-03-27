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
    StatusLoadingFriend_requests:"loading",
    followers_or_followings:[],
    load_info_followers:false
  },
  reducers: {
    onResetUserState:(state)=> {
      state.message= "",
      state.user= {},
      state.user_profile={},
      state.userStatus="no-user",
      state.messageError="",
      state.statusSearch="preview",
      state.searchUsers=[],
      state.friend_requests=[],
      state.StatusLoadingFriend_requests="loadingstate."
    },
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
      console.log("payload");

      console.log(payload);
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
    onRejectFriendRequest:(state,{payload})=> {
      const newState = state.friend_requests.map((people)=> {
        if(people.id !== payload) {
          return people
        }
      })
      if(!newState[0]) {
        state.StatusLoadingFriend_requests = "no-exist"
        state.user.exist_friend_request = false
      }

      state.friend_requests = newState
      

    },
    onAcceptFriendRequest:(state,{payload})=> {
      const newState = state.friend_requests.map((people)=> {
        if(people.id !== payload) {
          return people
        }
      })
      if(!newState[0]) {
        state.StatusLoadingFriend_requests = "no-exist"
        state.user.exist_friend_request = false
      }
      
      state.friend_requests = newState

      state.user = {
        ...state.user,
        seguidores: state.user.seguidores + 1
      }
      
    },
    onFollow:(state)=> {
      state.user_profile = {
        ...state.user_profile,
        isFollower: "Pendiente"
      }
    },
    onUnFollow:(state)=> {
      state.user_profile = {
        ...state.user_profile,
        isFollower: false
      }
    },
    onLoadFollowersorFollowings:(state,{payload})=>{
      state.followers_or_followings = payload,
      state.load_info_followers = true
    },
    onClearState:(state)=>{
      state.followers_or_followings = [],
      state.load_info_followers = true
    },
    addBadgeUser:(state,{payload})=> {
      console.log("se llamo a slice users");
      state.user = {
        ...state.user,
        badges_user: [...state.user.badges_user, payload]
      }
    }
  },

})

export const { setMessage,credentialsError,addNewUser,addBadgeUser,onLoadFollowersorFollowings,onClearState,onFollow,onUnFollow,onFriend_Request,onNoFriend_Request,onExistUser,onLoadingSearch,onSearchResults,onResetUserState,onNoResults,onPreviewState,onLoadUser_info,onClearUser_info,onAcceptFriendRequest,onRejectFriendRequest } = userSlice.actions
export default userSlice