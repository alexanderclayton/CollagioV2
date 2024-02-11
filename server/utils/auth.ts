import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserDocument } from '../types/mongoose';

dotenv.config();

const secret = process.env.SECRET;
const expiration = "2h";

interface ICustomRequest extends Request {
    user?: string | JwtPayload
}

export const authMiddleware = (req: ICustomRequest): ICustomRequest => {
    let token = req.headers.authorization;
    if (token) {
        const tokenParts = token.split(" ");
        if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
            token = tokenParts[1];
            try {
                if (secret) {
                    const data = jwt.verify(token, secret);
                    req.user = data;
                } else {
                    console.error("Secret is undefined");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Failed to verify token:", error.message);
                } else {
                    console.error("Unknown error occured")
                }
            }
        } else {
            console.warn("Invalid token format");
        }
    }
    return req;
};

export const signToken = (user: IUserDocument): string | null => {
    if (secret) {
        return jwt.sign({ data: user }, secret, { expiresIn: expiration });
    } else {
        console.error("Secret is undefined");
        return null;
    }
};