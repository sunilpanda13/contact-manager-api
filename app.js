const express = require('express');
const contacRoute = require('./routes/contact');
const userRoute = require('./routes/user');
const dbconn = require('./config/db.conn');
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;

const corsOption={
    "origin":"*"
}

app.use(cors(corsOption));
app.use(express.json());
app.use('/api/contact',contacRoute);
app.use('/api/user',userRoute);
dbconn();

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});