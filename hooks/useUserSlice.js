
import {useDispatch,useSelector} from "react-redux"
import { setMessage,credentialsError,addNewUser } from "../stpre/slices/userSlice"
import axios from "axios"


export const useUserSlice = ()=> {

    const {message,user,token,messageError} = useSelector((state)=> state.user)

    const Dispach = useDispatch()
    
    const mostrarMensaje = ()=> {

        Dispach(setMessage("Hola"))
    }

    const LoginUser = async(datos)=> {
        console.log(datos);
        try {
            const {data} = await fetch("http://127.0.0.1:5000/api/login",{
                correo:datos.email,
                contraseña:datos.password
            })

            console.log(data);
            
        } catch (error) {
            console.log(error);
        }

    }

    return {
        message,
        user,
        token,
        messageError,
        mostrarMensaje,
        LoginUser
    }
}

