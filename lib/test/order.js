// Need to connect with the database
const axios = require('axios')

describe('orders', () => {

    test('create order', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    iphone:addOrder(date: "01-04-2018", address:"123 Fake Street", description: "Iphone order", payment: "visa", storeId: "5ba82c256230352bf64db4ab"){
                        date
                        address
                        description
                        payment
                        store{
                            name
                        }
                    }
                    macbook:addOrder(date: "01-04-2020", address:"123 Fake Street", description: "macbook order", payment: "visa", storeId: "5ba82d8e00fd972c99378eb1"){
                        date
                        address
                        description
                        payment
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
                "iphone": {
                    "date": "01-04-2018",
                    "address": "123 Fake Street",
                    "description": "Iphone order",
                    "payment": "visa",
                    "store": {
                        "name": "Canada Computers"
                    }
                },
                "macbook": {
                    "date": "01-04-2020",
                    "address": "123 Fake Street",
                    "description": "macbook order",
                    "payment": "visa",
                    "store": {
                        "name": "FutureShop"
                    }
                }
            }
        })
    })

    test('edit order date', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    editOrder(id: "5ba8341fd59f8e2f5457cfc5", date: "09-09-2020"){
                        date
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
                "editOrder": {
                    "date": "09-09-2020",
                    "description": "macbook order",
                    "store": {
                        "name": "FutureShop"
                    }
                }
            }
        })
    })
})