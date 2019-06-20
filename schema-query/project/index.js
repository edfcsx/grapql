const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Query {
        ola: String
        newDate: Date
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'Hello World'
        },
        newDate() {
            return new Date().toString()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`Executando na url ${url}`))