<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>GraphQL Subscription Example</h1>

<p>This repository provides a simple example of implementing GraphQL subscriptions using Apollo Server and GraphQL.js. GraphQL subscriptions enable real-time data updates between a client and a server, allowing for reactive applications.</p>

<h2>Getting Started</h2>
<p><strong>Prerequisites:</strong> Make sure you have Node.js installed on your machine.</p>

<h3>Installation</h3>
<p>Clone this repository to your local machine:</p>
<pre><code>git clone https://github.com/HarshPrajapati25/graphql-subscription-example.git</code></pre>
<p>Navigate into the project directory:</p>
<pre><code>cd graphql-subscription-example</code></pre>
<p>Install dependencies:</p>
<pre><code>npm install</code></pre>

<h3>Running the Server</h3>
<p>Start the GraphQL server:</p>
<pre><code>npm start</code></pre>
<p>The server will start running at <a href="http://localhost:4000/graphql">http://localhost:4000/graphql</a>. You can access the GraphQL Playground by navigating to this URL in your browser.</p>

<h3>Subscribing to Updates</h3>
<p>Once the server is running, you can subscribe to real-time updates by executing a subscription query. Here's an example subscription query:</p>
<pre><code>Subscription: {
  newRecipe: {
    subscribe: () =&gt; pubsub.asyncIterator("newRecipe"),
  },
}</code></pre>
<p>This subscription will listen for newRecipe being created and will receive updates in real-time.</p>

<h3>Publishing newRecipe</h3>
<p>To publish a newRecipe and trigger updates, you can use a mutation. Here's an example mutation:</p>
<pre><code>async createRecipe(_, { recipeInput: { name, description } }) {
  const createdRecipe = new Recipe({
    name: name,
    description: description,
    createdAt: new Date().toISOString(),
    thumbsUp: 0,
    thumbsDown: 0,
  });
}</code></pre>
<p>Executing this mutation will create a newRecipe, and any users subscribed to newRecipe will receive the updated data in real-time.</p>

<h2>Contributing</h2>
<p>Contributions are welcome! If you have suggestions or find any issues, please feel free to open an issue or submit a pull request.</p>

</body>
</html>
