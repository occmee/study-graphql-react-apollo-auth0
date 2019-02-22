const { ApolloServer } = require('apollo-server');

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolver';
import { client, getKey, options } from './auth';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
