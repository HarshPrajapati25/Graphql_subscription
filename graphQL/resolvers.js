const Recipe = require("../models/recipe");
const { pubsub } = require("./context.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      const recipe = await Recipe.findById(ID);
      return recipe;
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async register(
      _,
      { newUserInput: { username, password, email, address } }
    ) {
      const register = new User({
        username: username,
        password: await bcrypt.hash(password, 8),
        email: email,
        address: address,
      });
      console.log(register);
      const res = await register.save();
      return { id: res.id, ...res._doc };
    },
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign(
        { userId: user.id },
        "your_secret_key" /*{ expiresIn: '1h' }*/
      );
      return token;
    },
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });
      const res = await createdRecipe.save();
      console.log("RECIPE_ADDED");
      pubsub.publish("newRecipe", { newRecipe: createdRecipe });

      return { id: res.id, ...res._doc };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editRecipe(_, { ID, editrecipeInput: { name, description } }) {
      const result = await Recipe.updateOne(
        { _id: ID },
        { $set: { name: name, description: description } }
      );

      return result.modifiedCount === 1;
    },
  },
  Subscription: {
    newRecipe: {
      subscribe: () => pubsub.asyncIterator("newRecipe"),
    },
  },
};
