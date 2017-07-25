import React from 'react'
import {connect} from 'react-redux'
import languageLoader from '../languageLoader.js'

/**
 *  A higer-order component for multilanguage. See usage instruction in ../index.js
 */
export default function multilanguage(key){
    return (WrappedComponent) => {
        class MultipleLanguage extends React.Component{
            constructor(props){
                super(props)

                if (props.strings){
                    console.error('[multilanguage] Please do NOT pass "string" as props to multilanguage component.')
                }
            }
            render(){
                const {currentLanguageCode} = this.props
                const language = languageLoader.getLanguage(currentLanguageCode) || {}
                var strings = language[key] || {}
                return <WrappedComponent {...this.props} strings={strings} />;
            }
        } 

        return connect(state => {
            return {
                currentLanguageCode: state.multilanguage.currentLanguageCode
            }
        })(MultipleLanguage)  
    }
}