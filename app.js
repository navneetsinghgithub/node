const express = require("express")
const usersrouter = require("./routes/users")
const fileupload = require("express-fileupload")
const connectiondb = require("./connectiondb/connectionDB")
const dotenv = require("dotenv")
const app = express();
dotenv.config();
let port =process.env.port
connectiondb()


app.use(express.json());
app.use(fileupload());
app.use('/',usersrouter);

app.listen(port,(req,res)=>{
    console.log(`start your server ${port}`);
})


module.exports = app;