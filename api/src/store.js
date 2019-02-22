const Sequelize = require('sequelize');
const casual = require('casual');
import _ from 'lodash';

const db = new Sequelize('coolreads', null, null, {
  dialect: 'sqlite',
  storage: './coolreads.sqlite',
});

const AuthorModel = db.define('author', {
  first_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
});

const BookModel = db.define('book', {
  title: { type: Sequelize.STRING },
  cover_image_url: { type: Sequelize.STRING },
  average_rating: { type: Sequelize.STRING },
});

AuthorModel.hasMany(BookModel);
BookModel.belongsTo(AuthorModel);

const cover_images = [
  'https://images-fe.ssl-images-amazon.com/images/I/51FUYfErOXL._SL150_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/51WiLueukSL._SL150_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/61ZG-hATOeL._SL150_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/51BYvW62kxL._SL150_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/51n2EH5szTL._AC_US200_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/515nBNa1xXL._AC_US200_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/51o95aW415L._AC_US200_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/51D1yNnt3SL._AC_US200_.jpg',
  'https://images-fe.ssl-images-amazon.com/images/I/51WhCEcSLjL._AC_US200_.jpg',
]

// create mock data with a seed, so we always get the same
casual.seed(11111);
db.sync({ force: true }).then(() => {
  _.times(cover_images.length, () => {
    return AuthorModel.create({
      first_name: casual.first_name,
      last_name: casual.last_name,
    }).then((author) => {
      return author.createBook({
        title: casual.title,
        cover_image_url: cover_images[author.id-1],
        average_rating: casual.integer(3, 10),
      });
    });
  });
});

const Author = db.models.author;
const Book = db.models.book;

export { Author, Book };