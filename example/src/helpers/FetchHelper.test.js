import fetchHelper from './FetchHelper.js'



describe('fetchHelper.fetch()', () => {

    test('when server return json', async () => {
        const responseJson = {data: 'any'}
        global.fetch = (uri) => new Promise((resolve, reject) => {
            resolve({
                status: 200,
                json: function(){
                    return responseJson
                }
            })
        })
        const [data, status] = await fetchHelper.fetch()
        expect(data).toEqual(responseJson)
        expect(status).toBe(200)
    })

    test('when server return no json', async () => {
        const response = {
            status: 200,
            json: function(){
                JSON.parse('')
            }
        }
        global.fetch = (uri) => new Promise((resolve, reject) => {
            resolve(response)
        })
        const [data, status] = await fetchHelper.fetch()
        expect(status).toBe(200)
        expect(data).toBe(response)
    })
})



