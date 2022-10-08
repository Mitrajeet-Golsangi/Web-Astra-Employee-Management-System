const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Employee = new Schema({
    
    fname:{
        required:true,
        type:String
    },
    lname:{
        required:true,
        type:String
    },
    contact_no:{
        required:true,
        type:Number
    },
    department:{
        required:true,
        type:String
    },
    Joining_date:{
        required:true,
        type:Date
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    isAdmin:{
        default:false,
        type:Boolean
    }
},{
    timeseries:true
});

const Employees = mongoose.model('Employee',Employee);

module.exports = Employees;