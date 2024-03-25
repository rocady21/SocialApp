import { useSelector } from "react-redux"
import { onLoadCateogryes,onStartedQuestion,onCreateQuestUser, onLoadEntitiesFromCat,onResetState,onClearEntitiesFromCateogries,onFinishQuestion,onInsertQuestion,onloadQuestionsFromEntity,onNextQuestion} from "../store/slices/QuestionsSlice"
import { useDispatch } from "react-redux"
import axios from "axios"

export const useQuestionsSlice = ()=> {

    const Dispach = useDispatch()
    const {category,cuest_user,entitiesfromCateogry,status_question,questionsFromEntity,questionSelected,questions,currentQuestion} = useSelector((state)=> state.questions)


    const ResetState = ()=> {
        Dispach(onResetState())
    }

    const Start_question = ()=> {
        Dispach(onStartedQuestion())
    }

    const LoadCateogries = async()=> {
        try {
            console.log("okk");
            const {data} = await axios.get("https://4187-167-61-209-70.ngrok-free.app/api/category")

            if(data.ok === true) {
                Dispach(onLoadCateogryes(data.data))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadEntitiesFromCat = async(id)=> {
        try {
            const {data} = await axios.get("https://4187-167-61-209-70.ngrok-free.app/api/category/" + id)
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
            const {data} = await axios.post("https://4187-167-61-209-70.ngrok-free.app/api/questions/entity/" + id,{
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
            const {data} = await axios.get("https://4187-167-61-209-70.ngrok-free.app/api/questions/" + id_cuest)
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
            console.log(questions[sig]);
            Dispach(onNextQuestion())

        } else {
            console.log("final");
            Dispach(onFinishQuestion())
        }
    }

    const Create_cuest_user = async(id_user,id_cuest)=> {

        const format_send = {
            id_user:id_user,
            id_cuestionario:id_cuest
        }
        try {
            const {data} = await axios.post("https://4187-167-61-209-70.ngrok-free.app/api/questions/user",format_send)

            if(data.ok === true ) {
                Dispach(onCreateQuestUser(data.cuest_user.id))
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
            const {data} = await axios.post("https://4187-167-61-209-70.ngrok-free.app/api/questions/user/response",format_send)
            if(data.ok === true) {
                return true
            }
        } catch (error) {
            return false
        }
    }

    const FinishendQuestionnare = async()=> {
        try {
            const {} = await axios.post("")            
        } catch (error) {
            console.log(error);
        }
    }
    


    return {
        currentQuestion,
        category,
        cuest_user,
        entitiesfromCateogry,
        questionsFromEntity,
        questions,
        status_question,
        ResetState,
        Create_cuest_user,
        LoadCateogries,
        handleLoadEntitiesFromCat,
        handelClearEntitiesFromCateogries,
        handleLoadQuestionsFromEntity,
        CargarPreguntasDeCuestionario,
        NextQuestion,
        InsertResponse,
        FinishendQuestionnare
    }
}