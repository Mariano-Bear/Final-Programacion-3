const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const db_connect = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const filas = await db_connect.query('SELECT * FROM users WHERE username = ?', [username]);
    if (filas.length > 0) {
        const user = filas[0];
        const validPass = await helpers.compararPassword(password, user.password)
        if (validPass) {
            return done(null, user, req.flash('success','Bienvenido'+ user.username));
        }else{
            return done(null,false, req.flash('message','CONTRASEÑA INCORRECTA'))
        }
    }else{
       return done(null, false, req.flash('message','USUARIO INCORRECTO'))
    }
    
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const {fullname} = req.body;
     console.log(req.body);

    const newUser = {
        username,
        password,
        fullname
    };

    newUser.password = await helpers.encriptarPassword(password);
    
    const result = await db_connect.query('INSERT INTO users SET ? ', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));


 passport.serializeUser((user, done) => {
    done(null, user.id);

 });

 passport.deserializeUser(async (id, done) => {
    const filas = await db_connect.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, filas[0]);
 });