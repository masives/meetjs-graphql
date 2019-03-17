import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

client
  .query({
    query: gql`
      {
        books {
          title
          author
        }
      }
    `,
  })
  .then(data => console.log(data));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Info w konsoli</p>
        </header>
      </div>
    );
  }
}

export default App;
