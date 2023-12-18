const { MongoClient } = require("mongodb");

const mongoURI = "mongodb+srv://chloej1699:SnowBird11@cluster0.8ihubjl.mongodb.net/"
let client;

async function connectToDatabase() {
  try {
    client= new MongoClient(mongoURI);
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getDatabase() {
  if (client) {
    return client.db();
  } else {
    throw new Error("Database connection not established.");
  }
}

function closeDatabase() {
  if (client) {
    client.close();
    console.log("MongoDB connection closed.");
  }
}

module.exports = {
  connectToDatabase,
  getDatabase,
  closeDatabase,
};
