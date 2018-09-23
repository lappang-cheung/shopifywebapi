const graphql = require('graphql')
const { GraphQLSchema } = graphql

const RootQuery = require('../query/root_query')
const mutation = require('../mutation/mutations')

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})