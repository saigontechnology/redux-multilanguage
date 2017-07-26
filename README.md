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
    languageLoader.load({language})
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

## LICENSE
MIT