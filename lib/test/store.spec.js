// Need to connect with the database
const axios = require('axios')

/**
 * Store test case for Add, Edit and Delete
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Note: Testcase might not work due to the Id differnt, please replace before using *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

describe('stores', () => {
    // Create some stores
    test('create store', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    cc:createStore(name: "Canada Computers", location: "Markham", country:"Canada"){
                        name
                        location
                        country
                    },
                    fs:createStore(name: "FutureShop", location: "Scarbrough", country:"Canada"){
                        name
                        location
                        country
                    },
                    bb:createStore(name: "Bestbuy", location: "Richmond Hill", country:"Canada"){
                        name
                        location
                        country
                    },
                    rs:createStore(name: "RadioShack", location: "Toronto", country: "Canada"){
                        name
                        location
                        country
                    },
                    rc:createStore(name: "Roger Cellcular", location: "Mississuage", country: "Canada"){
                        name
                        location
                        country
                    }
                }
            `
        })
        // Expected results of stores
        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "cc": {
                  "name": "Canada Computers",
                  "location": "Markham",
                  "country": "Canada"
                },
                "fs": {
                  "name": "FutureShop",
                  "location": "Scarbrough",
                  "country": "Canada"
                },
                "bb": {
                  "name": "Bestbuy",
                  "location": "Richmond Hill",
                  "country": "Canada"
                },
                "rs": {
                  "name": "RadioShack",
                  "location": "Toronto",
                  "country": "Canada"
                },
                "rc": {
                  "name": "Roger Cellcular",
                  "location": "Mississuage",
                  "country": "Canada"
                }
            }
        })
    })

    // Edit Stores
    test('edit store', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    rc:editStore(id: "5ba82c256230352bf64db4af", name:"Rogers Mobile"){
                        name
                        id
                    }
                }
            `
        })

        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "rc": {
                    "name": "Rogers Mobile",
                    "id": "5ba82c256230352bf64db4af"
                }
            }
        })
    })

    // Delete store
    test('delete store', async() => {
        const response = await axios.post('http://localhost:4000/graphql',{
            query: `
                mutation{
                    rc:deleteStore(id: "5ba82c256230352bf64db4af"){
                        name
                        id
                    }
                }
            `
        })

        const { data } = response
        expect(data).toMatchObject({
            "data": {
                "rc": {
                    "name": "Rogers Mobile",
                    "id": "5ba82c256230352bf64db4af"
                }
            }
        })
    })
})