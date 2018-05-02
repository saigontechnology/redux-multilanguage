# Redux Multilanguage
A higher-order component used with Redux to support multilanguage
## Installation
```
npm install --save redux-multilanguage
```

## Usage sample
```jsx
//vi.json
{
  "title": "Tieu de"
}

//en.json
{
  "title": "Title"
}

// App.js
import {languageLoader, multilanguage, changeLanguage, loadLanguages} from 'redux-multilanguage'
import {connect} from 'react-redux'

class App extends React.Component{
  state = {language: 'en'}
  componentDidMount(){
    this.loadLanguages()
  }
  loadLanguages(){
    // You can lazily load the languages on demand or just import them directly
    this.props.dispatch(loadLanguages({
      languages: {
        vi: require('./vi.json'),
        en: require('./en.json')
      }
    }))
  }
  changeLanguage = (e) => {
    const languageCode = e.target.value
    this.props.dispatch(changeLanguage(languageCode))
  }
  render(){
    const {
      strings,
      currentLanguageCode
    } = this.props
    return <div>
      {strings["title"]}

      Change language: <select value={currentLanguageCode} onChange={this.changeLanguage}>
        <option value="en">en</option>
        <option value="vi">vi</option>
      </select>
    </div>
  }
}
export default connect()(multilanguage(App))

// reducers.js
import {combineReducers} from 'redux'
import {createMultilanguageReducer} from 'redux-multilanguage'

export default combineReducers({
  multilanguage: createMultilanguageReducer({currentLanguageCode: 'en'}),
  //...
})
```

## APIs
Below are what exported by `redux-multilanguage`
* [HOC] `multilanguage(WrappedComponent)`: Use this to wrap your component, wrapped component will have `strings` object that has translation texts.
* [action creator] `loadLanguages(config)`: Load languages, this action should be dispatched when app start or dispatched mutiple times when ever demand to lazy-load languages.
  * `config.languages`: An object, keys are language codes, equivalent values are json of code-string values. Example:

    ```
    dispatch(loadLanguages({
      languages: {
        vi: {title: 'Tieu de', name: 'Tên'},
        en: {title: 'Title', name: 'Name'}
      }
    }))
    ```

* [action creator] `changeLanguage(languageCode)`: an action creator to change language. 
Example usage: `dispatch(changeLanguage('en'))` 
* `createMultilanguageReducer(initState)`: returns a reducer for multilanguage in redux store
  * `initState.currentLanguageCode`: language code to be loaded by default
