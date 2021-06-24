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
app.use(express.json());
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

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
async function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  let user = await User.findOrCreate({
    where: {
      // avatarURL:        profile.photos[0].value,
      loginStrategy:    profile.provider,
      loginStrategyId:  profile.id,
      username:         profile.username
    }
  });
  cb(null, profile);
  }
)
);

passport.serializeUser(function(user, cb){
  cb(null, user.id);
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


app.get('/login', (req,res) =>{
  if(req.user){
    return res.redirect('/events');
  }
  res.render('login',{
    locals: {
      isAuthenticated: req.isAuthenticated()
    },
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header'
    }
  });
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
  }
);



// ----------------------------------------------------------------------------
//                          LINK AND USE ROUTES                                
// ----------------------------------------------------------------------------

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/user');
// const vendorsRouter = require('./routes/vendor');

app.use('/events', homeRouter);
app.use('/users', usersRouter);
// app.use('/vendors', vendorsRouter);

app.get('/about-us', (req, res)=>{
  res.render('about',{
    locals: {
      isAuthenticated: req.isAuthenticated()
    },
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header'
    }
  });
});

app.get('/create-event', (req, res)=>{
  res.render('createEvents',{
    locals: {
      isAuthenticated: req.isAuthenticated()
    },
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header'
    }
  });
});
// ----------------------------------------------------------------------------
//                                CATCH ALL                                    
// ----------------------------------------------------------------------------
app.get('/', (req, res)=>{
  res.redirect('/events');
})

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
});

// ----------------------------------------------------------------------------
//                             LISTENING PORT                                  
// ----------------------------------------------------------------------------


app.listen("3030", ()=>{
  console.log('Server is running at port 3030');
})

