const { MongoClient } = require("mongodb");

require("dotenv").config({ path: "./config.env" });

const mongoURI = process.env.DB_URI;

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
