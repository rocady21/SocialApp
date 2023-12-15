import {useDispatch,useSelector} from "react-redux"
import { setMessage } from "../stpre/slices/userSlice"


export const useUserSlice = ()=> {

    const {message} = useSelector((state)=> state.user)

    const Dispach = useDispatch()
    
    const mostrarMensaje = ()=> {

        Dispach(setMessage("Hola"))
    }
    return {
        message,
        mostrarMensaje
    }
}

