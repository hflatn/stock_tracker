
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const controller = require('./controller.js')
const cors = require('cors');

require('dotenv').config()

const app = express();

app.use( express.static( `${__dirname}/build` ) );
app.use( bodyParser.json() );
app.use( cors() );

massive( process.env.CONNECTION_STRING ).then ( db =>
    { console.log("database connected")
    app.set('db', db);
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use( new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID:process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid profile'
},  
 function(acessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db')
    db.find_user([ profile.user_id ]).then( (userbase ) => {
        if (!userbase[0]) {
            db.create_user([profile.user_id]).then((userbase) => {
                return done(null, userbase[0].user_id)
            })
        }
        else { 
            return done(null, userbase[0].user_id)
        }
    })
 }
))

passport.serializeUser( (user_id, done) => {
    done(null, user_id)
})

passport.deserializeUser( (user_id, done) => {
    const db = app.get('db')
    done(null, user_id)
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))

app.get('/api/getstocks', controller.getstocks)
app.get('/api/allhistory', controller.allhistory)
app.post('/api/addstock', controller.addstock)
app.post('/api/searchhistory', controller.searchhistory)
app.patch('/api/updatestock', controller.updatestock)
app.delete('/api/deletestock', controller.deletestock)

const port =  3111
app.listen( port, () => { console.log("Be-Booo-Booo-Bop...Server Online...Beep-Boop")})