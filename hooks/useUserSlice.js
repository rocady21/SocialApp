
import {useDispatch,useSelector} from "react-redux"
import { setMessage,credentialsError,addNewUser,onExistUser} from "../stpre/slices/userSlice"
import axios from "axios"
import { ErrorToastify, SuccessToastify } from "../utils/Toastify"
import { setItemStorage } from "../utils/AsyncStorage"


export const useUserSlice = ()=> {

    const {message,user,messageError,userStatus} = useSelector((state)=> state.user)

    const Dispach = useDispatch()
    
    const mostrarMensaje = ()=> {

        Dispach(setMessage("Hola"))
    }

    const LoginUser = async(datos)=> {
        console.log(datos);
        try {
            const {data} = await axios.post("http://eded-2800-a4-13f0-1800-25b8-7fc1-aa5b-f47e.ngrok-free.app/api/login",{
                correo:datos.email,
                contraseña:datos.password
            })

            if (data.ok == true) {
                setItemStorage("token",data.token)
                Dispach(addNewUser(data.data))
                SuccessToastify("Login correcto!")
            }

            console.log(data);
            
        } catch (error) {
            if(error.response.status === 401) {
                ErrorToastify("Datos incorrectos")
            } else if(error.response.status === 400) (
                ErrorToastify("No hay usuario con ese correo")
            )
            console.log(error);
        }

    }

    const validToken = (tk)=> {
        try {
            // aqui validaremos el token si es valido pasara a la app y sino no 
        } catch (error) {
            console.log(error);
        }
    }

    const existUser = ()=> {
        try {
            Dispach(onExistUser())
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        message,
        user,
        userStatus,
        messageError,
        mostrarMensaje,
        LoginUser,
        existUser,
        validToken
    }
}

