import {CHANGE_LANGUAGE} from '../actions'

const initialState = {
    currentLanguageCode: 'en'
}

function multilanguage(state = initialState, action){
    switch(action.type){
        case CHANGE_LANGUAGE: 
            return {
                ...state,
                currentLanguageCode: action.languageCode
            }
        default: 
            return state
    }
}
export default multilanguage

export function createMultilanguageReducer(initialState){
    return (state = initialState, action) => {
        return multilanguage(state, action)
    }
}