# Redux Multilanguage

## What is this
A higher-order component used with Redux to support multilangauge.

## Installation
```
npm install --save redux-multilanguage@next
```

## Usage sample
```jsx
//vi.json
{
  "MyComponent": {title: 'Tieu de'}
}

//en.json
{
  "MyComponent": {title: 'Title'}
}

//MyComponent.js
import {multilanguage} from 'redux-multilanguage'
const MyComponent = ({strings}) => <div>{strings.title}</div>
export default multilanguage('MyComponent')(MyComponent)

// App.js
import {MyComponent} from './MyComponent'
import {languageLoader} from 'redux-multilanguage'
import vi from './vi.json'
import en from './en.json'
const languages = {vi, en}

class App extends React.Component{
  componentDidMount(){
    languageLoader.load({languages})
  }
  render(){
    return <MyComponent/>
  }
}

// reducers.js
import {combineReducers} from 'redux'
import {createMultilanguageReducer} from 'redux-multilanguage'

export default combineReducers({
  multilanguage: createMultilanguageReducer({currentLanguageCode: 'vi'}), // this is your default language
  //other reducers...
})
```

* If you want to change language, use `changeLanguage` action creator from `redux-multilanguage`

## APIs
Below are what exported by `redux-multilanguage`
* `multilanguage(groupName)(WrappedComponent)`: Use this to wrap your component, wrapped component will have `strings` object that has translation texts.
* `languageLoader.load(config)`: Load languages, this must be called when app start.
  * `config.languages`: A languages list to be loaded.
* `createMultilanguageReducer(initState)`: return a reducer for multilanguage in redux store
* `changeLanguage(languageCode)`: an action creator to change language. Example usage: `store.dispatch(changeLanguage('en'))` 
