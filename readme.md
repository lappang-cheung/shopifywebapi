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

#### order(id: ID)
Takes a id parameter and return the following:
- id          : ID
- date        : String
- address     : String
- description : String
- payment     : String
- store       : Store
- lineItems   : lineItem
```
{
  store(id: "abc123"){
    id
    date
    address
    description
    payment
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
#### orders
Take no parameters and return all the orders
```
{
  orders{
    id
    date
    address
    description
    payment
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
#### lineItem(id: ID)
Takes a id parameter and return the following:
- id          : ID
- quantity    : Int
- price       : Int
- delivery    : String
- product     : Product
- order       : Order
```
{
  lineItem(id: "abc123"){
    id
    quantity
    price
    delivery
    product{
      id
      name
      description
    }
    order{
      id
      date
      address
      description
      payment
    }
  }
}
```
#### lineItems
Take no parameters and return all the orders
```
{
  lineItems{
    id
    quantity
    price
    delivery
    product{
      id
      name
      description
    }
    order{
      id
      date
      address
      description
      payment
    }
  }
}
```


#### Mutation

#### createStore(name: String!, location: String!, country: String! )
Takes three parameters and cannot be empty before creating a store object
```
{
  createStore(name: "Fakeshop", location: "Fakeplace", country:"Fakecountry"){
    id
    name
    location
    country
  }
}
```

#### editStore(id: ID, name: String, location: String, country: String)
Takes ID parameters and three optional parameters, then updates from the input given by the optional parameter
```
{
  createStore(id:"123456", name: "Fakeshop", location: "Fakeplace", country:"Fakecountry"){
    id
    name
    location
    country
  }
}
```

#### deleteStore(id: ID){
  Takes ID parameter and removes from the database
  {
    deleteStore(id: "122345"){
      id
      name
      location
      country
    }
  }
}


# Project Demo

Project link: https://graphqlapiweb.herokuapp.com/graphql

Features:
- GraphQL explorer is running on port 4000
- MongoDB for storing the data in real time
- Jest test cases has been created to test the CRUD functionality

Note(s):
- To run the testcases, please first update the ID accordingly and then type "npm run test"