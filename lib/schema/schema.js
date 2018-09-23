const graphql = require('graphql')

const Store = require('../models/store')
const Product = require('../models/product')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql

const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        country: {type: GraphQLString},
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args){
                return Product.find({ storeId: parentValue.id })
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parentValue, args){
                return Product.find({ orderId: parentValue.id })
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        // Product has one store
        store: {
            type: StoreType,
            resolve(parentValue, args){
                return Store.findById(parentValue.storeId)
            }
        }
    })
})

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID},
        date: { type: GraphQLString },
        address: { type: GraphQLString },
        description: { type: GraphQLString },
        payment: { type: GraphQLString},
        // Order has one store
        store: {
            type: StoreType,
            resolve(parentValue, args){
                return Store.findById(parentValue.storeId)
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        store: {
            type: StoreType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(books, { id: args.id })
                return Store.findById(args.id)
            }
        },
        stores: {
            type: new GraphQLList(StoreType),
            resolve(parent, args){
                return Store.find({})
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(books, { id: args.id })
                return Product.findById(args.id)
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({})
            }
        }
        
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})