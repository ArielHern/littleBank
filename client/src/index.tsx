import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
    ApolloProvider, ApolloClient, HttpLink, InMemoryCache
} from '@apollo/client';

import 'semantic-ui-css/semantic.min.css'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    })
});



//ApolloProvider makes the client accessible for all components of the application
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
);
