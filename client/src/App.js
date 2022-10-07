import React from 'react';
import './App.css';
import Room from './components/room/Room';
import {QueryClientProvider, QueryClient} from "react-query"
import {ApolloClient,InMemoryCache, ApolloProvider, useQuery, gql} from '@apollo/client'

let app=0
const client = new ApolloClient({
  uri:'http://localhost:5000',
  cache:new InMemoryCache(),
})
const queryClient = new QueryClient()
function App() {
  console.log(app++, "app")
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Room/>
      </div>
    </ApolloProvider>
  );
}

export default App;
