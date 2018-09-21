const graphql = require('graphql')
const _ = require('lodash')
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql



const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        country: {type: GraphQLString},
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/stores/${parentValue.id}/products`)
                    .then(response => response.data)
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        store: {
            type: StoreType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/stores/${parentValue.storeId}`)
                    .then(response => response.data)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        store: {
            type: StoreType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/stores/${args.id}`)
                    .then(response => response.data)
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/products/${args.id}`)
                    .then(response => response.data)
            }
        }    
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        /** Product mutation methods */
        // Store mutation
        createStore:{
            type: StoreType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                country: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, {name, location, country}){
                return axios.post('http://localhost:3000/stores', {name, location, country})
                    .then(response => response.data)
            }
        },
        // Edit the store
        editStore:{
            type: StoreType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                location: { type: GraphQLString },
                country: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return axios.patch(`http://localhost:3000/stores/${args.id}`, args)
                    .then(response => response.data)
            }
        },
        // Delete the store
        deleteStore: {
            type: StoreType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }){
                return axios.delete(`http://localhost:3000/stores/${id}`)
            }
        },
        /** Product mutation methods */
        // Adding the product
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                storeId: { type: GraphQLString}
            },
            resolve(parentValue, {name, description, storeId}){
                return axios.post('http://localhost:3000/products', {name, description, storeId})
                    .then(response => response.data)
            }
        },
        // Edit the product
        editProduct:{
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                storeId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return axios.patch(`http://localhost:3000/products/${args.id}`, args)
                    .then(response => response.data)
            }
        },
        // Deleting the product
        deleteProduct: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, {id} ){
                return axios.delete(`http://localhost:3000/products/${id}`)
                    .then(response => response.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})