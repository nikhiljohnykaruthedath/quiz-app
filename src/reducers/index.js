import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import apiDataReducer from './apiDataReducer'

const rootReducer = (history) => combineReducers({
    apiData: apiDataReducer,
    router: connectRouter(history)
})

export default rootReducer