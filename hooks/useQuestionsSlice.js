import { useSelector } from "react-redux"
import { onLoadCateogryes, onLoadEntitiesFromCat,onClearEntitiesFromCateogries,onInsertQuestion,onloadQuestionsFromEntity} from "../store/slices/QuestionsSlice"
import { useDispatch } from "react-redux"
import axios from "axios"

export const useQuestionsSlice = ()=> {

    const Dispach = useDispatch()
    const {category,entitiesfromCateogry,questionsFromEntity,questionSelected,questions} = useSelector((state)=> state.questions)

    
    const LoadCateogries = async()=> {
        try {
            console.log("okk");
            const {data} = await axios.get("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/category")

            if(data.ok === true) {
                console.log(data);
                Dispach(onLoadCateogryes(data.data))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadEntitiesFromCat = async(id)=> {
        try {
            const {data} = await axios.get("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/category/" + id)
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

    const handleLoadQuestionsFromEntity = async(id)=> {
        console.log("se llama la func",id);
        try {
            const {data} = await axios.get("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/questions/entity/" + id)
            if(data.ok === true) {
                Dispach(onloadQuestionsFromEntity(data.data))
            }
        } catch (error) {   
            console.log(error);
        }
    }

    const CargarPreguntasDeCuestionario = async(id_cuest)=> {
        try {
            const {data} = await axios.get("https://2b47-2800-a4-c16c-e300-a137-be0-c4ef-d685.ngrok-free.app/api/questions/" + id_cuest)
            if(data.ok === true) {
                Dispach(onInsertQuestion(data.data.questions))
            }

        } catch (error) {
            console.log(error);
        }
    }
    


    return {
        category,
        entitiesfromCateogry,
        questionsFromEntity,
        questions,
        LoadCateogries,
        handleLoadEntitiesFromCat,
        handelClearEntitiesFromCateogries,
        handleLoadQuestionsFromEntity,
        CargarPreguntasDeCuestionario,
    }
}