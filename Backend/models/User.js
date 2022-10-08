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
		company: { type: mongoose.Types.ObjectId, ref: "Company", required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.Model.User || mongoose.model("User", UserSchema);
