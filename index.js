import multilanguage from './hoc/multilanguage.js'
import {changeLanguage} from './actions'
import multilanguageReducer from './reducers/multilanguage.js'
import languageLoader from './languageLoader.js'

export {
    /**
     *  A higher-order component to wrap component which has multilanguage label
     *  API: multilanguage(key)(WrappedComponent)
     *  Example Usage: multilanguage('WrappedComponent')(WrappedComponent)
     *      --> will pass a strings array into WrappedComponent via this.props.strings which has translations texts.
     */
    multilanguage,
    changeLanguage,
    multilanguageReducer,
    languageLoader
}