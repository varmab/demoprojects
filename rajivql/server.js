var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
     id: ID!
     name: String
  }

  type Query {
    user(id: ID!): User
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  user: (_,args) => {
    //query database by args.id and return result
    return {id:1, name:"Varma"};
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);