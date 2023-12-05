const express = require("express");
const cors = require("cors");
const {MongoClient, MongoKerberosError}= require('mongodb');
const bodyParser= require("body-parser");
const mongoose = require('mongoose');
const uuid = require('uuid');

const uri="mongodb+srv://chloej1699:SnowBird11@cluster0.8ihubjl.mongodb.net/"
const port = process.env.PORT || 5000;

require("dotenv").config({ path: "./config.env" });
const app = express();

app.use(cors())
   .use(bodyParser.json())
   .use(express.json())
   .use(bodyParser.urlencoded({extended:true}))
   .use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     // Pass to next layer of middleware
     next();
   });

// Get MongoDB driver connection
const dbo = require("./conn.js");
const client = new MongoClient(uri);

app.listen(port, () => {
  dbo.connectToDatabase(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.get("/isAdmin", async (req, res) => {
  try {
    console.log("GET: isAdmin")
    console.log("userId: " + req.query.userId)
    const userId = req.query.userId;
    await client.connect();
    const collection = client.db("PracticeDB").collection("Users");

    console.log("looking up user")
    const result = await collection.findOne({awsUserId: userId});
    console.log(result);
    if (result == null) {
      console.log("user not found")
      return res.send(false);
    }
    res.json(result["isAdmin"]);
   } catch (error) {
     console.log(error)
     return res.json({
       message: 'An error occured!',
     });
   }
});

app.post('/newUser', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("Users");
   console.log("body: ")
   console.log(req.body)
   let newForm = {
    awsUserId: req.body.idNumber,
    email: req.body.emailAddress,
    isAdmin: false, //! change this later
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

app.post('/postAccident', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("PostAccidentForm");
   console.log("body: ")
   console.log(req.body)
   let newForm = {
    awsUserId:req.body.idNumber,
    email: req.body.email,
    type: "Post Accident",
    dot: req.body.dot,
    // nondot: req.body.nondot,
    requested : req.body.requested,
    employeeName : req.body.employeeName,
    employeeId : req.body.employeeId,
    addressCode : req.body.addressCode,
    dateOfAccident : req.body.dateOfAccident,
    timeOfAccident : req.body.timeOfAccident,
    accidentInformation : req.body.accidentInformation,
    refusal : req.body.refusal,
    // notConducted: req.body.notConducted,
    reasonNotWithinTwoHours: req.body.reasonNotWithinTwoHours,
    reasonNotWithinEightHours: req.body.reasonNotWithinEightHours,
    managementRepName: req.body.managementRepName,
    managementRepId: req.body.managementRepId,
    managementRepDate: req.body.managementRepDate,
    managementRepPhone: req.body.managementRepPhone
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
    awsUserId: req.body.idNumber,
    email: req.body.email,
    type: "Post-Injury Incident",
    requested : req.body.requested,
    employeeName : req.body.employeeName,
    employeeId : req.body.employeeId,
    addressCode : req.body.addressCode,
    dateOfAccident : req.body.dateOfAccident,
    timeOfAccident : req.body.timeOfAccident,
    accidentInformation : req.body.accidentInformation,
    refusal : req.body.refusal,
    reasonNotWithinEightHours: req.body.reasonNotWithinEightHours,
    managementRepName: req.body.managementRepName,
    managementRepId: req.body.managementRepId,
    managementRepDate: req.body.managementRepDate,
    managementRepPhone: req.body.managementRepPhone
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
    awsUserId: req.body.idNumber,
    email: req.body.email,
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
  //  console.log("newForm: ")
  //  console.log(newForm)
   await collection.insertOne(req.body)
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