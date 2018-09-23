const graphql = require('graphql')

const Store = require('../models/store')
const Product = require('../models/product')

const StoreType = require('../types/store_type')
const ProductType = require('../types/product_type')

const { GraphQLID, GraphQLObjectType, GraphQLList } = graphql

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        /** Store queries */
        store: {
            type: StoreType,
            args: { id: { type: GraphQLID} },
            resolve(parentValue, args){
                return Store.findById(args.id)
            }
        },
        stores: {
            type: GraphQLList(StoreType),
            resolve(parentValue, args){
                return Store.find({})
            }
        },
        /** Product queries */
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID}},
            resolve(parentValue, args){
                return Product.findById(args.id)
            }
        },
        products: {
            type: GraphQLList(ProductType),
            resolve(parentValue, args){
                return Product.find({})
            }
        }        
    }
})

module.exports = RootQuery