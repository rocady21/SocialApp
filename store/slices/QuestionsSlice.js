import { createSlice } from "@reduxjs/toolkit";



const QuestionsSlice = createSlice({
    name:"QuestionSlice",
    initialState:{
        category:[],
        entitiesfromCateogry:[],
        questionsFromEntity:[],
        questionSelected:{}
    },reducers:{

    }

})


export const {} = QuestionsSlice.actions
export default QuestionsSlice