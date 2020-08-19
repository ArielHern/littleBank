const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');
const User = require('../model/user');

const config = require('../utils/config');

module.exports = {
    resolvers: {
        Mutation: {
            login: async (_, args) => {
                const user = await User.findOne({ username: args.username });

                // if not user set passwordCorrect to false 
                // if user compare password and return true or false
                const passwordCorrect = user === null
                    ? false
                    : bcrypt.compare(args.password, user.passwordHash)

                if (!(user && passwordCorrect)) {
                    throw new UserInputError('Invalid username or password');
                };

                const userToken = {
                    username: user.username,
                    id: user._id
                };

                return { value: jwt.sign(userToken, config.JWT_SECRET) }

            },
            signUp: async (_, args) => {
                //password encryption
                const saltRounds = 10
                const passwordHash = await bcrypt.hash(args.password, saltRounds);

                //Create new user
                const newUser = new User({
                    username: args.username,
                    name: args.name,
                    passwordHash
                });
                //Save user to DB
                await newUser.save()
                    .catch((error) => {
                        throw new UserInputError(error.message, {
                            invalidArgs: args
                        });
                    });

                const userToken = {
                    username: newUser.username,
                    id: newUser._id
                };

                return { value: jwt.sign(userToken, config.JWT_SECRET) }

            }
        }
    }
}