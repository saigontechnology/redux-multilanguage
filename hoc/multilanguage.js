import React from 'react'
import {connect} from 'react-redux'

//TODO - dynamic load languages file if languages are heavy
import en from '../languages/en.json'
import vi from '../languages/vi.json'
const languages = {en, vi}
function getLanguage(languageCode){
    if (languages.hasOwnProperty(languageCode)){
        return languages[languageCode]
    }else{
        console.error(`${languageCode} is not an available language code.`)
        return languages['en']
    }
}
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
                var strings = getLanguage(this.props.currentLanguageCode)[key];
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