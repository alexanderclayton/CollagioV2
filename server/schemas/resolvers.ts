import { AuthenticationError } from "apollo-server-express";
import { User } from "../models";
import { signToken } from "../utils/auth";

export const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            try {
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

        user: async (parent, { userId }, context) => {
            try{
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

        getImages: async (parent, args, context) => {
            try {
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

        getAvatar: async (parent, args, context) => {
            try {
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
        addUser: async (parent, { name, email, password, avatar }) => {
            try {
                if (!avatar) {
                    avatar = ''
                }
                const user = await User.create({ name, email, password, avatar })
                const token = signToken(user)
                return { token, user }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error("Failed to fetch users: " + error.message);
                } else {
                    console.error(error)
                }
            }
        },

        login: async (parent, { email, password }) => {
            try {
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

        removeUser: async (parent, args, context) => {
            try {
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

        addImage: async (parent, { downloadUrl }, context) => {
            try {
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

        addAvatar: async (parent, { downloadUrl }, context) => {
            try {
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