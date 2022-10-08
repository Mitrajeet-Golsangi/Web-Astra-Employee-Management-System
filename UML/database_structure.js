
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
		phone_number: {
			type: Number,
			maxlength: 10,
			required: true,
		},
		is_admin: {
			type: Boolean,
			default: false,
		},
		email_verified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const EmployeeSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
})