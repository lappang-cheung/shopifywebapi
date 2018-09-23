const graphql = require('graphql')

const Store = require('../models/store')
const Product = require('../models/product')

const StoreType = require('../types/store_type')
const ProductType = require('../types/product_type')

const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } = graphql

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
                const store = new Store({
                    name,
                    location,
                    country
                })

                return store.save()
            }
        },
        // Edit the store
        editStore:{
            type: StoreType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                location: { type: GraphQLString },
                country: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return Store.findOneAndUpdate(
                    { _id: args.id },
                    { $set: args },
                    { new: true}
                )
            }
        },
        // Delete the store
        deleteStore: {
            type: StoreType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, { id }){
                return Store.findOneAndRemove(
                    {_id: args.id}
                )
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
                const product = new Product({
                    name,
                    description,
                    storeId
                })

                return product.save()
            }
        }
    }
})

module.exports = mutation