import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
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
      timeToRead
    }
  }
`;

const BooksList = () => (
  <Query query={GET_BOOKS}>
    {({ loading, error, data, refetch }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>pagesCount</th>
              <th>timeToRead</th>
            </tr>
          </thead>
          <tbody>
            {data.books.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pagesCount}</td>
                <td>{book.timeToRead}</td>
              </tr>
            ))}

            <tr>
              <td>
                <button onClick={() => refetch()}>refetch</button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }}
  </Query>
);

const ADD_BOOK = gql`
  mutation AddBook($newBook: newBook!) {
    addBook(newBook: $newBook) {
      title
      author
      pagesCount
    }
  }
`;

const AddBook = () => {
  let title;
  let author;
  let pagesCount;

  return (
    <Mutation mutation={ADD_BOOK} onCompleted={data => alert('udało się ' + data.addBook.title)}>
      {(addBook, { data, error }) => {
        if (data) {
          return <p>Dziękujemy za wpis</p>;
        }
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              addBook({
                variables: {
                  newBook: {
                    title: title.value,
                    author: author.value,
                    pagesCount: parseInt(pagesCount.value, 10),
                  },
                },
              });
            }}
          >
            {error && <h2 style={{ color: 'red' }}> {error.toString()} </h2>}
            <label htmlFor="title">
              title
              <input
                id="title"
                ref={node => {
                  title = node;
                }}
              />
            </label>
            <br />
            <label htmlFor="author">
              author
              <input
                id="author"
                ref={node => {
                  author = node;
                }}
              />
            </label>
            <br />
            <label htmlFor="pagesCount">
              pagesCount
              <input
                id="pagesCount"
                ref={node => {
                  pagesCount = node;
                }}
              />
            </label>
            <br />
            <input type="submit" value="submit " />
          </form>
        );
      }}
    </Mutation>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <AddBook />
          <br />
          <BooksList />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
