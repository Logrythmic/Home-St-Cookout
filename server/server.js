require('dotenv').config()
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const app = express();
  
  
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


app.get('*', (req, res)=>{
  res.json({
    "catch":"all"
  });
})

app.listen('3030', ()=>{
  console.log('Server is running at port 3030');
})

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/user');
const vendorsRouter = require('./routes/vendor');

app.use('/events', homeRouter);
app.use('/users', usersRouter);
app.use('/vendors', vendorsRouter);