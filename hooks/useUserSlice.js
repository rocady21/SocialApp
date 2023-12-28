
import {useDispatch,useSelector} from "react-redux"
import { setMessage,credentialsError,addNewUser,onExistUser} from "../store/slices/userSlice"
import axios from "axios"
import { ErrorToastify, SuccessToastify } from "../utils/Toastify"
import { removeValueStorage, setItemStorage } from "../utils/AsyncStorage"


export const useUserSlice = ()=> {

    const {message,user,messageError,userStatus} = useSelector((state)=> state.user)

    const Dispach = useDispatch()
    
    const mostrarMensaje = ()=> {

        Dispach(setMessage("Hola"))
    }

    const LoginUser = async(datos)=> {
        try {
<<<<<<< HEAD
            const {data} = await axios.post("https://23b7-2800-a4-1238-c00-21cd-73ee-128b-d37e.ngrok-free.app/api/login",{
=======
            const {data} = await axios.post("https://a031-2800-a4-13ad-5d00-988e-5400-1bdc-b681.ngrok-free.app/api/login",{
>>>>>>> 41a893fb0341966f92b909777ec766dc88cf1d23

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
<<<<<<< HEAD
            const {data} = await axios.get("https://23b7-2800-a4-1238-c00-21cd-73ee-128b-d37e.ngrok-free.app/api/validToken",{
=======
            const {data} = await axios.get("https://a031-2800-a4-13ad-5d00-988e-5400-1bdc-b681.ngrok-free.app/api/validToken",{
>>>>>>> 41a893fb0341966f92b909777ec766dc88cf1d23

                headers: { "Authorization": `Bearer ${tk}` }
            })

            // aqui validaremos el token si es valido pasara a la app y sino no 
        } catch (error) {
            console.log(error);
            if(error.response.status == 401) {
                console.log("no autorizado");
                existUser()
            }

            // cerrar session
        }
    }

    const existUser = ()=> {
        try {
            removeValueStorage("token")
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

