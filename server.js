// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
 const portLocation=8000;
 const myServer =app.listen(portLocation,()=>{
     console.log('server is running');
     console.log(`running on localhost:${portLocation}`);
 })

// Setup a get route to respons with projectData object when reguest made in the clint side
 app.get('/getall',(req,res)=>{
   res.send(projectData);
 })

// creating array to push data from post route
// Setup post route for saving or posting data to projectData object 
 app.post('/postall',(req,res)=>{
  projectData=req.body;
   res.send();
  
 })