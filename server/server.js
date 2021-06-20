require('dotenv').config();
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const app = express();
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const Sequelize = require('sequelize');
const { User } = require('./models');
  

app.engine('html', es6Renderer);
app.set('views', 'server/templates');
app.set('view engine', 'html');
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb){
  cb(null, user.id);
});


passport.deserializeUser(function(id, cb){
  cb(null, id);
});

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


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true,
  secure: false,
  maxAge: 24 * 60 * 60 * 1000, 
},
}));

passport.use(new GitHubStrategy({
    clientID: '64704c03c40f4734a242',
    clientSecret: 'c997d2c08e13a2c9063ea90b0bcb7d0e5d0f17ba',
    callbackURL: "http://127.0.0.1:3030/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
    }
  )
);

const isAuth = (req,res,next) =>{
  if(req.user){
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', (req, res) =>{
  res.render('home');
})

app.get('/login', (req,res) =>{
  if(req.user){
    return res.redirect('/');
  }
  res.render('login');
});

app.get('/logout', (req,res) =>{
 req.logout();
 res.redirect('/login');
});

//auth
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  


// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   SaveUninitialzed: false
// }));


// ----------------------------------------------------------------------------
//                             LISTENING PORT                                  
// ----------------------------------------------------------------------------


app.listen('3030', ()=>{
  console.log('Server is running at port 3030');
})

