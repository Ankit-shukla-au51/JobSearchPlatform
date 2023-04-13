const express = require("express");
const Users = require("../models/users");
const UsersInfo = require("../models/usersinfo");




const router = express.Router();



router.get('/profile', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const user = await Users.findById(req.user._id);
        const userinfo = await UsersInfo.findOne({email:user.email});
        if (user) {
          if(userinfo){
            res.render('profile', { user: user,userinfo:userinfo})
          }
          else{
          res.render('profile', { user: user,userinfo:""});
          }
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




    //creating new user in database
    router.post('/profile', async(req, res) => {


        try{
         if (req.isAuthenticated()) {
           const user = await Users.findById(req.user._id);
            const Userinfo = new UsersInfo({
                 fullname:user.fullname,
                //  email:req.body.email,
                email:user.email,
                 phone :req.body.phone,
                 address: req.body.address,
                 jobtitle:req.body.jobtitle,
                 company:req.body.company,
                 location:req.body.location,
                 startDate:req.body.startdate,
                 endDate:req.body.enddate,
                 jobDesc: req.body.description,
                 degree:req.body.degree,
                 school:req.body.school,
                 major:req.body.major,
                 gradDate:req.body.graduationdate,
                 skill1:req.body.skill1,
                 skill2:req.body.skill2,
                 skill3:req.body.skill3


            }); 
           
             // Save the userinfo to the database
             await Userinfo.save();
            
            res.status(201).redirect("/profile");
        }
        else{
            res.redirect("/signin");
        }
        }
        catch(err){
           
                console.log(err);
                res.status(400).send(err);
        }
    
    })   


  module.exports = router;