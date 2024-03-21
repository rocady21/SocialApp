import { createSlice } from "@reduxjs/toolkit";



const QuestionsSlice = createSlice({
    name:"QuestionSlice",
    initialState:{
        category:[],
        entitiesfromCateogry:[],
        questionsFromEntity:[],
        questionSelected:{},
        questions:[]
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
        },
        onInsertQuestion:(state,{payload})=> {
            state.questions = payload
        }
    }

})


export const {onLoadCateogryes,onLoadEntitiesFromCat,onClearEntitiesFromCateogries,onloadQuestionsFromEntity,onInsertQuestion} = QuestionsSlice.actions
export default QuestionsSlice
