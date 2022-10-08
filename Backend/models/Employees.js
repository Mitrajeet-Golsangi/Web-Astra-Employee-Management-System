const mongoose = require('mongoose');

// Change this schema when you are done with changing the code for express

// const EmployeeSchema = mongoose.Schema(
// 	{
// 		user: {
// 			type: mongoose.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 		company: { type: mongoose.Types.ObjectId, ref: "Company", required: true },
// 		department_name: String,
// 		joining_date: Date,
// 		disabled: {
// 			type: Boolean,
// 			default: false
// 		},
// 		tasks: [{type: mongoose.Types.ObjectId, ref: "Tasks", required: true}],
// 	},
// 	{ timestamps: true }
// );

// module.exports = mongoose.Model.Employee || mongoose.model("Employee", EmployeeSchema);



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