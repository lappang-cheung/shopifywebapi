// Need to connect with the database
const axios = require('axios')

describe('lineitems', () => {

    test('create product', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    addLineItem(quantity:1, price: 600, delivery:"rush", productId:"5ba8310707162d2e147210b3", orderId:"5ba8341fd59f8e2f5457cfc4"){
                        quantity
                        price
                        delivery
                        product{
                            id
                            name
                            description
                        }
                        order{
                            id
                            address
                        }
                    }
                }
            `
        })
        // Expected results of stores
        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "addLineItem": {
                    "quantity": 1,
                    "price": 600,
                    "delivery": "rush",
                    "product": {
                        "id": "5ba8310707162d2e147210b3",
                        "name": "Iphone 4s",
                        "description": "latest iphone"
                    },
                    "order": {
                        "id": "5ba8341fd59f8e2f5457cfc4",
                        "address": "123 Fake Street"
                    }
                }
            }
        })
    })
})