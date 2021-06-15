require('dotenv').config()
const express = require('express');
const session = require('express-session');
const es6Renderer = require('express-es6-template-engine');
const app = express();
const Sequelize = require('sequelize');
const { User } = require('./models');
  
const sess = {
  secret:"nueral handshake",
  cookie: {maxAge: 60000}
}
  
app.engine('html', es6Renderer);
app.set('views', 'server/templates');
app.set('view engine', 'html');

app.use(session(sess));
app.use(express.static('server/public'));

// ----------------------------------------------------------------------------
//                          LINK AND USE ROUTES                                
// ----------------------------------------------------------------------------

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/user');
const vendorsRouter = require('./routes/vendor');

app.use('/events', homeRouter);
app.use('/users', usersRouter);
app.use('/vendors', vendorsRouter);

// ----------------------------------------------------------------------------
//                                CATCH ALL                                    
// ----------------------------------------------------------------------------

app.get('*', (req, res)=>{
  res.render('404');
  // res.json({
  //   "catch":"all"
  // });
})

// ----------------------------------------------------------------------------
//                             LISTENING PORT                                  
// ----------------------------------------------------------------------------

app.listen('3030', ()=>{
  console.log('Server is running at port 3030');
})

