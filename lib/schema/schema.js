const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql

const stores = [
    { id: '1', name: 'ToyRus', location: 'Toronto', country: 'CA' },
    { id: '2', name: 'BestBuy', location: 'Scarbrough', country: 'CA' }
]

const UserType = new GraphQLObjectType({
    name: 'Store',
    fields: {
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        country: {type: GraphQLString}
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        store: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args){
                return _.find(stores, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})