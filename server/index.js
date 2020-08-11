const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./model/user');
const { typeDefs } = require('./typedefs');
const { resolvers } = require('./resolvers');

const config = require('./utils/config');


console.log('connecting to databse');
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('succesfuly connected to MongoDB');
}).catch((error) => {
    console.log('error connecting to mongoDB', error.message);
});


const context = async ({ req }) => {
    const authorization = req ? req.headers.authorization : null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authorization.substring(7), config.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})



server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscription ready at ${subscriptionsUrl}`);
})