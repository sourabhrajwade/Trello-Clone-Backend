
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');

// dot env 
require('dotenv').config();

// Port 
const port = process.env.process || 3000;
const server = http.createServer(app);

// mongoose 
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hh5l0.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));

server.listen(port, () => {
    console.log(`listening on ${port}`);
  });
