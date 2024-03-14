GraphQL Subscription Example

This repository provides a simple example of implementing GraphQL subscriptions using Apollo Server and GraphQL.js. GraphQL subscriptions enable real-time data updates between a client and a server, allowing for reactive applications.

Getting Started
To get started with this example, follow these steps:

Prerequisites
Make sure you have Node.js installed on your machine.

Installation
Clone this repository to your local machine:

git clone [https://github.com/HarshPrajapati25/graphql-subscription-example.git](https://github.com/HarshPrajapati25/Graphql_subscription.git)
Navigate into the project directory:

Install dependencies:

npm install
Running the Server
Start the GraphQL server:


npm start
The server will start running at http://localhost:4000/graphql. You can access the GraphQL Playground by navigating to this URL in your browser.

Subscribing to Updates
Once the server is running, you can subscribe to real-time updates by executing a subscription query. Here's an example subscription query:

graphql
Copy code
Subscription: {
    newRecipe: {
      subscribe: () => pubsub.asyncIterator("newRecipe"),
    },
    
This subscription will listen for newRecipe being created and will receive updates in real-time.

Publishing newRecipe
To publish a newRecipe and trigger updates, you can use a mutation. Here's an example mutation:

graphql Copy code

async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });
    
Executing this mutation will create a newRecipe, and any users subscribed to newRecipe will receive the updated data in real-time.

Contributing
Contributions are welcome! If you have suggestions or find any issues, please feel free to open an issue or submit a pull request.
