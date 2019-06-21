const { ApolloServer, gql } = require('apollo-server')

const usuarios = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'Jsilva@ymail.com',
        idade: 29,
    },
    {
        id: 2,
        nome: 'Zeca Junior',
        email: 'zz@zemail.com',
        idade: 17,
    },
    {
        id: 3,
        nome: 'Daniela Smith',
        email: 'danismith@smail.com',
        idade: 24
    }
]

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int!
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Query {
        ola: String
        newDate: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    Query: {
        ola() {
            return 'Hello World'
        },
        newDate() {
            return new Date().toString()
        },
        usuarioLogado () {
            return {
                id: 1,
                nome: 'Ana',
                email: 'ana@gmail.com',
                idade: 24,
                salario_real: 1200.32,
                vip: false
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Notebook gamer',
                preco: 4890.89,
                desconto: 0.5,
            }
        },
        numerosMegaSena() {
            const crescente = (a, b) => a - b
            return Array(6).fill(0).map(n => parseInt(Math.random() * 60 + 1)).sort(crescente)
        },
        usuarios() {
            return usuarios;
        },
        usuario(_, { id }) {
            const select = usuarios.filter(u => u.id === id)
            return select ? select[0] : null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`Executando na url ${url}`))