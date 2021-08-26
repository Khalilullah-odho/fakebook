import User from "../../models/User.js";
import { UserInputError } from "apollo-server-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../../utils/validate.js";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

const SECRET_KEY = process.env.SECRET_KEY;

export default {
  Query: {
    getUserInfo: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        if (!user) throw new Error("user not found ");
        return user;
      } catch (error) {
        throw new Error("Something went wrong", error);
      }
    },
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const { error } = validateLoginUser({ username, password });
      if (error) {
        const errors = error.details[0].message;
        throw new UserInputError("Login Error", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("Login Error", {
          username: " User not found! ",
        });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        throw new UserInputError("Login Error", {
          password: "Incorrect Password",
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    register: async (
      _,
      {
        registerInput: {
          username,
          email,
          password,
          confirmPassword,
          dob,
          gender,
        },
      }
    ) => {
      const { error } = validateRegisterUser({ username, email, password });

      if (error) {
        const message = error.details[0].message;
        throw new UserInputError({ message });
      }

      const isUser = await User.findOne({ username });
      if (isUser) {
        throw new UserInputError("Username is taken", {
          username: "Username is already taken,try another one",
        });
      }

      if (password !== confirmPassword) {
        throw new UserInputError("Password Error", {
          confirmPassword: "Password does not matched!",
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password,
        username,
        dob,
        gender,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
