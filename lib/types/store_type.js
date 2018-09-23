const graphql = require('graphql')

const Product = require('../models/product')
const ProductType = require('../types/product_type')

const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLList} = graphql

const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        country: {type: GraphQLString},
        products:{
            type: GraphQLList(ProductType),
            resolve(parentValue, args){
                return Product.find({storeId: parentValue.id})
            }
        }
    })
})

module.exports = StoreType