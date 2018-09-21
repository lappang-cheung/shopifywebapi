This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Table of Contents

- [Shopify Web Development Challenge](#shopify-web-development-challenge)

- [Installation](#installation)

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

# Project Demo

Project link: <n/a>

Notes:
- The application uses local json server is on port 3000 and graphql is on port 4000