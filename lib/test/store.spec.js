const axios = require('axios')

describe('stores', () => {
    test('stores' , async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                query {
                    stores{
                    name
                    location
                    country
                    id
                  }
                }
            `
        })

        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "stores": [
                  {
                    "name": "Canada Computers",
                    "location": "Markham",
                    "country": "Canada",
                    "id": "5ba7f9c8d8bb661cc4d93dc5"
                  }
                ]
            }
        })
    })
})