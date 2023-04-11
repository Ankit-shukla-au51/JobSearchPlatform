const express = require("express");
const Users = require("../models/users");
const UsersInfo = require("../models/usersinfo");
const Jobs = require("../models/jobs")

const router = express.Router();

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Jobs.find();
    // if (req.isAuthenticated()) {
    //   const user = await UsersInfo.findOne({ email: req.query.email });
    //   if(user){
    //     res.render('jobs', { jobs:jobs,user:user });
    //   }
    //   else{
    //   res.render('jobs', { jobs:jobs,user:""});
    //   }
    // }
    // else{
    //   res.render('jobs', { jobs:jobs,user:"" })
    // }
    res.render('jobs', { jobs:jobs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/filterjobs',async(req, res) => {
  const jobtitle = req.query.jobtitle;
  const location = req.query.location;
  const employmenttype = req.query.employmenttype;
  let filterJobs;
  if(jobtitle && location && employmenttype ){
   filterJobs= await Jobs.find({jobtitle:jobtitle,location:location,employmenttype:employmenttype});
  }
  else if(!jobtitle && location && employmenttype){
    filterJobs= await Jobs.find({location:location,employmenttype:employmenttype})
  }
  else if(jobtitle && !location && employmenttype){
    filterJobs= await Jobs.find({jobtitle:jobtitle,employmenttype:employmenttype})
  }
  else if(jobtitle && location && !employmenttype){
    filterJobs= await Jobs.find({jobtitle:jobtitle,location:location})
  }
  else if(!jobtitle && !location && employmenttype){
    filterJobs= await Jobs.find({employmenttype:employmenttype})
  }
  else if(jobtitle && !location && !employmenttype){
    filterJobs= await Jobs.find({jobtitle:jobtitle})
  }
  else if(!jobtitle && location && !employmenttype){
    filterJobs= await Jobs.find({location:location})
  }
  else{
    filterJobs= await Jobs.find();
   }
  
  console.log(filterJobs);
  res.render('jobs', { jobs: filterJobs });
})

// const filteredJobs = jobs.filter(job => {
//   return (
//     (!req.query.jobtitle || req.query.jobtitle === job.jobtitle) &&
//     (!req.query.location || req.query.location === job.location) &&
//     (!req.query.employmenttype || req.query.employmenttype === job.employmenttype)
//   );
// });

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