// Need to connect with the database
const axios = require('axios')

describe('products', () => {

    test('create product', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    mac:addProduct(name:"Macbook Pro 2016 Retina", description:"Apple laptop", storeId: "5ba82c256230352bf64db4ad"){
                        name
                        description
                        store{
                            name
                        }
                    },
                    ip:addProduct(name:"Iphone 4s", description:"latest iphone", storeId: "5ba82d8e00fd972c99378eb1"){
                        name
                        description
                        store{
                            name
                        }
                    }
                }
            `
        })
        // Expected results of stores
        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "mac": {
                    "name": "Macbook Pro 2016 Retina",
                    "description": "Apple laptop",
                    "store": {
                        "name": "Bestbuy"
                    }
                },
                "ip": {
                    "name": "Iphone 4s",
                    "description": "latest iphone",
                    "store": {
                        "name": "FutureShop"
                    }
                }
            }
        })
    })

    test('edit product', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    editProduct(id: "5ba82ec6ebf3e62d00ac7ed5", description: "first glass iphone"){
                    name
                    description
                        store{
                            name
                            location
                        }
                    }
                }
            `
        })
        // Expected results of stores
        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "editProduct": {
                    "name": "Iphone 4s",
                    "description": "first glass iphone",
                    "store": {
                        "name": "FutureShop",
                        "location": "Scarbrough"
                    }
                }
            }
        })
    })

    test('product(s) own by store', async() => {
        const response = await axios.post('http://localhost:4000/graphql', {
            query: `
                query {
                    products{
                    name
                    description
                        store{
                            name
                            location
                        }
                    }
                }
            `
        })

        const { data } = response
        expect(data).toMatchObject({
            
            "data": {
                "products": [
                    {
                        "name": "Macbook Pro 2016 Retina",
                        "description": "Apple laptop",
                        "store": {
                        "name": "Bestbuy",
                        "location": "Richmond Hill"
                        }
                    },
                    {
                        "name": "Iphone 4s",
                        "description": "first glass iphone",
                        "store": {
                        "name": "FutureShop",
                        "location": "Scarbrough"
                        }
                    }
                ]
            }
        })
    })

    test('delete product', async() => {
        const response = await axios.post('http://localhost:4000/graphql', {
            query: `
                mutation{
                    deleteProduct(id: "5ba830e26518f02df574cddb"){
                        name
                        id
                    }
                }
            `
        })

        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "deleteProduct": {
                  "name": "Iphone 4s",
                  "id": "5ba830e26518f02df574cddb"
                }
            }
        })
    })
})