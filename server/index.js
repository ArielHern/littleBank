const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { typeDefs } = require('./typedefs')
const { resolvers } = require('./resolvers')

const config = require('./utils/config')


console.log('connecting to databse')
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('succesfuly connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to mongoDB', error.message)
})


const server = new ApolloServer({
    typeDefs,
    resolvers,
})



server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})