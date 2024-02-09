
import {useDispatch,useSelector} from "react-redux"
import { setMessage,credentialsError,addNewUser,onExistUser,onResetUserState,onLoadingSearch,onFriend_Request,onNoFriend_Request,onFollow,onUnFollow,onNoResults,onPreviewState,onSearchResults,onLoadUser_info,onClearUser_info,onAcceptFriendRequest,onRejectFriendRequest} from "../store/slices/userSlice"
import axios from "axios"
import { ErrorToastify, SuccessToastify } from "../utils/Toastify"
import { removeValueStorage, setItemStorage,ClearStorage } from "../utils/AsyncStorage"
import { BACKEND_URL} from '@env';
import { getStorage } from "firebase/storage"
import { onSelectedChat } from "../store/slices/ChatSlice"



export const useUserSlice = ()=> {

    const {message,user,messageError,userStatus,statusSearch,searchUsers,user_profile,friend_requests,StatusLoadingFriend_requests} = useSelector((state)=> state.user)

    const Dispach = useDispatch()
    
    const mostrarMensaje = ()=> {
        Dispach(setMessage("Hola"))
    }

    const LoginUser = async(datos)=> {
        try {
            const {data} = await axios.post(`https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/login`,{

                correo:datos.email,
                contraseña:datos.password
            })

            if (data.ok == true) {
                setItemStorage("token",data.token)
                Dispach(addNewUser(data.data))
                SuccessToastify("Login correcto!")
            }

            
        } catch (error) {
            if(error.response.status === 401) {
                ErrorToastify("Datos incorrectos")
            } else if(error.response.status === 400) (
                ErrorToastify("No hay usuario con ese correo")
            )
            console.log(error);
        }

    }

    const validToken = async (tk)=> {

        // esta funcion me devolvera la info del user necesaria si el token es valido 
        try {

            const {data} = await axios.get("https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/validToken",{

                headers: { "Authorization": `Bearer ${tk}` }
            })
            if (data.isLogged == true) {
                return Dispach(addNewUser(data.user))
            }
            
        } catch (error) {
            console.log(error);
            if(error.response.status == 401) {
                existUser()
            }

            // cerrar session
        }
    }

    const FollowUser = async(info)=> {
        try {
            const {data} = await axios.post("https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/send_request_friend",info)
            if(data.ok === true){
                Dispach(onFollow())
            } 
        } catch (error) {
            console.log(error);
        }
    }
    const UnfollowUser = async(info)=> {
        try {
            const {} = await axios.post("https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/reject_request_friend",info)
            if(data.ok === true ) {
                Dispach(onUnFollow)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    
    const SearchUser = async(value)=> {
        try {
            Dispach(onLoadingSearch())
            const {data} = await axios.get(`https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/user/${value}`)    
            if(data.ok == true) {
                Dispach(onSearchResults(data.result))
            }
        } catch (error) {
            if(error.response.status == 400) {
                Dispach(onNoResults())
            }
        }
    }
    const DefaultSearch = ()=> {
        Dispach(onPreviewState())
    }
    
    const existUser = ()=> {
        try {
            ClearStorage()
            removeValueStorage("token")
            Dispach(onResetUserState())
        } catch (error) {
            console.log(error);
        }
    }
    
    const loadInfoUserById = async(id)=> {
        
        try {
            const {data} = await axios.post(`https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/people/${id}`,{
                id_user_session:user.id
            })

            if(data.ok === true) {
                Dispach(onLoadUser_info(data.user))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const LoadFriendRequest = async()=>{
        try {
            const {data} = await axios.get("https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/request_friends/" + user.id)
            if(data.ok === true) {
                Dispach(onFriend_Request(data.friend_request))
            }
        } catch (error) {
            if(error.response.data.ok === false) {
                Dispach(onNoFriend_Request())
            }
        }
    }

    const AcceptFriendRequest = async(info)=> {
        try {
            const {data} = await axios.put("https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/accept_request_friend",info)

            console.log(data);
            if(data.ok === true) {
                Dispach(onAcceptFriendRequest(info.id_user_seguidor))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const RejectFriendRequest = async (info)=> {
        try {
            const {data} = await axios.delete(`https://7707-2800-a4-1294-9f00-c1ff-7827-91aa-101d.ngrok-free.app/api/reject_request_friend?param1=${info.id_user_seguidor}&param2=${info.id_user_seguido}`)
            console.log("Se mando reject");
            if(data.ok == true) {
                Dispach(onRejectFriendRequest(info.id_user_seguidor))
            }


        } catch (error) {
            console.log(error);
        }
    }
    
    const ClearUser_info = ()=> {
        Dispach(onClearUser_info())
    }
    
    return {
        message,
        user,
        userStatus,
        messageError,
        statusSearch,
        searchUsers,
        user_profile,
        friend_requests,
        StatusLoadingFriend_requests,
        mostrarMensaje,
        LoginUser,
        existUser,
        validToken,
        SearchUser,
        DefaultSearch,
        loadInfoUserById,
        ClearUser_info,
        LoadFriendRequest,
        RejectFriendRequest,
        AcceptFriendRequest,
        FollowUser,
        UnfollowUser
                
    }
}

