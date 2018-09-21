const graphql = require('graphql')
const _ = require('lodash')
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = graphql


/** Different GraphQL Object Types */

// Store
const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        country: {type: GraphQLString},
        // Store has many products
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/stores/${parentValue.id}/products`)
                    .then(response => response.data)
            }
        },
        // Product has one order
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/stores/${parentValue.id}/orders`)
                    .then(response => response.data)
            }
        }
    })
})

// Product
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        // Product has one store
        store: {
            type: StoreType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/stores/${parentValue.storeId}`)
                    .then(response => response.data)
            }
        },
        // Product has many line items
        lineItems: {
            type: new GraphQLList(LineItemType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/products/${parentValue.id}/lineItems`)
                    .then(response => response.data)
            }
        }
    })
})

// Order
const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLString },
        date: { type: GraphQLString },
        address: { type: GraphQLString },
        description: { type: GraphQLString },
        payment: { type: GraphQLString},
        // Order has one store
        store: {
            type: StoreType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/stores/${parentValue.storeId}`)
                    .then(response => response.data)
            }
        },
        //  Order has many line items
        lineItems: {
            type: new GraphQLList(LineItemType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/orders/${parentValue.id}/lineItems`)
                    .then(response => response.data)
            }
        }
    })
})

// Line Item
const LineItemType = new GraphQLObjectType({
    name: 'LineItem',
    fields: () => ({
        id: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt },
        delivery: { type: GraphQLString },
        // Line item has one product
        product: {
            type: ProductType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/products/${parentValue.productId}`)
                    .then(response => response.data)
            }
        },
        // Line item has one order
        order: {
            type: OrderType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/orders/${parentValue.orderId}`)
                    .then(response => response.data)
            }
        }
    })
})

/** Querying the GraphQL Object types */
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
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/orders/${args.id}`)
                    .then(response => response.data)
            }
        },
        lineItem: {
            type: LineItemType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/lineItems/${args.id}`)
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
        },

         /** Order mutation methods */
        //  Add the order
        addOrder: {
            type: OrderType,
            args: {
                date: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                payment: { type: new GraphQLNonNull(GraphQLString)},
                storeId: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {date, address, description, payment, storeId}){
                return axios.post('http://localhost:3000/orders', {date, address, description, payment, storeId})
                    .then(response => response.data)
            }
        },
         // Edit the order
         editOrder:{
            type: OrderType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                description: { type: GraphQLString },
                payment: { type: GraphQLString },
                storeId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return axios.patch(`http://localhost:3000/orders/${args.id}`, args)
                    .then(response => response.data)
            }
        },
        // Deleting the order
        deleteOrder: {
            type: OrderType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, {id} ){
                return axios.delete(`http://localhost:3000/orders/${id}`)
                    .then(response => response.data)
            }
        },

        /** Line Item mutation methods */
        // Add the line item
        addLineItem:{
            type: LineItemType,
            args:{
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                delivery: { type: new GraphQLNonNull(GraphQLString)},
                productId: { type: new GraphQLNonNull(GraphQLString)},
                orderId: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {quantity, price, delivery, productId, orderId}){
                return axios.post('http://localhost:3000/lineItems', {quantity, price, delivery, productId, orderId})
                    .then(response => response.data)
            }
        },
        // Edit the line item
        editLineItem:{
            type: LineItemType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: GraphQLInt  },
                price: { type: GraphQLInt  },
                delivery: { type: GraphQLString },
                productId: { type: GraphQLString },
                orderId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return axios.patch(`http://localhost:3000/lineItems/${args.id}`, args)
                    .then(response => response.data)
            }
        },
        // Deleting the order
        deleteLineItem: {
            type: LineItemType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, {id} ){
                return axios.delete(`http://localhost:3000/lineItems/${id}`)
                    .then(response => response.data)
            }
        }
    }
})

// Exporting the query and mutations
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})