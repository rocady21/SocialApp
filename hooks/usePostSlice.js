import axios from "axios"
import { useSelector } from "react-redux"
import { onLoadPostUser,onClearPostUsers,onAddOrQUitLike,onAddSelectedPost,onQuitSelectedPosts,onLoadingPostUser,onNoPost } from "../store/slices/PostSlice"
import { useDispatch } from "react-redux"
import { useUserSlice } from "./useUserSlice"


export const usePosterSlice = ()=> {

    const Dispatch = useDispatch()
    const {postsUser,loadPosts,selectedPost,statusPosts} = useSelector((state)=> state.post)
    const {user} = useUserSlice()

    const LoadPostsUser = async(id_me)=> {

        Dispatch(onLoadingPostUser())
        try {
            const {data} = await axios.get("https://1f3d-2800-a4-12c0-5300-d866-48b9-a03c-c6cb.ngrok-free.app/api/post/user/" + id_me)
            if(data.ok === true){

                Dispatch(onLoadPostUser(data.posts))
            }else if(data.ok === false ) {
                Dispatch(onNoPost())
            }

        } catch (error) {
            console.log(error);

        }


    }
    const addLike = async(info)=> {
        try {
            const {data} = await axios.post("https://1f3d-2800-a4-12c0-5300-d866-48b9-a03c-c6cb.ngrok-free.app/api/post/like",info)
            if(data.ok === true) {
                Dispatch(onAddOrQUitLike({
                    data:info,
                    action:"add",
                    user_info:{
                        nombre:user.nombre,
                        apellido:user.apellido,
                        photo:user.photo,
                        id:user.id
                    }
                }))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const quitLike = async(info)=> {
        try {
            const {data} = await axios.delete("https://1f3d-2800-a4-12c0-5300-d866-48b9-a03c-c6cb.ngrok-free.app/api/post/like",{
                data:info
            })
            if(data.ok === true) {
                Dispatch(onAddOrQUitLike({
                    data:info,
                    action:"quit",
                    user_info:null
                }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const AddNewPost = async(info)=> {
        try {
            const {data} = await axios.post("https://1f3d-2800-a4-12c0-5300-d866-48b9-a03c-c6cb.ngrok-free.app/api/newPost",info)
            if(data.ok === true) {

                return true
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }
    
    const AddSelectedPost = (post)=> {
        Dispatch(onAddSelectedPost(post))
    }
    const QuitSelectedPosts = ()=> {
        Dispatch(onQuitSelectedPosts())
    }
    
    const ClearPostUsers = ()=> {
        Dispatch(onClearPostUsers())
    }  
    return {
        postsUser,
        loadPosts,
        selectedPost,
        statusPosts,
        LoadPostsUser,
        addLike,
        quitLike,
        AddSelectedPost,
        QuitSelectedPosts,
        AddNewPost,
        ClearPostUsers
    }

}