const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Author {
    id: Int!
    first_name: String!
    last_name: String!
    books: [Book]!
  }

  type Book {
    id: Int!
    title: String!
    cover_image_url: String!
    average_rating: Float!
    author: Author!
  }

  type Query {
    books: [Book!]!,
    book(id: Int!): Book!
    author(id: Int!): Author!
  }

  type Mutation {
    addBook(title: String!, cover_image_url: String!, average_rating: Float!, authorId: Int!): Book!
  }
`;
