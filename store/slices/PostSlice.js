import { createSlice } from "@reduxjs/toolkit";


const PostSlice = createSlice({
    name:"PostSlice",
    initialState:{
        postsUser:[],
        loadPosts: false
    },
    reducers:{
        onLoadPostUser:(state,{payload})=> {
            state.postsUser= payload
            state.loadPosts = true
        },
        onClearPostUsers:(state,{payload})=> {
            state.postsUser= []
            state.loadPosts = false
        }
    }
})

export const {onLoadPostUser,onClearPostUsers} = PostSlice.actions
export default PostSlice