import { useSelector } from "react-redux"
import { onLoadCateogryes,onStartedQuestion,onCreateQuestUser, onResetStateQuestionare,onLoadResultsQuestionUser,onLoadEntitiesFromCat,onResetState,onClearEntitiesFromCateogries,onFinishQuestion,onInsertQuestion,onloadQuestionsFromEntity,onNextQuestion} from "../store/slices/QuestionsSlice"
import { useDispatch } from "react-redux"
import axios from "axios"
import { addBadgeUser } from "../store/slices/userSlice"

export const useQuestionsSlice = ()=> {

    const Dispach = useDispatch()
    const {category,cuest_user,entitiesfromCateogry,status_question,questionsFromEntity,questionSelected,questions,currentQuestion,results_cuest} = useSelector((state)=> state.questions)


    const ResetState = ()=> {
        Dispach(onResetState())
    }

    const Start_question = ()=> {
        Dispach(onStartedQuestion())
    }

    const LoadCateogries = async()=> {
        try {
            const {data} = await axios.get("https://b02e-167-61-211-64.ngrok-free.app/api/category")

            if(data.ok === true) {
                Dispach(onLoadCateogryes(data.data))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleLoadEntitiesFromCat = async(id)=> {
        try {
            const {data} = await axios.get("https://b02e-167-61-211-64.ngrok-free.app/api/category/" + id)
            if(data.ok === true) {
                Dispach(onLoadEntitiesFromCat(data.data))
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handelClearEntitiesFromCateogries = ()=> {
        Dispach(onClearEntitiesFromCateogries())
    }

    const handleLoadQuestionsFromEntity = async(id,user_id)=> {

        try {
            const {data} = await axios.post("https://b02e-167-61-211-64.ngrok-free.app/api/questions/entity/" + id,{
                id_user_session:user_id
            })
            if(data.ok === true) {
                Dispach(onloadQuestionsFromEntity(data.data))
            }
        } catch (error) {   
            console.log(error);
        }
    }

    const CargarPreguntasDeCuestionario = async(id_cuest)=> {
        try {
            const {data} = await axios.get("https://b02e-167-61-211-64.ngrok-free.app/api/questions/" + id_cuest)
            if(data.ok === true) {

                Dispach(onInsertQuestion(data.data.questions))
            }

        } catch (error) {
            console.log(error);
        }
    }

    const NextQuestion = ()=> { 

        const sig = currentQuestion + 1
        if(sig <= questions.length) {
            Dispach(onNextQuestion())

        } else {
            Dispach(onFinishQuestion())
        }
    }

    const Create_cuest_user = async(id_user,id_cuest)=> {

        const format_send = {
            id_user:id_user,
            id_cuestionario:id_cuest
        }
        try {
            const {data} = await axios.post("https://b02e-167-61-211-64.ngrok-free.app/api/questions/user",format_send)

            if(data.ok === true ) {
                Dispach(onCreateQuestUser(data.cuest_user))
            }
        } catch (error) {
            console.log(error);
        }

    }

    const InsertResponse = async(cuest_user,id_opcion) => {
        const format_send = {
            resp:{
                id_cuestionario_user:cuest_user,
                id_opcion:id_opcion? id_opcion : null
        }
        }
        try {
            const {data} = await axios.post("https://b02e-167-61-211-64.ngrok-free.app/api/questions/user/response",format_send)
            if(data.ok === true) {
                return true
            }
        } catch (error) {
            return false
        }
    }
    
    const FinishendQuestionnare = async(id_cuest_user)=> {
        try {
            const {data} = await axios.get("https://b02e-167-61-211-64.ngrok-free.app/api/questions/user/finished_quest/" + id_cuest_user) 
            if(data.ok === true) {
                Dispach(onLoadResultsQuestionUser(data.result))
                if(data.result.status === "Aprobada") {
                    console.log("aprobado");
                    Dispach(addBadgeUser(data.result.badge))
                }
            }    
        } catch (error) {
            console.log(error);
        }
    }

    const ResetQuestionareState = ()=> {
        Dispach(onResetStateQuestionare())
    }
    


    return {
        currentQuestion,
        category,
        cuest_user,
        entitiesfromCateogry,
        questionsFromEntity,
        questions,
        status_question,
        results_cuest,
        ResetState,
        Create_cuest_user,
        LoadCateogries,
        handleLoadEntitiesFromCat,
        handelClearEntitiesFromCateogries,
        handleLoadQuestionsFromEntity,
        CargarPreguntasDeCuestionario,
        NextQuestion,
        InsertResponse,
        FinishendQuestionnare,
        ResetQuestionareState
    }
}