
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
        try {
            const {data} = await axios.post("https://5d6c-2800-a4-13f3-bb00-6817-640c-9770-1e8a.ngrok-free.app/api/login",{
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
        console.log(tk);
        console.log("tkk aut");
        // esta funcion me devolvera la info del user necesaria si el token es valido 
        try {
            const {data} = await axios.get("https://5d6c-2800-a4-13f3-bb00-6817-640c-9770-1e8a.ngrok-free.app/api/validToken",{
                headers: { "Authorization": `Bearer ${tk}` }
            })
            console.log("esta es la info by token");
            console.log(data);
            // aqui validaremos el token si es valido pasara a la app y sino no 
        } catch (error) {
            console.log(error);
            if(error.response.status == 401) {
                console.log("no autorizado");
                Dispach(onExistUser())
            }

            // cerrar session
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

