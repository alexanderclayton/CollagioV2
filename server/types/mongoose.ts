import { Document } from "mongoose"

export interface IUser extends Document {
    name: string
    email: string
    password: string
    avatar: string
    images?: string[]
}

export interface IUserDocument extends IUser, Document {
    isCorrectPassword(password: string): Promise<boolean>
}