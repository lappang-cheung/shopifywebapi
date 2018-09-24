const graphql = require('graphql')

const Store = require('../models/store')
const Product = require('../models/product')
const Order = require('../models/order')
const LineItem = require('../models/lineItem')

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
        },
        lineItems: {
            type: new GraphQLList(LineItemType),
            resolve(parentValue, args){
                return LineItem.find({ productId: parentValue.id})
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
        },
        lineItems: {
            type: new GraphQLList(LineItemType),
            resolve(parentValue, args){
                return LineItem.find({ orderId: parentValue.id})
            }
        }
    })
})

const LineItemType = new GraphQLObjectType({
    name: 'LineItem',
    fields: () => ({
        id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt },
        delivery: { type: GraphQLString },
        // Line item has one product
        product: {
            type: ProductType,
            resolve(parentValue, args){
                return Product.findById(parentValue.productId)
            }
        },
        // Line item has one order
        order: {
            type: OrderType,
            resolve(parentValue, args){
                return Order.findById(parentValue.orderId)
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
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(books, { id: args.id })
                return Order.findById(args.id)
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args){
                return Order.find({})
            }
        },
        lineItem: {
            type: LineItemType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(books, { id: args.id })
                return LineItem.findById(args.id)
            }
        },
        lineItems: {
            type: new GraphQLList(LineItemType),
            resolve(parent, args){
                return LineItem.find({})
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
                    { new: true }
                )
            }
        },
        // Delete the store
        deleteStore: {
            type: StoreType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, args){
                return Store.findOneAndDelete({ _id: args.id })
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
        },
        // Edit the product
        editProduct:{
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                storeId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return Product.findOneAndUpdate(
                    { _id: args.id },
                    { $set: args },
                    { new: true }
                )
            }
        },
        // Deleting the product
        deleteProduct: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, args ){
                return Product.findOneAndDelete({ _id: args.id })
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
                const order = new Order({
                    date,
                    address,
                    description,
                    payment,
                    storeId
                })
                return order.save()
            }
        },
         // Edit the order
         editOrder:{
            type: OrderType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                date: { type: GraphQLString },
                address: { type: GraphQLString },
                description: { type: GraphQLString },
                payment: { type: GraphQLString },
                storeId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return Order.findOneAndUpdate(
                    { _id: args.id },
                    { $set: args },
                    { new: true }
                )
            }
        },
        // Deleting the order
        deleteOrder: {
            type: OrderType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, args ){
                return Order.findOneAndDelete({ _id: args.id })
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
                const lineItem = new LineItem({
                    quantity,
                    price,
                    delivery,
                    productId,
                    orderId
                })
                return lineItem.save()
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
                return LineItem.findOneAndUpdate(
                    { _id: args.id },
                    { $set: args },
                    { new: true }
                )
            }
        },
        // Deleting the order
        deleteLineItem: {
            type: LineItemType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args ){
                return LineItem.findOneAndDelete({ _id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})