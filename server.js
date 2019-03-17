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
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
    pagesCount: Int
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return books;
      return new Promise(resolve =>
        setTimeout(() => {
          return resolve(books);
        }, 2500)
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
