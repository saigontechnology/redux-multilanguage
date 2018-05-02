# React Redux App

## Prerequisite:
Your machine must already installed:
* NodeJS
* Yarn

## IDE

* Recommended: Visual Studio Code, Sublime Text
* Recommended extensions for Visual Studio Code:
  * Babel: https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring
  * Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  * ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  * Path-autocomplete: https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete

## Techs and libs:
Developers must be familiar with:
* `react`
* `redux`
* `redux-thunk`
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)

## Commands:
* `yarn install`: Run at first time clone this project or when any module missing.
* `yarn start`: Start project at development mode.
* `yarn build`: Build project to production.

## Project structure:

* /src
  * index.js
  * App.js: Single app root component.
  * /constants
  * /helpers: Helpers/Utility functions that would be used among modules
    * FetchHelper.js: A wrapper for Fetch API
  * /redux: All setup for Redux (reducers, store, middlewares)
  * /modules: Each module is a feature or re-used components
    * /common: A special module which contains many reused components among the app. Some components in here can be separate in to their own module if nessessary.
    * /module1: A module may relate to a feature. It contains many components, pages, actions, reducers, services, ... which are highly relate to each other.
      * index.js: All module items which are needed to be used from outside need to be export from here. From the outside, avoid to import module item directly.
      * /actions: Redux actions
      * /components: React components, could be separated into 2 directories: containers and presenters if nessessary.
      * /reducers: Redux reducers
      * /...: More directories if nessessary.
    * /module2
    * /...

## FetchHelper Receipts

### Handle server error:
```js
import FetchHelper from './src/helpers/FetchHelper.js'

FetchHelper.addAfterResonseInterceptor(resp => {
  if (resp.status === 500){
    //show error message
  }

  if (resp instanceof Error){
    //handle error. This is likely caused by the network connection.
  }
})
```

### Fetch JSON data
```js
import FetchHelper from './src/helpers/FetchHelper.js'
import {api_root} from './src/constants'

FetchHelper.fetch(`${api_root}api/data.json`)
.then(([data, status]) => { 
  // 'data' is JSON object. If server does not response JSON then 'data' is Response object.
  if (status === 200){
    //handle data
  }else{
    //show error message
  }
})
```
Or
```js
async function requestData(){
  const [data, status] = await FetchHelper.fetch(`${api_root}api/data.json`)
  if (status === 200){
    //handle data	
  }else{
    //show error message
  }
}

```

### Post JSON data
```js
import FetchHelper from './src/helpers/FetchHelper.js'
import {api_root} from './src/constants'

FetchHelper.fetch(`${api_root}api/products`, {
  method: 'POST',
  body: JSON.parse({
    name: '...',
    type: '...'
  })
}).then(([data, status]) => {
  if (status === 200){
    //handle data
  }else{
    //show error message
  }
})
```

### Post form url encoded data
```js
import FetchHelper from './src/helpers/FetchHelper.js'
import {api_root} from './src/constants'

FetchHelper.fetch(`${api_root}/api/categories`, {
  method: 'POST',
  headers: {
    'Content-Type': FetchHelper.FORM_URL_ENCODED,
  },
  body: FetchHelper.jsonToForm({
    name: '...',
    type: '...'
  })
}).then(([data, status]) => {
  if (status === 200){
    //handle data
  }else{
    //show error message
  }
})
```