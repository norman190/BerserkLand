const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');

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

const uri = "mongodb+srv://namia:sayanak4flat@dune.v70iijj.mongodb.net/?retryWrites=true&w=majority&appName=DUNE";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors:true
}
  //tls: true,
  //tlsAllowInvalidCertificates: false
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error in run function:", error);
  }
}

run().catch(console.dir);

// Routes for child functions
app.post('/createUser', async (req, res) => {
  try {
    const { user_id, username, password, email } = req.body;
    await createUser(client, user_id, username, password, email);
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

app.post('/createItem', async (req, res) => {
  try {
    const { item_id, name, description, type, attributes, rarity } = req.body;
    await createItem(client, item_id, name, description, type, attributes, rarity);
    res.status(201).send("Item created successfully");
  } catch (error) {
    res.status(500).send("Error creating item");
  }
});

app.post('/createMonster', async (req, res) => {
  try {
    const { monster_id, name, attributes, location } = req.body;
    await createMonster(client, monster_id, name, attributes, location);
    res.status(201).send("Monster created successfully");
  } catch (error) {
    res.status(500).send("Error creating monster");
  }
});

app.post('/createTransaction', async (req, res) => {
  try {
    const { transaction_id, user_id, item_id, transaction_type, amount, date } = req.body;
    await createTransaction(client, transaction_id, user_id, item_id, transaction_type, amount, date);
    res.status(201).send("Transaction created successfully");
  } catch (error) {
    res.status(500).send("Error creating transaction");
  }
});

app.post('/createWeapon', async (req, res) => {
  try {
    const { weapon_id, name, description, damage, type, attributes } = req.body;
    await createWeapon(client, weapon_id, name, description, damage, type, attributes);
    res.status(201).send("Weapon created successfully");
  } catch (error) {
    res.status(500).send("Error creating weapon");
  }
});

app.post('/monsterslain', async (req, res) => {
  try {
    const { user_id, monster_id } = req.body;
    const result = await monsterslain(client, user_id, monster_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error slaying monster");
  }
});

app.delete('/deleteUser', async (req, res) => {
  try {
    const { user_id } = req.query;
    await deleteUser(client, user_id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

app.get('/reportUser', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await reportUser(client, user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error reporting user");
  }
});

app.get('/viewLeaderboard', async (req, res) => {
  try {
    const result = await viewLeaderboard(client);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error viewing leaderboard");
  }
});

app.get('/viewUserByAdmin', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await viewUserByAdmin(client, user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error viewing user by admin");
  }
});

app.get('/existingUser', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await existingUser(client, user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error checking existing user");
  }
});

app.get('/existingItem', async (req, res) => {
  try {
    const { item_id } = req.query;
    const result = await existingItem(client, item_id);
    res.status(200).send(result);
  } catch (error) {
    res.status (500).send("Error checking existing item");
  }
});

app.get('/existingMonster', async (req, res) => {
  try {
    const { monster_id } = req.query;
    const result = await existingMonster(client, monster_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error checking existing monster");
  }
});

app.get('/existingWeapon', async (req, res) => {
  try {
    const { weapon_id } = req.query;
    const result = await existingWeapon(client, weapon_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error checking existing weapon");
  }
});

app.get('/findUserByUsername', async (req, res) => {
  try {
    const { username } = req.query;
    const result = await findUserByUsername(client, username);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error finding user by username");
  }
});

app.get('/findUserById', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await findUserById(client, user_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error finding user by ID");
  }
});
