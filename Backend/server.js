const express = require("express");
const cors = require("cors");
const {MongoClient, MongoKerberosError}= require('mongodb');
const bodyParser= require("body-parser");
const mongoose = require('mongoose');
const uuid = require('uuid');

const uri="mongodb+srv://chloej1699:SnowBird11@cluster0.8ihubjl.mongodb.net/"
const port = process.env.PORT || 5000;


//check
require("dotenv").config({ path: "./config.env" });
const app = express();

app.use(cors())
   .use(bodyParser.json())
   .use(express.json())
   .use(bodyParser.urlencoded({extended:true}))
   .use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     // Pass to next layer of middleware
     next();
   });


//next: clean up record.js and conn.js -- not rlly being used

// Get MongoDB driver connection
const dbo = require("./conn.js");
const client = new MongoClient(uri);

 
app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToDatabase(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.post('/postAccident', async(req, res) =>{
  const collection = client.db("PracticeDB").collection("PostAccidentForm");
  const {requested,
    employeeName,
    employeeId,
    addressCode,
    dateOfAccident,
    timeOfAccident,
    accidentInformation,
    refusal} = req.body;
  try {
    let form = new mongoose.Schema({
      requested: {
        type: String,
        required: true
    },
      employeeName: {
        type: String,
        required: true
    },
      employeeId: {
        type: String,
        required: true
    },
      addressCode: {
        type: String,
        required: true
    },
      dateOfAccident: {
        type: String,
        required: true
    },
      timeOfAccident: {
        type: String,
        required: true
    },
      accidentInformation: {
        type: String,
        required: true
    },
      refusal: {
        type: String,
        required: true
    }
    });
    const Form= mongoose.model('Form', form);
    collection.save(Form);
    return res.json({
      message: 'Form added successfully!',
    });
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'An error occured!',
    });
  }
});

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
});