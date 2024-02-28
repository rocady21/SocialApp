import { createSlice } from "@reduxjs/toolkit";



const QuestionsSlice = createSlice({
    name:"QuestionSlice",
    initialState:{
        category:[],
        entitiesfromCateogry:[],
        questionsFromEntity:[],
        questionSelected:{}
    },reducers:{
        onLoadCateogryes:(state,{payload}) => {
            state.category = payload
        },
        onLoadEntitiesFromCat:(state,{payload})=> {
            state.entitiesfromCateogry = payload
        },
        onClearEntitiesFromCateogries:(state,{payload})=> {
            state.entitiesfromCateogry = []
        },
        onloadQuestionsFromEntity:(state,{payload})=> {
            state.questionsFromEntity = payload
        }
    }

})


export const {onLoadCateogryes,onLoadEntitiesFromCat,onClearEntitiesFromCateogries,onloadQuestionsFromEntity} = QuestionsSlice.actions
export default QuestionsSlice
