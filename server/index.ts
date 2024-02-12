import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import * as path from 'path';
import { ICustomRequest, authMiddleware } from "./utils/auth"; // Import ICustomRequest
import { typeDefs, resolvers } from "./schemas";
import { db } from "./config/connection";

const PORT = process.env.PORT || 6001;
const app: Application = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: Request }) => {
        const modifiedReq = authMiddleware(req as ICustomRequest); 
        return { req: modifiedReq };
    },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
    try {
        await server.start();
        server.applyMiddleware({ app } as ServerRegistration);
        await new Promise<void>((resolve, reject) => {
            db.once("open", () => {
                resolve();
            });
            db.on("error", (error) => {
                reject(error);
            });
        });

        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startApolloServer();