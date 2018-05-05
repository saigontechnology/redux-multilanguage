# Redux Multilanguage
A higher-order component used with Redux to support multilanguage

![Demo](https://media.giphy.com/media/mXVGIebpCTTpAAN35N/giphy.gif)

## Installation
```
npm install --save redux-multilanguage
```
or
```
yarn add redux-multilanguage
```

## Setup

1. Prepare language.json files. File name should be a unique language code. For example:
```js
//vi.json
{
  "Title": "Tieu de",
  "Name": "Ten",
  "Language": "Ngon ngu"
}

//en.json
{
  "Title": "Title",
  "Name": "Name",
  "Language": "Language"
}
```

2. Create `multilanguage` reducer in your root reducer:

```js
// reducers.js
import {combineReducers} from 'redux'
import {createMultilanguageReducer} from 'redux-multilanguage'

export default combineReducers({
  multilanguage: createMultilanguageReducer({currentLanguageCode: 'en'}),
  //...
})
```

3. Connect your component to `redux-multilanguage`:

```jsx
// App.js
import React from 'react'
import {
  languageLoader, 
  multilanguage, 
  changeLanguage, 
  loadLanguages
} from 'redux-multilanguage'
import {connect} from 'react-redux'

class App extends React.Component{
  state = {language: 'en'}
  componentDidMount(){
    this.loadLanguages()
  }
  loadLanguages(){
    // Below is to load languages, must call this once on app start,
    // and when user switch to new language that haven't loaded yet.
    this.props.dispatch(loadLanguages({
      languages: {
        vi: require('./vi.json'),
        en: require('./en.json')
      }
    }))
  }
  changeLanguage = (e) => {
    const languageCode = e.target.value
    // To change language:
    this.props.dispatch(changeLanguage(languageCode))
  }
  render(){
    const {
      /*
        Below props are passed by 'multilanguage' HOC.
        'strings' is the JSON of the language file. 
        For example, if 'currentLanguageCode' is 'en', 
        then 'strings' is the content of 'en.json'
       */
      strings,
      currentLanguageCode
    } = this.props
    return <div>
      {strings["Title"]}

      Change language: <select 
        value={currentLanguageCode} 
        onChange={this.changeLanguage}
      >
        <option value="en">en</option>
        <option value="vi">vi</option>
      </select>
    </div>
  }
}
export default connect()(multilanguage(App))
```

For more, see [full working example](https://github.com/stssoftware/redux-multilanguage/tree/master/example).

## APIs
Below are what exported by `redux-multilanguage`
* [HOC] `multilanguage(WrappedComponent)`: Use this to wrap your component, wrapped component will have these passed props:
  * `strings`: The JSON of current selected language.
  * `currentLanguageCode`: The code of current language, to change this, dispatch `changeLanguage()`
* [action creator] `loadLanguages(config)`: Load languages, this action should be dispatched when app start or dispatched mutiple times when ever demand to lazy-load languages.
  * `config.languages`: An object, keys are language codes, equivalent values are json of code-string values. Example:

    ```
    dispatch(loadLanguages({
      languages: {
        vi: {Title: 'Tieu de', Name: 'Tên'},
        en: {Title: 'Title', Name: 'Name'}
      }
    }))
    ```

* [action creator] `changeLanguage(languageCode)`: an action creator to change language. 
Example usage: `dispatch(changeLanguage('en'))` 
* `createMultilanguageReducer(initState)`: returns a reducer for multilanguage in redux store
  * `initState.currentLanguageCode`: language code to be loaded by default
