export const addApiData = (payload) => ({
    type: 'ADD_API_DATA',
    id: 'apiData',
    payload,
});

export const addCategoryTypes = (payload) => ({
    type: 'ADD_CATEGORY_TYPES',
    id: 'categoryTypes',
    payload
})

export const addQuizQuestionSet = (payload) => ({
    type: 'ADD_QUIZ_QUESTION_SET',
    id: 'quizQuestionSet',
    payload
})

export const addQuizResults = (payload) => ({
    type: 'ADD_QUIZ_RESULTS',
    id: 'quizResults',
    payload
})

export const addQuizStats = (payload) => ({
    type: 'ADD_QUIZ_STATS',
    id: 'quizStats',
    payload
})