const express = require( "express");
const morgan = require("morgan");
const bodyParser = require( "body-parser");
const cors = require( "cors");

const boardRouter = require ("./routes/boards");
const columnRouter = require( "./routes/columns");
const cardRouter = require( "./routes/card");

require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());


app.use('/api/v1/boards',boardRouter);
app.use('/api/v1/columns',columnRouter);
app.use('/api/cards',cardRouter);

app.use((req,res,next)=>{
   const error = new Error('I think you are lost ');
   error.status=404;
   next(error);
});

app.use((error,req,res,next)=>{
   res
       .status(error.status || 500)
       .json({
           error:{
               message:error.message
           }})
});


module.exports = app;




