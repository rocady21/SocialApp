
import {useDispatch,useSelector} from "react-redux"
import { setMessage,credentialsError,addNewUser,onExistUser,onLoadingSearch,onFriend_Request,onNoFriend_Request,onNoResults,onPreviewState,onSearchResults,onLoadUser_info,onClearUser_info} from "../store/slices/userSlice"
import axios from "axios"
import { ErrorToastify, SuccessToastify } from "../utils/Toastify"
import { removeValueStorage, setItemStorage,ClearStorage } from "../utils/AsyncStorage"
import { BACKEND_URL} from '@env';
import { getStorage } from "firebase/storage"
import { onSelectedChat } from "../store/slices/ChatSlice"


console.log(BACKEND_URL);
export const useUserSlice = ()=> {

    const {message,user,messageError,userStatus,statusSearch,searchUsers,user_profile,friend_requests,StatusLoadingFriend_requests} = useSelector((state)=> state.user)

    const Dispach = useDispatch()
    
    const mostrarMensaje = ()=> {
        Dispach(setMessage("Hola"))
    }

    const LoginUser = async(datos)=> {
        try {
            const {data} = await axios.post(`https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/login`,{

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

            const {data} = await axios.get("https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/validToken",{

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
    const SearchUser = async(value)=> {
        try {
            Dispach(onLoadingSearch())
            const {data} = await axios.get(`https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/user/${value}`)    
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
            Dispach(onExistUser())
            Dispach(onSelectedChat(false))
        } catch (error) {
            console.log(error);
        }
    }
    const loadInfoUserById = async(id)=> {
        try {
            const {data} = await axios.get(`https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/people/${id}`)
            if(data.ok === true) {
                Dispach(onLoadUser_info(data.user))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const LoadFriendRequest = async()=>{
        try {
            const {data} = await axios.get("https://12cf-2800-a4-12ad-a100-dcd9-5a40-beee-5c8d.ngrok-free.app/api/request_friends/" + user.id)
            if(data.ok === true) {
                console.log("hay soli");
                Dispach(onFriend_Request(data.friend_request))
            }
        } catch (error) {
            if(error.response.data.ok === false) {
                console.log("no hay soli");
                Dispach(onNoFriend_Request())
            }
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
        LoadFriendRequest
    }
}

