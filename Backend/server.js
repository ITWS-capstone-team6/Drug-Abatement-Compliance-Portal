const express = require("express");

const app = express();

const cors = require("cors");
const {MongoClient, ServerApiVersion}= require('mongodb');

const bodyParser= require("body-parser");
const path= require('path');
const uri= "mongodb+srv://chloej1699:SnowBird11@cluster0.8ihubjl.mongodb.net/"
app.use(bodyParser.json());

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

//next: clean up record.js and conn.js -- not rlly being used

// Get MongoDB driver connection
const dbo = require("./conn.js");

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
 
app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToDatabase(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/db', async (req, res) => {
  try {
      await client.connect();
      const collection = client.db("PracticeDB").collection("Users");
      if(collection){
        console.log("found collection")
      }
      const cursor = await collection.find().toArray();
      console.log(cursor);
      console.log(res.json(cursor));
      res.json(cursor);
  } catch(e) {
      console.error(e);
  } finally {
      await client.close();
  }
})