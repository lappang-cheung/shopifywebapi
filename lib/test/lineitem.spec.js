// Need to connect with the database
const axios = require('axios')

/**
 * Line Items test case for Add, Edit and Delete
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Note: Testcase might not work due to the Id differnt, please replace before using *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
describe('lineitems', () => {
    // Add test case
    test('add line items', async() => {
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
        // Expected results
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
    // Edit test case
    test('edit line items', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    editLineItem(id:"5ba8378d3b74b030abf76b70", quantity:2){
                        quantity
                        delivery
                        product{
                            name
                        }
                        order{
                            description
                            address
                        }
                    }
                }
            `
        })
        // Expected line item result(s)
        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "editLineItem": {
                    "quantity": 2,
                    "delivery": "rush",
                    "product": {
                        "name": "Iphone 4s"
                    },
                    "order": {
                        "description": "Iphone order",
                        "address": "123 Fake Street"
                    }
                }
            }
        })
    })

    // Delete test case
    test('delete line items', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    deleteLineItem(id:"5ba836c61ae7b0303dfeab99"){
                        id
                    }
                 }
            `
        })
        // Expected delete result(s)
        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "deleteLineItem": {
                    "id": "5ba836c61ae7b0303dfeab99"
                }
            }
        })
    })
})