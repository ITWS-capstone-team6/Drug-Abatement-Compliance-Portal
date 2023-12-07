const express = require("express");
const cors = require("cors");
const {MongoClient, MongoKerberosError}= require('mongodb');
const bodyParser= require("body-parser");
const mongoose = require('mongoose');
const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectId;
const uri="mongodb+srv://chloej1699:SnowBird11@cluster0.8ihubjl.mongodb.net/"
const port = process.env.PORT || 5000;

require("dotenv").config({ path: "./config.env" });
const app = express();

app.use(cors())
   .use(bodyParser.json())
   .use(express.json())
   .use(bodyParser.urlencoded({extended:true}))
   .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

app.get('/findPostAccident', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("PostAccidentForm");
   const cursor = await collection.find().toArray();
  //  console.log(cursor);
   res.json(cursor);
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'An error occured!',
    });
  }
});

app.get('/findPostIncident', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("PostIncidentForm");
   const cursor = await collection.find().toArray();
  //  console.log(cursor);
   res.json(cursor);
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'An error occured!',
    });
  }
});

app.get('/findReasonableCause', async(req, res) =>{
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("reasonableCause");
   const cursor = await collection.find().toArray();
  //  console.log(cursor)
   res.json(cursor);
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
  //  console.log("body: ")
  //  console.log(req.body)
   let newForm = {
    awsUserId: req.body.idNumber,
    email: req.body.emailAddress,
    isAdmin: false, //! change this later
   }
  //  console.log("newForm: ")
  //  console.log(newForm)
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
  console.log("hi?")
  try {
   await client.connect();
   const collection = client.db("PracticeDB").collection("PostAccidentForm");
   console.log("body: ")
   console.log(req.body)
   let newForm = {
    awsUserId:req.body.idNumber,
    email: req.body.email,
    type: "Post Accident",
    status: "Pending",
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


app.post('/postAccident/:updateStatus', async(req, res) => {
  try {
    await client.connect();
    const collection = client.db("PracticeDB").collection("PostAccidentForm");
    console.log(req.body)
    const formId = req.body.id;
    const filter = {_id: new ObjectId(formId)}
    console.log(formId)
    console.log(req.query.updateStatus)
    const updateForm = {
      $set: {
        status: req.query.updateStatus
      }
    }
    const response = await collection.updateOne(filter, updateForm);
    console.log(response)
    res.json(200);
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
    status: "Pending",
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

app.post('/postIncident/:updateStatus', async(req, res) => {
  console.log("hi")
  try {
    await client.connect();
    const collection = client.db("PracticeDB").collection("PostIncidentForm");
    console.log(req.body)
    const formId = req.body.id;
    const filter = {_id: new ObjectId(formId)}
    console.log(formId)
    console.log(req.query.updateStatus)
    const updateForm = {
      $set: {
        status: req.query.updateStatus
      }
    }
    const response = await collection.updateOne(filter, updateForm);
    console.log(response)
    res.json(200);
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
   const behaviorCheckboxes = req.body.behaviorCheckboxes
   const appearanceCheckboxes = req.body.appearanceCheckboxes
   const speechCheckboxes = req.body.speechCheckboxes
   const bodyOdorCheckboxes = req.body.bodyOdorCheckboxes
   let behavior = []
   let appearance = []
   let speech = []
   let bodyOdor = []
   for (const checked in behaviorCheckboxes) {
    if (behaviorCheckboxes[checked]) {
      behavior.push(checked)
    }
   }
   for (const checked in appearanceCheckboxes) {
    if (appearanceCheckboxes[checked]) {
      appearance.push(checked)
    }
   }
   for (const checked in speechCheckboxes) {
    if (speechCheckboxes[checked]) {
      speech.push(checked)
    }
   }
   for (const checked in bodyOdorCheckboxes) {
    if (bodyOdorCheckboxes[checked]) {
      bodyOdor.push(checked)
    }
   }
   console.log(behavior)
   console.log(appearance)
   console.log(speech)
   console.log(bodyOdor)
   let newForm = {
    awsUserId: req.body.idNumber,
    email: req.body.email,
    requested: req.body.requested,
    type: "Reasonable Cause/Suspicion",
    status: "Pending",
    employeeName: req.body.employeeName,
    employeeId: req.body.employeeId,
    addressCode: req.body.addressCode,
    dateOfAccident: req.body.dateOfAccident,
    timeOfAccident: req.body.timeOfAccident,
    accidentInformation: req.body.accidentInformation,
    refusal: req.body.refusal,
    notConducted: req.body.notConducted,
    behaviors: behavior,
    appearance: appearance,
    speech: speech,
    bodyOdors: bodyOdor,
    dot: req.body.dot,
    onDuty: req.body.onDuty,
    reasonNotWithinTwoHours: req.body.reasonNotWithinTwoHours,
    reasonNotWithinEightHours: req.body.reasonNotWithinEightHours,
    managementRepName: req.body.managementRepName,
    managementRepId: req.body.managementRepId,
    managementRepDate: req.body.managementRepDate,
    managementRepPhone: req.body.managementRepPhone,
    secondaryManagementTrained: req.body.secondaryManagementRepTrained,
    secondaryManagementRepName: req.body.secondaryManagementRepName,
    secondaryManagementRepId: req.body.secondaryManagementRepId,
    secondaryManagementRepDate: req.body.secondaryManagementRepDate,
    secondaryManagementRepPhone: req.body.secondaryManagementRepPhone
   }
   await collection.insertOne(newForm)
   res.json(200)
  } catch (error) {
    console.log(error)
    return res.json({
      message: 'An error occured!',
    });
  }
});

app.post('/reasonableCause/:updateStatus', async(req, res) => {
  console.log("hi")
  try {
    await client.connect();
    const collection = client.db("PracticeDB").collection("reasonableCause");
    console.log(req.body)
    const formId = req.body.id;
    const filter = {_id: new ObjectId(formId)}
    console.log(formId)
    console.log(req.query.updateStatus)
    const updateForm = {
      $set: {
        status: req.query.updateStatus
      }
    }
    const response = await collection.updateOne(filter, updateForm);
    console.log(response)
    res.json(200);
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