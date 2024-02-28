import { useSelector } from "react-redux"
import { onLoadCateogryes, onLoadEntitiesFromCat,onClearEntitiesFromCateogries,onloadQuestionsFromEntity} from "../store/slices/QuestionsSlice"
import { useDispatch } from "react-redux"
import axios from "axios"

export const useQuestionsSlice = ()=> {

    const Dispach = useDispatch()
    const {category,entitiesfromCateogry,questionsFromEntity,questionSelected} = useSelector((state)=> state.questions)

    
    const LoadCateogries = async()=> {
        try {
            console.log("okk");
            const {data} = await axios.get("https://9f04-2800-a4-c078-2500-6006-80d6-6265-d3e4.ngrok-free.app/api/category")

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
            const {data} = await axios.get("https://9f04-2800-a4-c078-2500-6006-80d6-6265-d3e4.ngrok-free.app/api/category/" + id)
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
            const {data} = await axios.get("https://9f04-2800-a4-c078-2500-6006-80d6-6265-d3e4.ngrok-free.app/api/questions/entity/" + id)
            if(data.ok === true) {
                Dispach(onloadQuestionsFromEntity(data.data))
            }
        } catch (error) {   
            console.log(error);
        }
    }
    


    return {
        category,
        entitiesfromCateogry,
        questionsFromEntity,
        LoadCateogries,
        handleLoadEntitiesFromCat,
        handelClearEntitiesFromCateogries,
        handleLoadQuestionsFromEntity
    }
}