const questionReducer = (state = {
    quizStats: []
}, action) => {
    switch (action.type) {
        case 'ADD_API_DATA':
            return Object.assign({}, state, { apiData: action.payload });
        case 'ADD_CATEGORY_TYPES':
            return Object.assign({}, state, { categoryTypes: action.payload });
        case 'ADD_QUIZ_QUESTION_SET':
            return Object.assign({}, state, { quizQuestionSet: action.payload });
        case 'ADD_QUIZ_RESULTS':
            return Object.assign({}, state, { quizResults: action.payload });
        case 'ADD_QUIZ_STATS':
            return {
                ...state,
                quizStats: [...state.quizStats, action.payload]
            }

        default:
            return state
    }
}

export default questionReducer