const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		contact: {
			type: Number,
			maxlength: 10,
			required: true,
		},
		is_admin: {
			type: Boolean,
			default: false,
		},
		email_verified: { type: Boolean, default: false },
		company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: false },
	},
	{ timestamps: true }
);

const user = mongoose.model('User',UserSchema);
module.exports = user;
// module.exports = mongoose.Model.User || mongoose.model("User", UserSchema);
