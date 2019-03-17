import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const GET_BOOKS = gql`
  {
    books {
      title
      author
      pagesCount
      # timeToRead
    }
  }
`;

const BooksList = () => (
  <Query query={GET_BOOKS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>pagesCount</th>
              {/* <th>timeToRead</th> */}
            </tr>
          </thead>
          <tbody>
            {data.books.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pagesCount}</td>
                {/* <td>{book.timeToRead}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <BooksList />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
