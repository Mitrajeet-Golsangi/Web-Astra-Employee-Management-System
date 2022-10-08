const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
	{
		task_type: String,
		start_time: TimeRanges,
		duration: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
