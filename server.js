const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    pagesCount: 12,
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    pagesCount: 14,
  },
  // {
  //   title: 'Narkotyki i pornografia',
  //   author: 'Józef Piecyk',
  //   pagesCount: 300,
  // },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
    pagesCount: Int
    timeToRead: Int
  }

  type Query {
    books: [Book]
    bookByTitle(title: String): Book
  }
`;

const resolvers = {
  Query: {
    books: (rootValue, args, context) => {
      // console.log(context);
      // const userAge = context.user.age;
      // return userAge >= 18 ? books : books.filter(book => book.title !== 'Narkotyki i pornografia');
      return books;
    },
    bookByTitle: (_, args) => {
      return books.find(book => book.title === args.title);
    },
  },
  Book: {
    timeToRead: book => {
      return book.pagesCount * 2;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: () => ({
  //   user: {
  //     type: 'admin',
  //     age: 15,
  //   },
  // }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
