const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');

// Importing functions from other files
const {
  createUser,
  createItem,
  createMonster,
  createTransaction,
  createWeapon
} = require('./Functions/CreateFunction');

const {
  findUserByUsername,
  findUserById
} = require('./Functions/FindFunction');

const {
  existingUser,
  existingItem,
  existingMonster,
  existingWeapon
} = require('./Functions/ExistingFunction');

const {
  generateToken,
  ADMIN,
  USER
} = require('./Functions/TokenFunction');

const {
  monsterslain,
  deleteUser,
  reportUser
} = require('./Functions/OtherFunction');

const {
  viewLeaderboard,
  viewUserByAdmin
} = require('./Functions/ViewFunction');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Assignment');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// MongoDB connection URI
const uri = "mongodb+srv://namia:sayanak4flat@dune.v70iijj.mongodb.net/?retryWrites=true&w=majority&appName=DUNE";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Example usage of createUser function
    await createUser(client, "user_id_1", "username1", "password1", "email1@example.com");

    // Example usage of findUserByUsername function
    const user = await findUserByUsername(client, "username1");
    console.log("User found by username:", user);

    // Example usage of generateToken function
    const token = await generateToken(user);
    console.log("Generated token:", token);

    // Example usage of viewLeaderboard function
    const leaderboard = await viewLeaderboard(client, "user_id_1");
    console.log("Leaderboard:", leaderboard);

  } catch (error) {
    console.error("Error in run function:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

// Add routes for various functionalities
app.post('/createUser', ADMIN, async (req, res) => {
  try {
    const { user_id, username, password, email } = req.body;
    await createUser(client, user_id, username, password, email);
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

app.get('/findUserByUsername/:username', USER, async (req, res) => {
  try {
    const username = req.params.username;
    const user = await findUserByUsername(client, username);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error finding user");
  }
});

app.get('/viewLeaderboard', USER, async (req, res) => {
  try {
    const leaderboard = await viewLeaderboard(client, req.user.user_id);
    res.status(200).send(leaderboard);
  } catch (error) {
    res.status(500).send("Error retrieving leaderboard");
  }
});

app.delete('/deleteUser/:user_id', ADMIN, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    await deleteUser(client, user_id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

app.get('/reportUser/:user_id', ADMIN, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const report = await reportUser(client, user_id);
    res.status(200).send(report);
  } catch (error) {
    res.status(500).send("Error retrieving report");
  }
});

app.get('/viewUserByAdmin/:user_id', ADMIN, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await viewUserByAdmin(client, user_id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving user details");
  }
});
