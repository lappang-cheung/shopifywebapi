const graphql = require('graphql')
const Store = require('../models/store')
const StoreType = require('../types/store_type')

const { GraphQLID, GraphQLObjectType } = graphql

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        store: {
            type: StoreType,
            args: { id: { type: GraphQLID} },
            resolve(parentValue, args){
                return Store.findById(args.id)
            }
        }
    }
})

module.exports = RootQuery