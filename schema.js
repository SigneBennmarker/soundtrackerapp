const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const MovieResults = new GraphQLObjectType({
  name: "MovieResults",
  fields: () => ({
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    results: {
      type: MovieResults,
      args: {
        query: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=9d1d6a6efdcd6adbf672133bfea8f1f1&language=en-US&page=1&include_adult=false&query=se7en`
          )
          .then((res) => res.data);
      },
    },
  },
});

export const schema  = new GraphQLSchema({
  query: RootQuery,
});
