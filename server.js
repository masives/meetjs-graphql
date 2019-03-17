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
    # bookByTitle(title: String): Book
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    // bookByTitle: (_, args) => {
    //   return books.find(book => book.title === args.title);
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
