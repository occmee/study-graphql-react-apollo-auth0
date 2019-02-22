const { AuthenticationError } = require('apollo-server');
import { Author, Book } from '../store';

export const resolvers = {
  Query: {
    books: () => Book.findAll(),
    book: (_, args) => Book.find({ where: args }),
    author: (_, args) => Author.find({ where: args })
  },
  Mutation: {
    addBook: async (_, { title, cover_image_url, average_rating, authorId }, { user }) => {
      try {
        const email = await user; // catching the reject from the user promise.
        const book = await Book.create({
          title,
          cover_image_url,
          average_rating,
          authorId
        });
        return book;
      } catch (e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    }
  },
  Author: {
    books: (author) => author.getBooks(),
  },
  Book: {
    author: (book) => book.getAuthor(),
  },
};
