const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const session = require('express-session');

const router = express.Router();

router.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Invalid email or password!' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Invalid email or password!' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      return done(null, false, { message: 'User not found!' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

router.get('/signin', (req, res) => {
    res.render('signin',{ error: req.query.error });
});

router.post('/signin', passport.authenticate('local', { 
    successRedirect: '/profile',
    failureRedirect: '/signin?error=' + encodeURIComponent('Invalid username or password!')
  }));
  

  router.get('/signup', (req, res) => {
    res.render('signup', { error: req.query.error });
  });
  
  router.post('/signup', async (req, res) => {
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
  
    try {
      if (password !== confirm_password) {
        res.redirect('/signup?error=' + encodeURIComponent("PASSWORD is not matching with CONFIRM PASSWORD!"));
      } else {
        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        // Create a new user with the hashed password
        const newUser = new Users({
          fullname: req.body.fullname,
          email: req.body.email,
          password: hashedPassword,
        });

        
        // Save the user to the database
        await newUser.save();
        res.redirect("/signin");


      }
    } catch (err) {
      if (err.code === 11000 && err.keyPattern.email) {
        res.status(409).redirect('/signup?error=' + encodeURIComponent('A user with that email already exists!'));
      } else {
        console.log(err);
        res.status(400).send(err);
      }
    }
  });


  router.get('/signout', (req, res) => {
    req.logout(() => {
      res.clearCookie('session');
      res.redirect('/signin');
    });
  });




module.exports = router;
