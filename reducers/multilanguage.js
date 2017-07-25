import {CHANGE_LANGUAGE} from '../actions'

const initialState = {
    currentLanguageCode: 'en'
}

export default function multilanguage(state = initialState, action){
    switch(action.type){
        case CHANGE_LANGUAGE: 
            return {
                currentLanguageCode: action.languageCode
            }
        default: 
            return state
    }
}