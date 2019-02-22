const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolver';
import { getSigningKey, jwksOptions } from './auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // simple auth check on every request
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getSigningKey, jwksOptions, (err, decoded) => {
        if (err) {
          console.log('[jwt]', '[verify]', '[error]', err)
          return reject(err);
        }
        console.log('[jwt]', '[verify]', '[success]', decoded)
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
