This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Table of Contents

- [Shopify Web Development Challenge](#shopify-web-development-challenge)

- [Installation](#installation)

- [Documentations](#documentations)

- [Project Demo](#project-demo)


# Shopify Web Development Challenge

Create a web api for e-commerce platform.

### Instructions
Please design a web API that models the following simple relationship:  
Shops have many Products  Shops have many Orders Products have many Line Items Orders have many Line Items 
 
Line items refer to any service or product added to an order, along with any quantities, rates, and prices that pertain to them. 
 
For example, if you buy a carton of milk and a loaf of bread at the grocery store, your bill (the representation of your order) will have two line items on it. One for the carton of milk, and the other for the loaf of bread. 
 
Requirements for each object type 
 
Products, Line Items and Orders all need a dollar value The value of a Line Item should map to the value of the Product that the Line Item represents The total value of an Order should equal the sum of the values of all of its Line Items 
 
#### Demo requirements 
 
All of the functionality of your API should be documented so we know what it does, and how to interact with it. 
 
When using your API, there should be at least one shop, one product, one line item, and one order to query. Feel free to commit your data file, include a seed file to populate the db or find some other way to make sure that the app we’ll be testing has data in it. 

# Installation

Requirements:
- NodeJs installed with lastest release and ReactJs version 16+
 
1. First run "npm install" to install the node packages
2. To execute the application have two windows open
3. First execute "npm run json:server" on first window and execute "npm run start"
4. Graphql server is located on "http://localhost:4000/graphql"

# Documentations

### RootQueryType

#### store(id: ID)
Takes a id parameter and return the following:
- id       : ID
- name     : String
- location : String
- country  : String
- products : Products
- orders   : Order

```
{
  store(id: "abc123"){
    id
    name
    location
    country
    products{
      id
      name
      description
    }
    orders{
      id
      date
      description
      payment
    }
  }
}
```

#### stores
Take no parameters and return all the stores
```
{
  stores{
    id
    name
    location
    country
    products{
      id
      name
      description
    }
    orders{
      id
      date
      description
      payment
    }
  }
}
```
#### product(id: ID)
Takes a id parameter and return the following:
- id          : ID
- name        : String
- description : String
- store       : Store
- lineItems   : lineItem
```
{
  product(id: "abc123"){
    id
    name
    description
    store{
      id
      name
      location
      country
    }
    lineItems{
      id
      quantity
      price
      delivery
    }
  }
}
```
#### products
Take no parameters and return all the products
```
{
  products{
    id
    name
    description
    store{
      id
      name
      location
      country
    }
    lineItems{
      id
      quantity
      price
      delivery
    }
  }
}
```
#### Mutation



In order to query an elements, please use this syntax examples:

```
// Store details
// Return id, name, location & country
{
    store(id: "1"){
        id
        name
        location
        country
    }
}
```

```
// Store details with nested information
// Able to pull product details associated with the store
store(id:"1"){
    id
    name
    location,
    country
    product{
        id
        name
        description
        store
    }
}
```

In order to do CRUD elements, please with this syntax examples:

```
// Adding line item
/** 
  * 1. "mutation" keyword must be present before executing the operation
  * 2. Call the method and put in the required parameters also values
  * 3. Add in all the parameters you want to display after the execution is done
*/
mutation{
  addLineItem(quantity: 2, price: 50, delivery: "rush", productId:"1", orderId: "1"){
    id
    price
    delivery
    product{
      name
    }
    order{
     	description 
    }
  }
}
```

# Project Demo

Project link: https://graphqlapiweb.herokuapp.com/graphql

Features:
- GraphQL explorer is running on port 4000
- MongoDB for storing the data in real time
- Jest test cases has been created to test the CRUD functionality

Note(s):
- To run the testcases, please first update the ID accordingly and then type "npm run test"