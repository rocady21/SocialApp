import axios from "axios"
import { useSelector } from "react-redux"
import { onLoadPostUser,onClearPostUsers } from "../store/slices/PostSlice"
import { useDispatch } from "react-redux"


export const usePosterSlice = ()=> {

    const Dispatch = useDispatch()
    const {postsUser,loadPosts} = useSelector((state)=> state.post)

    const LoadPostsUser = async(id_me)=> {
        try {
            const {data} = await axios.get("https://a716-2800-a4-1323-9600-7d5c-52fc-18bc-82a3.ngrok-free.app/api/post/user/" + id_me)
            console.log();
            if(data.ok === true){
                Dispatch(onLoadPostUser(data.posts))
                console.log(data);
            } 

        } catch (error) {
            console.log(error);
        }


    }

    return {
        postsUser,
        loadPosts,
        LoadPostsUser
    }

}