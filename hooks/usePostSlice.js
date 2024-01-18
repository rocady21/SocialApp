import axios from "axios"
import { useSelector } from "react-redux"
import { onLoadPostUser,onClearPostUsers,onAddOrQUitLike,onAddSelectedPost,onQuitSelectedPosts } from "../store/slices/PostSlice"
import { useDispatch } from "react-redux"
import { useUserSlice } from "./useUserSlice"


export const usePosterSlice = ()=> {

    const Dispatch = useDispatch()
    const {postsUser,loadPosts,selectedPost} = useSelector((state)=> state.post)
    const {user} = useUserSlice()

    const LoadPostsUser = async(id_me)=> {
        try {
            const {data} = await axios.get("https://677b-2800-a4-131e-f900-69a2-79c9-1fe3-35b4.ngrok-free.app/api/post/user/" + id_me)
            console.log();
            if(data.ok === true){
                Dispatch(onLoadPostUser(data.posts))
            } 

        } catch (error) {
            console.log(error);
        }


    }
    const addLike = async(info)=> {
        console.log(info);
        try {
            const {data} = await axios.post("https://677b-2800-a4-131e-f900-69a2-79c9-1fe3-35b4.ngrok-free.app/api/post/like",info)
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
        console.log("borrar");
        try {
            const {data} = await axios.delete("https://677b-2800-a4-131e-f900-69a2-79c9-1fe3-35b4.ngrok-free.app/api/post/like",{
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

    const AddSelectedPost = (post)=> {
        Dispatch(onAddSelectedPost(post))
    }
    const QuitSelectedPosts = ()=> {
        Dispatch(onQuitSelectedPosts())
    }
    
    return {
        postsUser,
        loadPosts,
        selectedPost,
        LoadPostsUser,
        addLike,
        quitLike,
        AddSelectedPost,
        QuitSelectedPosts
    }

}