import { AuthenticationError } from "apollo-server-express";
import { User } from "../models";
import { signToken } from "../utils/auth";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/mongoose";

export const resolvers = {
    Query: {
        users: async (parent: any, args: any, context: any) => {
            try {
                console.log("users parent", parent)
                console.log("users args", args)
                if (!context.user) {
                    throw new AuthenticationError("Must be logged in to proceed!");
                }              
                const users = await User.find();
                return users;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        },

        user: async (parent: any, { userId }: any, context: any) => {
            try{
                console.log("user parent", parent)
                if (!context.user) {
                    throw new AuthenticationError("Must be logged in to proceed!")
                }
                return User.findOne({ _id: userId })
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        },

        getImages: async (parent: any, args: any, context: any) => {
            try {
                console.log("getImages parent", parent)
                console.log("getImages args", args)
                if (!context.user) {
                    throw new AuthenticationError("Must be logged in to proceed!")
                }
                const user = await User.findById(context.user._id)
                if (user) {
                    return user.images
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        },

        getAvatar: async (parent: any, args: any, context: any) => {
            try {
                console.log("getAvatar parent", parent)
                console.log("getAvatar args", args)
                if (!context.user) {
                    throw new AuthenticationError("Must be logged in to proceed!")
                }
                const user = await User.findById(context.user._id)
                if (user) {
                    return user.avatar
                } 
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        }
    },

    Mutation: {
        addUser: async (parent: any, {name, email, password, avatar}: IUser) => {
            try {
                console.log("addUser parent", parent)
                console.log("Received data:", { name, email, password, avatar });
                
                if (!avatar) {
                    avatar = '';
                }
                
                // Assuming User.create returns the newly created user object
                const user = await User.create({ name, email, password, avatar });
                console.log("Created user:", user);
        
                const token = signToken(user);
                console.log("Generated token:", token);
        
                return { token, user };
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to create user: " + error.message);
                } else {
                    console.error(error);
                }
            }
        },

        login: async (parent: any, { email, password }: IUser) => {
            try {
                console.log("login parent", parent)
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError("No user with this email found!");
                }
                if (user.isCorrectPassword) {
                    const correctPw = await user.isCorrectPassword(password);
                    if (!correctPw) {
                        throw new AuthenticationError("Incorrect Password!");
                    }
        
                    const token = signToken(user);
                    return { token, user };
                } else {
                    throw new Error("isCorrectPassword method not available on user.");
                }
            } catch (error) {
                throw new AuthenticationError("Invalid credentials");
            }
        },

        removeUser: async (parent: any, args: any, context: any) => {
            try {
                console.log("removeUser parent", parent)
                console.log("removeUser args", args)
                if (context && context.user) {
                    return User.findOneAndDelete({ _id: context.user._id })
                } else {
                    throw new AuthenticationError("Must be logged in to proceed!")
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        },

        addImage: async (parent: any, { downloadUrl }: any, context: any) => {
            try {
                console.log("addImage parent", parent)
                if (context && context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        context.user._id,
                        { $push: { images: downloadUrl }},
                        { new: true }
                    )
                    return updatedUser
                } else {
                    throw new AuthenticationError("Must be logged in to proceed!")
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        },

        addAvatar: async (parent: any, { downloadUrl }: any, context: any) => {
            try {
                console.log("addAvatar parent", parent)
                if (context && context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        context.user._id,
                        { avatar: downloadUrl },
                        { new: true }
                    )
                    return updatedUser
                } else {
                    throw new AuthenticationError("Must be logged in to proceed!")
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        }
    }
}