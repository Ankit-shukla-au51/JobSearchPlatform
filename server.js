    const express = require("express");
    const app = express();
    const path = require("path");
    const mongoose = require("mongoose");
    const bodyParser = require("body-parser");
    const bcrypt = require('bcrypt');
    const session = require('express-session');
    const signupUser = require("./routes/signup");
    const signinUser = require("./routes/auth");
    const userprofile = require("./routes/profile");

    const port = process.env.PORT || 3000;

    // // connection to mongodb
    // mongoose.connect("mongodb://localhost/jsPlatform")
    // .then(()=>console.log("connected to mongodb")) 
    // .catch((e)=>console.log("error connecting to mongodb",e.message));

    //connection to mongodb atlas
    mongoose.connect("mongodb+srv://ankit:PePO24gVwQyzjBYl@cluster0.gi3lz3k.mongodb.net/jsPlatform?retryWrites=true&w=majority")
    .then(()=>console.log("connected to mongodb atlas")) 
    .catch((e)=>console.log("error connecting to mongodb atlas",e.message));

    const Users = require("./models/users");

    // app.use(express.json());
    // app.use(express.urlencoded({extended:false}));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // session middleware
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true
      }));


    // setting view engine
    app.set("view engine","ejs");
    app.set("views", path.join(__dirname,"views"));

    // rendering all pages
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/employer', (req, res) => {
        res.render('employer');
    })   

    app.get('/jobs', (req, res) => {
        res.render('jobs');
    })
    

    app.use("/", signupUser);
    app.use("/", signinUser);
    app.use("/", userprofile);


    app.listen(port,()=>{
        console.log( `Server on port ${port}`);
    })