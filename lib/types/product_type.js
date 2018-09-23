const graphql = require('graphql')
const Product = require('../models/product')

const { GraphQLID, GraphQLString, GraphQLObjectType} = graphql

const StoreType = require('./store_type')
const Store = require('../models/store')

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

module.exports = ProductType