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

// Get MongoDB driver connection
const dbo = require("./conn.js");
const client = new MongoClient(uri, {useUnifiedTopology: true,});

app.listen(port, () => {
  dbo.connectToDatabase(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  // check to see if username and password fields exist in the POST body
  if (!username || !password) {
     return res.status(400).json("{message: 'missing credentials'}");
  }

  const collection = client.db("PracticeDB").collection("logins");
  // query the database to see if the user exists
  collection.findOne({username})
    .then(user => {
      // if they dont exist then we are done
      if (user == null) {
        return res.status(400).send({"message": "failure", "reason": "user not found"});
      }
      // otherwise we compare the password from the POST request
      //  with the hashed password stored in the database
      bcrypt.compare(password, user["password"])
        .then(compResult => {
          // TODO: if the passwords match set a cookie that has stuff like
          //        timeout and session information so the user stays logged in
          //        also maybe send some stuff like the first/last name etc. 
          if (compResult) {
            console.log("passwords match");
            // set a cookie with the max age being 12 hours from now
            return res.cookie('username', username, {maxAge: 43_200_000+Date.now()})
                      .status(200)
                      .send({"message": "success", "reason": "login success"});
            // return res.status(200).send({"message": "Login successful"});
          } else {
            console.log("passwords don't match");
            return res.status(200).send({"message": "failure", "reason": "invalid credentials"});
          }
        }).catch(err => {
          console.error(err.message);
          return res.status(500).send({"message": err.message});
        })
    }).catch(err => {
      console.error(err.message);
      return res.status(500).send({"message": err.message});
    })

});

app.post("/addLogin", (req, res) => {
  const {username, password} = req.body;
  // validate request body 
  if (!username || !password) {
    return res.status(400).send({"message": "missing username or password"});
  }


  const collection = client.db("PracticeDB").collection("logins");
  // hash the password 
  bcrypt.hash(password, saltRounds)
    .then( hash => {
      // we are querying the collection for documents with the same username field
      const filter = {username};
      // $set means that we update the document with the hashed password
      const update = {
        $set: { password: hash }
      };
      // upsert means that we insert into the collection if there is nothing to update
      const options = { upsert: true };
      collection.updateOne(filter, update, options)
        .then(updateResult => {
          console.log(updateResult);
          return res.status(200).send({"message": updateResult});
        }).catch( err => {
          console.error(err.message);
          return res.status(400).send({"message": err.message});
        })
    }).catch( err => {
      console.error(err.message);
      return res.status(400).send({"message": err.message});
    })
  
})

app.get("/userInfo", (req, res) => {
  // read if there is a cookie with the username then we can do the stuff
  //  otherwise we ignore this 
  console.log("cookies:")
  console.log(req.cookies)
  const username = req.cookies["username"];
  console.log("username: ", username)
  console.log("cookies:");
  // console.log(req.cookies);
  if (!username) {
    res.status(400)
       .send({"message": "failure", "reason": "user not signed in"});
  }
  console.log(username);
})

app.post('/postAccident', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("PostAccidentForm");
   console.log("body: ")
   console.log(req.body)
   let newForm = {
    dot: req.body.dot,
    nondot: req.body.dot,
    requested : req.body.requested,
    employeeName : req.body.employeeName,
    employeeId : req.body.employeeId,
    addressCode : req.body.addressCode,
    dateOfAccident : req.body.dateOfAccident,
    timeOfAccident : req.body.timeOfAccident,
    accidentInformation : req.body.accidentInformation,
    refusal : req.body.refusal,
    notConducted: req.body.notConducted
   }
   console.log("newForm: ")
   console.log(newForm)
   await collection.insertOne(newForm)
   res.json(200)
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'An error occured!',
    });
  }
});

app.post('/postIncident', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("PostIncidentForm");
   console.log("body: ")
   console.log(req.body)
   let newForm = {
    requested : req.body.requested,
    employeeName : req.body.employeeName,
    employeeId : req.body.employeeId,
    addressCode : req.body.addressCode,
    dateOfAccident : req.body.dateOfAccident,
    timeOfAccident : req.body.timeOfAccident,
    accidentInformation : req.body.accidentInformation,
    refusal : req.body.refusal,
    notConducted: req.body.notConducted
   }
   console.log("newForm: ")
   console.log(newForm)
   await collection.insertOne(newForm)
   res.json(200)
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'An error occured!',
    });
  }
});

app.post('/reasonableCause', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("reasonableCause");
   console.log("body: ")
   console.log(req.body)
   let newForm = {
    requested: req.body.requested,
    employeeName: req.body.employeeName,
    employeeId: req.body.employeeId,
    addressCode: req.body.addressCode,
    dateOfAccident: req.body.dateOfAccident,
    timeOfAccident: req.body.timeOfAccident,
    accidentInformation: req.body.accidentInformation,
    refusal: req.body.refusal,
    notConducted: req.body.notConducted,
    behaviorCheckboxes: {
      stumbling: req.body.stumbling,
      unsteadyGait: req.body.unsteadyGait,
      drowsy: req.body.drowsy,
      agitated: req.body.agitated,
      hostile: req.body.hostile,
      irritable: req.body.irritable,
      depressed: req.body.depressed,
      unresponsive: req.body.unresponsive,
      clumsy: req.body.clumsy
    },
    appearanceCheckboxes: {
      flushedComplexion: req.body.flushedComplexion,
      excessiveSweating: req.body.excessiveSweating,
      coldClammySweats: req.body.coldClammySweats,
      bloodshotEyes: req.body.bloodshotEyes,
      tearyWateryEyes: req.body.tearyWateryEyes,
      dilatedPupils: req.body.dilatedPupils,
      constrictedPupils: req.body.constrictedPupils,
      unfocusedStare: req.body.unfocusedStare
    },
    bodyOdorCheckboxes: {
      alcohol: req.body.alcohol,
      marijuana: req.body.marijuana
    }
   }
   console.log("newForm: ")
   console.log(newForm)
   await collection.insertOne(newForm)
   res.json(200)
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