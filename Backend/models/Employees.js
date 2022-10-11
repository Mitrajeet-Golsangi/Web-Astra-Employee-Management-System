const mongoose = require('mongoose');

// Change this schema when you are done with changing the code for express

const EmployeeSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company',
			required: true,
		},
		department_name: String,
		joining_date: Date,
		disabled: {
			type: Boolean,
			default: false,
		},
		tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' }],
	},
	{ timestamps: true }
);

const employee = mongoose.model('Employee', EmployeeSchema);
module.exports = employee;
