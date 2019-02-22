const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');

import { Author, Book } from './store';

const books = [
  { id: 1, title: 'The Trials of Brother Jero', cover_image_url: 'ssdsds', average_rating: 8, authorId: 1 },
  { id: 2, title: 'Half of a Yellow Sun', cover_image_url: 'dsdsds', average_rating: 9, authorId: 3 },
  { id: 3, title: 'Americanah', cover_image_url: 'dsdsds', average_rating: 9, authorId: 3 },
  { id: 4, title: 'King Baabu', cover_image_url: 'sdsds', average_rating: 7, authorId: 1 },
  { id: 5, title: 'Children of Blood and Bone', cover_image_url: 'sdsds', average_rating: 7, authorId: 2 },
];

const authors = [
  { id: 1, first_name: 'Wole', last_name: 'Soyinka' },
  { id: 2, first_name: 'Tomi', last_name: 'Adeyemi' },
  { id: 3, first_name: 'Chimamanda', last_name: 'Adichie' },
];

const typeDefs = gql`
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

let book_id = 5;
let author_id = 3;

const resolvers = {
  Query: {
    books: () => Book.findAll(),
    book: (_, args) => Book.find({ where: args }),
    author: (_, args) => Author.find({ where: args })
  },
  Mutation: {
    addBook: (_, { title, cover_image_url, average_rating, authorId }) => {

      return Book.create({
        title,
        cover_image_url,
        average_rating,
        authorId
      }).then(book => {
        return book;
      });
    }
  },
  Author: {
    books: (author) => author.getBooks(),
  },
  Book: {
    author: (book) => book.getAuthor(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});