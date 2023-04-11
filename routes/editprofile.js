const express = require("express");
const Users = require("../models/users");
const UsersInfo = require("../models/usersinfo");

const router = express.Router();


router.get('/editprofile', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        // console.log(req.query.email);
        const user = await UsersInfo.findOne({ email: req.query.email });
        if (user) {
          res.render('updateprofile', { user: user });
        } else {
            console.log("user not found");
          res.redirect('/signin');
        }
      } else {
        res.redirect('/signin');
      }
    } catch (error) {
      console.log(error);
      res.redirect('/signin');
    }
  });

router.post('/editprofile', async (req, res) => {
  try {
  if (req.isAuthenticated()) {
    // console.log(req.query.email);
    const user = await UsersInfo.findOne({ email: req.query.email });
    console.log(user.email);
      // res.user.email = user.email;
    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.phone != null) {
      user.phone = req.body.phone;
    }
        if (req.body.address != null) {
      user.address = req.body.address;
    }
    if (req.body.company != null) {
      user.company = req.body.company;
    }
    if (req.body.location != null) {
      user.location = req.body.location;
    }
    if (req.body.startdate != null) {
      user.startDate = req.body.startdate;
    }
    if (req.body.jobtitle != null) {
      user.jobtitle = req.body.jobtitle;
    }
    if (req.body.jobtitle != null) {
      user.jobtitle = req.body.jobtitle;
    }
    if (req.body.enddate != null) {
      user.endDate = req.body.enddate;
    }
    if (req.body.description != null) {
      user.jobDesc = req.body.description;
    }
    if (req.body.degree != null) {
      user.degree = req.body.degree;
    }
    if (req.body.school != null) {
      user.school = req.body.school;
    }
    if (req.body.major != null) {
      user.major = req.body.major;
    }
    if (req.body.graduationdate != null) {
      user.gradDate = req.body.graduationdate;
    }
    if (req.body.skill1 != null) {
      user.skill1 = req.body.skill1;
    }
    if (req.body.skill2 != null) {
      user.skill2 = req.body.skill2;
    }
    if (req.body.skill3 != null) {
      user.skill3 = req.body.skill3;
    }
  }
 
  
    const updatedUser = await user.save();  
    res.json(updatedUser);
    console.log("user updated!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});



module.exports = router;