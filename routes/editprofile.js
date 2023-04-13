const express = require("express");
const Users = require("../models/users");
const UsersInfo = require("../models/usersinfo");

const router = express.Router();


router.get('/editprofile', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const user = await UsersInfo.findOne({ email: req.query.email });
        if (user) {
          res.render('updateprofile', { user: user });
        } else {
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
    const user = await UsersInfo.findOne({ email: req.query.email });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.company = req.body.company || user.company;
    user.location = req.body.location || user.location;
    user.startDate = req.body.startdate || user.startDate;
    user.jobtitle = req.body.jobtitle || user.jobtitle;
    user.endDate = req.body.enddate || user.endDate;
    user.jobDesc = req.body.description || user.jobDesc;
    user.degree = req.body.degree || user.degree;
    user.school = req.body.school || user.school;
    user.major = req.body.major || user.major;
    user.gradDate = req.body.graduationdate || user.gradDate;
    user.skill1 = req.body.skill1 || user.skill1;
    user.skill2 = req.body.skill2 || user.skill2;
    user.skill3 = req.body.skill3 || user.skill3;
  
    const updatedUser = await user.save();  
    // res.json(updatedUser);
    res.status(201).redirect("/profile");
  } catch (err) {
    res.status(400).send(err.message);
  }
});



module.exports = router;