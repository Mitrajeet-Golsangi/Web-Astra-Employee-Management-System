const mongoose = require('mongoose');


const CompanySchema = mongoose.Schema({
	name: String,
	type: String,
	address: String,
	departments: [String]
})

module.exports = mongoose.Model.Company || mongoose.model("Company", CompanySchema);
