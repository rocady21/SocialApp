import { createSlice } from "@reduxjs/toolkit";


const PostSlice = createSlice({
    name: "PostSlice",
    initialState: {
        postsUser: [],
        loadPosts: false,
        selectedPost:{}
    },
    reducers: {
        onLoadPostUser: (state, { payload }) => {
            state.postsUser = payload
            state.loadPosts = true
        },
        onAddSelectedPost:(state,{payload})=>{
            state.selectedPost = payload
        },
        onQuitSelectedPost:(state,{payload})=> {
            state.selectedPost = {}
        },
        onClearPostUsers: (state, { payload }) => {
            state.postsUser = []
            state.loadPosts = false
        },
        onAddOrQUitLike: (state, { payload }) => {
            const { data, action, user_info } = payload
            if (action == "add") {
                const updatePost = state.postsUser.map((post) => {
                    if (data.id_post === post.id) {
                        const objReturn = {
                            ...post,
                            likes: post.likes + 1,
                            info_likes: [...post.info_likes, user_info]
                        }
                        state.selectedPost = objReturn
                        return objReturn
                    } else {
                        return post
                    }
                })
                state.postsUser = updatePost


            } else if (action == "quit") {
                const updatePost = state.postsUser.map((post) => {
                    if (data.id_post === post.id) {

                        const quitLikes = post.info_likes.map((like) => {
                            return like.id !== data.id_user
                        })
                        const objReturn = {
                            ...post,
                            likes: post.likes - 1,
                            info_likes: quitLikes[0] == false? [] : quitLikes
                        }
                        state.selectedPost = objReturn
                        return objReturn
                    }
                    return post
                })
                state.postsUser = updatePost
            }
        }
    }
})

export const { onLoadPostUser, onClearPostUsers, onAddOrQUitLike,onAddSelectedPost,onQuitSelectedPosts } = PostSlice.actions
export default PostSlice