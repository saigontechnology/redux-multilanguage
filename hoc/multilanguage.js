import React from 'react'
import {connect} from 'react-redux'
import languageLoader from '../languageLoader.js'

/**
 *  A higer-order component for multilanguage. See usage instruction in ../index.js
 */
export default function multilanguage(key){
    return (WrappedComponent) => {
        const MultipleLanguage = (props) => <WrappedComponent {...props} />

        return connect(state => {
            const currentLanguageCode = state.multilanguage.currentLanguageCode
            const language = languageLoader.getLanguage(currentLanguageCode) || {}
            var strings = language[key] || {}
            return {
                currentLanguageCode,
                strings
            }
        })(MultipleLanguage)  
    }
}