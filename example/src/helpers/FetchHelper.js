/**
 *  Wrapper for Fetch API (https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
 *  Inspired by Angular 1's $http service.
 *  Support setup default headers and interceptors.
 *  Future note: Consider using service worker instead of this for more standard solution.
 *  Example usage: 
 *
 *  import FetchHelper from './FetchHelper.js'
 *  
 *  // call this on app start:
 *  FetchHelper.addAfterResonseInterceptor((response, jsonData) => {
 *      if (response.status === 500){
 *          //handle 500 error
 *      }
 *  })
 *  
 *  // call this to fetch data from server. `FetchHelper.fetch()` has the same parameters as Fetch API
 *  FetchHelper.fetch(`http://your.api.root/data.json`)
 *  .then(([data, status]) => {
 *      if (status === 200){
 *          //do something with data
 *      }else{
 *          //handle error  
 *      }
 *  })
 */
class FetchHelper {
    
    FORM_URL_ENCODED = 'application/x-www-form-urlencoded';

    constructor() {
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        }
        this.beforeRequestInterceptors = []
        this.afterResponseInterceptors = []
    }

    /**
     *  Add default header to each Fetch request.
     */
    addDefaultHeader(key, value) {
        this.defaultHeaders[key] = value
    }
    /**
     *  Remove default header
     */
    removeDefaultHeader(key) {
        delete this.defaultHeaders[key]
    }
    /**
     *  To define something to do before every fetch request.
     *  Params:
     *      TBD
     *  Result:
     *      Returns a function to remove added interceptor.
     *  Future note: Consider using Service Worker
     */
    addBeforeRequestInterceptor(interceptor) {
        this.beforeRequestInterceptors.push(interceptor)
        return () => {
            const index = this.beforeRequestInterceptors.indexOf(interceptor)
            this.beforeRequestInterceptors.splice(index, 1)
        }
    }
    /**
     *  To define something to do after every fetch response.
     *  If one of interceptors returns false, the process will be stop immediately.
     *  Params:
     *      interceptor: function (response, jsonData)
     *  Result:
     *      Returns a function to remove added interceptor.
     *  Future note: Consider using Service Worker
     */
    addAfterResonseInterceptor(interceptor) {
        this.afterResponseInterceptors.push(interceptor)
        return () => {
            const index = this.afterResponseInterceptors.indexOf(interceptor)
            this.afterResponseInterceptors.splice(index, 1)
        }
    }
    jsonToForm(json = {}){
        return Object.keys(json).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        }).join('&')
    }

    async fetch(input, init = {}) {
        let initWithDefaultHeaders = {
            ...init,
            headers: mergeWithDefaultHeaders(init.headers, this.defaultHeaders)
        }
        let beforeRequestInterceptorsResult = applyBeforeRequestInterceptors(this.beforeRequestInterceptors)
        if (beforeRequestInterceptorsResult === false){
            throw new Error('Fetch Promise was canceled by interceptor before requested')   
        }
        let response
        try{
            response = await fetch.apply(null, [input, initWithDefaultHeaders])
        }catch(e){
            console.error(e)
            applyAfterResponseInterceptors(e, this.afterResponseInterceptors)
            return [e, -1]
        }

        const responseStatus = response.status
        let jsonData = null
        try{
            jsonData = await response.json()
            let afterResponseInterceptorsResult = applyAfterResponseInterceptors(response, this.afterResponseInterceptors, jsonData)
            if (afterResponseInterceptorsResult === false) {
                throw new Error('Fetch Promise was canceled by interceptor after responded')
            }
            return [jsonData, responseStatus]
        }catch(e){
            if (!jsonData){
                let afterResponseInterceptorsResult = applyAfterResponseInterceptors(response, this.afterResponseInterceptors, jsonData)
                if (afterResponseInterceptorsResult === false) {
                    throw new Error('Fetch Promise was canceled by interceptor after responded')
                }   
            }
            console.warn(`Can not parse json from response of API "${input}" with code ${responseStatus}.`, e)
            return [response, responseStatus]
        }
    }

    getHeader(){
        return this.defaultHeaders;
    }
}

/*** PRIVATE METHODS: ***/

function mergeWithDefaultHeaders(headers = {}, defaultHeaders) {
    var headerObj = {}
    if (headers instanceof Headers) {
        for (let [key, value] of headers) {
            headerObj[key] = value
        }
    } else {
        headerObj = headers
    }

    return Object.assign({}, defaultHeaders, headers)
}

function applyBeforeRequestInterceptors(interceptors) {
    for (let interceptor of interceptors) {
        try{
            const interceptorResult = interceptor()
            if (interceptorResult === false) {
                console.error('Interceptor ', interceptor, ' has cancel signal. This makes the request stop immediately.')
                return false
            }    
        }catch(e){
            console.error(`[FetchHelper] Error from interceptor ${interceptor}`, e)
            return false
        }
    }
    //interceptors.forEach(interceptor => interceptor())
}

function applyAfterResponseInterceptors(response, interceptors, jsonData) {
    for (let interceptor of interceptors) {
        try{
            const interceptorResult = interceptor(response, jsonData)
            if (interceptorResult === false) {
                console.error('Interceptor ', interceptor, ' has cancel signal. This makes the request stop immediately.')
                return false
            }    
        }catch(e){
            console.error(`[FetchHelper] Error from interceptor ${interceptor}`, e)
            return false
        }
    }
}


const fetchHelperInstance = new FetchHelper()

export default fetchHelperInstance
