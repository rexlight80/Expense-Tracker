const express=require("express");
const dotenv = require("dotenv");
const colors=require("colors");
const app = express();
const morgan = require("morgan");
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");
const path = require('path');
const cors = require('cors'); 

dotenv.config({path:"./config/config.env"});
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/transactions',transactions);

if(process.env.NODE_ENV==='production'){
app.use(express.static('client/build'))
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}
const PORT=process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});

