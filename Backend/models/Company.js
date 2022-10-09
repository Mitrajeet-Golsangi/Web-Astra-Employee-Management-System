const mongoose = require('mongoose');
const { stringify } = require('querystring');

const Schema = mongoose.Schema;
const CompanySchema = mongoose.Schema({
	
	
	//+Added additionally...
	email:{
		type:String,
		require:true
	},
	name: String,
	type: String,
	address: String,
	departments: [String],
	//Point of contact (Person)
	poc:{
		type:[Schema.Types.ObjectId],
		ref:'User',
		required:true
	}
})

// module.exports = mongoose.Model.Company || mongoose.model("Company", CompanySchema);


const company = mongoose.model("Company",CompanySchema);

module.exports = company;