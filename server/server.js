require('dotenv').config();
const express = require('express');
const session = require('express-session');
const es6Renderer = require('express-es6-template-engine');
const app = express();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const Sequelize = require('sequelize');
const { User } = require('./models');
  
app.engine('html', es6Renderer);
app.set('views', 'server/templates');
app.set('view engine', 'html');
app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true,
  // secure: false,
  maxAge: 24 * 60 * 60 * 1000, 
},
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb){
  cb(null, user);
});


passport.deserializeUser(function(id, cb){
  cb(null, id);
});

// app.use(session(sess));
// app.use(express.static('server/public'));
app.use('/', express.static(__dirname + '/public'));

// ----------------------------------------------------------------------------
//                                  Auth Routes                                
// ----------------------------------------------------------------------------

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { httpOnly: true,
//   // secure: false,
//   maxAge: 24 * 60 * 60 * 1000, 
// },
// }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    cb(null, profile);
    }
  )
);

function isAuth(req,res,next){
  if(req.isAuthenticated()){
     return next();
  } 
  
  res.redirect('/login');
   
}

// app.get('/', (req, res) =>{
//   res.render('dashboard');
// })

app.get('/login', (req,res) =>{
  if(req.user){
    return res.redirect('/events');
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
    res.redirect('/events');
  });
  


// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   SaveUninitialzed: false
// }));

// ----------------------------------------------------------------------------
//                          LINK AND USE ROUTES                                
// ----------------------------------------------------------------------------

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/user');
const vendorsRouter = require('./routes/vendor');

app.use('/events', homeRouter);
app.use('/users', isAuth, usersRouter);
app.use('/vendors', isAuth, vendorsRouter);

// ----------------------------------------------------------------------------
//                                CATCH ALL                                    
// ----------------------------------------------------------------------------

app.get('*', (req, res)=>{
  res.render('404',{
    locals: {
      isAuthenticated: req.isAuthenticated()
    },
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header'
    }
  });
  // res.json({
  //   "catch":"all"
  // });
});

// ----------------------------------------------------------------------------
//                             LISTENING PORT                                  
// ----------------------------------------------------------------------------


app.listen('3030', ()=>{
  console.log('Server is running at port 3030');
})

