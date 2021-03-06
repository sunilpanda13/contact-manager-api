const express = require('express');
const contacRoute = require('./routes/contact');
const userRoute = require('./routes/user');
const dbconn = require('./config/db.conn');
const cors = require("cors");
const app = express();
const port = process.env.PORT;

const corsOption={
    "origin":"*"
}

app.use(cors(corsOption));
app.use(express.json());
app.use('/api/contact',contacRoute);
app.use('/api/user',userRoute);
dbconn();

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to Sunil's Contact Manager App"
	});
});

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});
