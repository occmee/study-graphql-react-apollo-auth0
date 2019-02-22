import { Author, Book } from '../store';

export const resolvers = {
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
