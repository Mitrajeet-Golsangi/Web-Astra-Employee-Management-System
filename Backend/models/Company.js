const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
	name: String,
	address: String,
	departments: [String],
	//Point of contact (Person)
	poc: {
		type:[mongoose.Schema.Types.ObjectId],
		ref: 'User',
		required: true,
	},
});

// module.exports = mongoose.Model.Company || mongoose.model("Company", CompanySchema);

const company = mongoose.model('Company', CompanySchema);

module.exports = company;
