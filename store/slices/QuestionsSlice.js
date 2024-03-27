import { createSlice } from "@reduxjs/toolkit";




const QuestionsSlice = createSlice({
    name:"QuestionSlice",
    initialState:{
        // started,finished,no_started
        cuest_user: undefined,
        status_question : "no_started",
        results_cuest:undefined,
        currentQuestion:1,
        category:[],
        entitiesfromCateogry:[],
        questionsFromEntity:[],
        questionSelected:{},
        questions:[]
    },reducers:{
        onResetState:(state)=> {
            state.questionsFromEntity = []
            state.currentQuestion = 1
        },
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
        },
        onNextQuestion: (state,{payload})=> {
            state.currentQuestion = state.currentQuestion + 1
        },
        onStartedQuestion:(state)=> {
            state.status_question = "started"

        },
        onFinishQuestion: (state,{payload})=> {
            // finalizar cuestionario
            state.status_question = "finished"
        },
        onCreateQuestUser: (state,{payload})=> {
            state.cuest_user = payload
        },
        onLoadResultsQuestionUser:(state,{payload})=> {
            state.results_cuest = payload
        },
        onResetStateQuestionare:(state,{payload})=> {
            state.cuest_user = undefined
            state.status_question = "no_started"
            state.results_cuest=undefined
            state.currentQuestion =1
            state.questions = []
        },
    }

})


export const {onLoadCateogryes,onCreateQuestUser,onResetState,onStartedQuestion,onLoadEntitiesFromCat,onResetStateQuestionare,onLoadResultsQuestionUser,onClearEntitiesFromCateogries,onloadQuestionsFromEntity,onInsertQuestion,onNextQuestion,onFinishQuestion} = QuestionsSlice.actions
export default QuestionsSlice
