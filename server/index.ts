import express, { Application, Request, Response } from "express"; // Assign express module to a variable
import { ApolloServer } from 'apollo-server-express'
import * as path from 'path'
import { authMiddleware } from "./utils/auth";
import { typeDefs, resolvers } from "./schemas";
import { db } from "./config/connection";

const PORT = process.env.PORT || 6001
const app = express() // Now express is properly imported and assigned to a variable
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../client/build")))
}

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

const startApolloServer = async () => {
    await server.start()
    server.applyMiddleware({ app } as any)

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`)
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        })
    })
}

startApolloServer()