import mongoose from 'mongoose';

import '../models/Course';
import '../models/Instructor';
import '../models/Student';
import '../models/User';

const dbConnect = async () => {
	if (mongoose.connections[0].readyState) {
		return;
	}

	mongoose.connect(
		process.env.MONGO_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
			autoIndex: false, // Don't build indexes
			maxPoolSize: 10, // Maintain up to 10 socket connections
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
			family: 4, // Use IPv4, skip trying IPv6
		},
		err => {
			if (err) throw err;
		}
	);
};
export default dbConnect;
