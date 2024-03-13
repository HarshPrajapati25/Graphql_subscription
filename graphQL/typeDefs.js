const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    password: String!
    email: String!
    address: String
  }
  type Recipe {
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }

  input NewUserInput {
    username: String!
    password: String!
    email: String!
    address: String
  }

  input RecipeInput {
    name: String
    description: String
  }

  input EditRecipeInput {
    name: String
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type Mutation {
    register(newUserInput: NewUserInput): User!
    login(username: String!, password: String!): String
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, editrecipeInput: EditRecipeInput): Boolean
  }
  type Subscription {
    newUser: User!
    newRecipe: Recipe!
  }
`;
