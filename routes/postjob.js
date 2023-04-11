const express = require("express");
const Users = require("../models/users");
const UsersInfo = require("../models/usersinfo");
const Jobs = require("../models/jobs");
const { render } = require("ejs");

const router = express.Router();

router.get('/employer',async (req, res)=>{
    render
})

router.post('/addjobs', async (req, res) => {

    try {
      
  
        // Create a new job
        const newJob = new Jobs({
          jobtitle:req.body.jobtitle,
          companyname:req.body.companyname,
          location: req.body.location,
          employmenttype:req.body.employmenttype,
          jobDesc:req.body.jobdescription

        });
  
        // Save the user to the database
        await newJob.save();
  

    } catch (err) {
      
        console.log(err);
        res.status(400).send(err);
      
    }
  });
 
module.exports = router;