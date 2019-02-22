const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolver';
import { getSigningKey, jwtOptions } from './auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // simple auth check on every request
    const token = req.headers.authorization;
    if (!token || token === 'undefined') {
      return {};
    }
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getSigningKey, jwtOptions, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded.email);
      });
    });

    return {
      user
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
