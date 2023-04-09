const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required :true
    },
    email:{
        type:String,
        required:true,
        unique: true

    },
    phone:{
        type:Number,
        required:true

    },
    address:{
        type:String
    },
    jobtitle:{
        type:String
    },
    company:{
        type:String
    },
    location:{
        type:String
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    },
    jobDesc:{
        type:String
    },
    degree:{
        type:String
    },
    school:{
        type:String
    },
    major:{
        type:String
    },
    gradDate:{
        type:String
    },
    skill1:{
        type:String
    },
    skill2:{
        type:String
    },
    skill3:{
        type:String
    }

})

const UsersInfo = new mongoose.model("UsersInfo",userSchema);
module.exports = UsersInfo;