const graphql = require('graphql')
const Store = require('../models/store')

const { GraphQLID, GraphQLString, GraphQLObjectType} = graphql

const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        country: {type: GraphQLString}
    })
})

module.exports = StoreType