const express = require("express");
const Users = require("../models/users");
const UsersInfo = require("../models/usersinfo");
const Jobs = require("../models/jobs")

const router = express.Router();

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Jobs.find();

    if (req.isAuthenticated()) {
       const user = await Users.findById(req.user._id);
    //   const user = await UsersInfo.findOne({ email: req.query.email });

        res.render('jobs', { jobs:jobs,user:user });
      
    }
    else{
      res.render('jobs', { jobs:jobs,user:"" })
    }

    // res.render('jobs', { jobs:jobs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



router.get('/filterjobs', async (req, res) => {
  const { jobtitle, location, employmenttype } = req.query;
  let filterJobs;
  let query = {};
  if (jobtitle) {
    query.jobtitle = jobtitle;
  }
  if (location) {
    query.location = location;
  }
  if (employmenttype) {
    query.employmenttype = employmenttype;
  }
  try {
    filterJobs = await Jobs.find(query);
    
    if (req.isAuthenticated()) {
      const user = await Users.findById(req.user._id);
   

       res.render('jobs', {jobs: filterJobs, user:user });
     
   }
   else{
     res.render('jobs', { jobs: filterJobs,user:"" })
   }
    // res.render('jobs', { jobs: filterJobs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/employer', async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.render('employer', { jobs:jobs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/addjob', async (req, res) => {

    try {
      
  
        // Create a new job
        const newJob = new Jobs({
          jobtitle:req.body.jobtitle,
          companyname:req.body.companyname,
          location: req.body.location,
          employmenttype:req.body.employmenttype,
          jobDesc:req.body.jobdescription

        });
  
        // Save the job to the database
        await newJob.save();

        res.status(201).redirect("/jobs");
  

    } catch (err) {
      
        console.log(err);
        res.status(400).send(err);
      
    }
  });
 
module.exports = router;