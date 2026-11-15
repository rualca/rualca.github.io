---
title: "Integrating MongoDB with Node.js"
description: "Installing the driver, opening a connection once, and running your first insert from a Node.js application."
pubDate: 2024-07-26
tags: ["mongodb", "database", "backend", "nosql"]
---

The MongoDB driver for Node.js is a small dependency: it opens a connection, hands you a database object, and gets out of the way. The whole integration is four steps, and the only part people get wrong is opening the connection more than once.

## The Dynamic Duo: MongoDB and Node.js

MongoDB stores documents without requiring a fixed schema, and Node.js handles concurrent requests without a thread per request. Those two properties fit together: the driver is asynchronous, so a query never blocks the event loop while it waits for the server.

### Laying the Groundwork: Setting Up MongoDB

This assumes a MongoDB server you can reach. If there is none yet, the earlier post in this series covers installing one locally.

### Step 1: The Node.js Beacon - Initializing Your Project

Start a project and create its manifest:

```bash
npm init -y
```

That writes a `package.json`, which will hold the dependency list.

### Step 2: Summoning the MongoDB Node.js Driver

The driver is the bridge between the two. Install it:

```bash
npm install mongodb
```

### Step 3: Crafting the Connection Spell

The connection belongs in its own module so that the rest of the application imports it instead of reconnecting. Create `database.js`:

```js
const { MongoClient } = require('mongodb');

async function connect() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    // Specify the database name
    return client.db('yourDatabaseName');
  } catch (error) {
    console.error('Connection to MongoDB failed', error);
  }
}

module.exports = connect;
```

The function connects and returns the database object; everything that needs the database calls it and uses what it returns.

### Step 4: The Integration Incantation

With the connection available, a script can use a collection directly:

```js
const connectToMongoDB = require('./database');

async function performDatabaseOperations() {
  const db = await connectToMongoDB();

// Example: Insert a document into the 'wizards' collection
  const wizardsCollection = db.collection('wizards');
  const result = await wizardsCollection.insertOne({
    name: 'Merlin',
    power: 'Time Manipulation',
  });

console.log(`New wizard summoned: ${result.insertedId}`);
}

performDatabaseOperations().catch(console.error);
```

The script connects, inserts one document into the `wizards` collection, and prints the `_id` the server assigned.

### Conclusion: Unleashing the Power of Integration

What the driver gives you is one client, many queries, and no blocking. The detail worth keeping from here is that the client is meant to be opened once and reused; a connection per request costs more than the query it carries.
