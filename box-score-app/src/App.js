import React from 'react';
// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Import your components here
import NBA from './Components/NBA/NBA';
import MLB from './Components/MLB/MLB';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000', // Replace with your GraphQL server URL
//   cache: new InMemoryCache(),
// });

export default function App() {
  return (
      <div className="App">
        <NBA />
        <MLB />
      </div>
  );
}
