const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
	{
		task_type: String,
		start_time: String,
		duration: Number,
	},
	{ timestamps: true }
);


const task = mongoose.model('Tasks',TaskSchema);
module.exports = task;
// module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
