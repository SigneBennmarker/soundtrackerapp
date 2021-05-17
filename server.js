import {schema} from './schema.js'
const express = require('express');
const graphqlHTTP = require('graphql-express');
const app = express(); 


 
var bodyParser = require("body-parser");

const PORT = process.env.port || 5000; 
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
