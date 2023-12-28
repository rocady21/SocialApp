import {useDispatch,useSelector} from "react-redux"
import { setMessage } from "../stpre/slices/userSlice"


export const useUserSlice = ()=> {

    const {message} = useSelector((state)=> state.user)

    const Dispach = useDispatch()
    
    const mostrarMensaje = ()=> {

        Dispach(setMessage("Hola"))
    }

    const LoginUser = async(datos)=> {
        try {
            const {data} = await axios.post("https://23b7-2800-a4-1238-c00-21cd-73ee-128b-d37e.ngrok-free.app/api/login",{

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
            const {data} = await axios.get("https://23b7-2800-a4-1238-c00-21cd-73ee-128b-d37e.ngrok-free.app/api/validToken",{

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
        mostrarMensaje
    }
}

