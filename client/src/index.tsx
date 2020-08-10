import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

import 'semantic-ui-css/semantic.min.css'


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('littleBank-user-token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
});

const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
})


const client = new ApolloClient({
    link: authLink.concat(httpLink as any) as any,// Chain it with the HttpLink
    cache: new InMemoryCache()
})






// ApolloProvider makes the client accessible for all components of the application
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
);
