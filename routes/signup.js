// // import express from "express";
// const express = require("express");
// const Users = require("../models/users");
// const bcrypt = require('bcrypt');

// const router = express.Router();


// router.get('/signup', (req, res) => {
//     res.render('signup',{ error: req.query.error });
// })


//     //creating new user in database
//     router.post('/signup', async(req, res) => {

//         const password = req.body.password;
//         const confirm_password = req.body.confirm_password;

//         try{
//             const signupUser = new Users({
//                 fullname:req.body.fullname,
//                 email:req.body.email,
//                  password :req.body.password

//             })       
//             if (password !== confirm_password) {
//                 res.redirect('/signup?error=' + encodeURIComponent("PASSWORD is not matching with CONFIRM PASSWORD!"));
//               }
//               else {
//                 // Hash the password using bcrypt
//                 const saltRounds = 10;
//                 const hashedPassword = await bcrypt.hash(password, saltRounds);
          
//                 // Create a new user with the hashed password
//                 const signupUser = new Users({
//                   fullname: req.body.fullname,
//                   email: req.body.email,
//                   password: hashedPassword,
//                 });

//              // Save the user to the database
//              await signupUser.save();
//             res.status(201).render('signin', { error: req.query.error });
//              }
//         }
//         catch(err){
//             if(err.code === 11000 && err.keyPattern.email){
//                 // res.status(409).render("signup", {error: "A user with that email already exists!"});
//                 res.status(409).redirect('/signup?error=' + encodeURIComponent("A user with that email already exists!"));
//             }
//             else{
//                 console.log(err);
//                 res.status(400).send(err);
//             }
//         }
    
//     })   

//     module.exports = router;

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const Users = require('../models/users');

const router = express.Router();

// router.get('/signup', (req, res) => {
//   res.render('signup', { error: req.query.error });
// });

// router.post('/signup', async (req, res) => {
//   const password = req.body.password;
//   const confirm_password = req.body.confirm_password;

//   try {
//     if (password !== confirm_password) {
//       res.redirect('/signup?error=' + encodeURIComponent("PASSWORD is not matching with CONFIRM PASSWORD!"));
//     } else {
//       // Hash the password using bcrypt
//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       // Create a new user with the hashed password
//       const newUser = new Users({
//         fullname: req.body.fullname,
//         email: req.body.email,
//         password: hashedPassword,
//       });

//       // Save the user to the database
//       await newUser.save();

//       // Authenticate the user
//       req.login(newUser, (err) => {
//         if (err) {
//           console.log(err);
//           return res.redirect('/signin');
//         }
//         return res.redirect('profile/' + newUser._id);
//       });
//     }
//   } catch (err) {
//     if (err.code === 11000 && err.keyPattern.email) {
//       res.status(409).redirect('/signup?error=' + encodeURIComponent('A user with that email already exists!'));
//     } else {
//       console.log(err);
//       res.status(400).send(err);
//     }
//   }
// });

module.exports = router;
