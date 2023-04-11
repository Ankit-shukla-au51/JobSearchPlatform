const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobtitle:{
        type:String,
        required :true
    },
    companyname:{
        type:String,
        required:true,

    },
    location:{
        type:String,
        required:true

    },
    employmenttype:{
        type:String,
        required:true
    },
    jobDesc:{
            type:String,
            required:true
    }

})

const Jobs = new mongoose.model("Jobs",jobSchema);
module.exports = Jobs;