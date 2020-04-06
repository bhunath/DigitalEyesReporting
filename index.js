const express = require('express');
const bodyparser = require("body-parser");
const cors = require('cors');
const path = require("path");
const {spawn} = require('child_process');

var application = express();

application.use(bodyparser.urlencoded({
    extended : true
}));

application.use(express.json());

application.use(cors());

application.use("/public", express.static(path.join(__dirname, 'public')));

application.get("/hello",(req,res)=>{
    var dataToSend ;
    const python = spawn('C:\\Users\\bhunath\\AppData\\Local\\Continuum\\anaconda3\\envs\\opencv-env\\python',['HelloPython.py'])
    python.stdout.on('data',function(data){
      dataToSend = data.toString()
    })
    python.stdout.on('close',(code)=>{
      res.send(dataToSend)
    })
});

application.post("/uploadImage",(req,res)=>{
  console.log(req.body);
  res.send("Upload Image Done");
});

application.listen("3002",()=>{
    console.log("Server Started");
});
