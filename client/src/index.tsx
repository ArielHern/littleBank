import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    split
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getMainDefinition, relayStylePagination } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';

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


//  HTTP and WebSocket connections to the GraphQL server
const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
});
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true
    }
});



const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink as any) as any,  // Chain it with the HttpLink
)


const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    transactions: relayStylePagination(["query"]),
                }
            }
        }
    })
})






// ApolloProvider makes the client accessible for all components of the application
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
);
