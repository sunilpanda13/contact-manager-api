const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	//Server
	port : process.env.PORT,
	
	//MongoDB
	mongodbUsername : process.env.MONGODB_USERNAME,
	mongodbPassword : process.env.MONGODB_PASSWORD,

	// JWT
	jwtSecret : process.env.JWT_SECRET_KEY,
};