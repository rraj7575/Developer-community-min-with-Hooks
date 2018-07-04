const jwtStrategy = require('passport-jwt').Strategy
const extratJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = require('./../models/User')
const keys = require('./keys')
const opts = {}
opts.jwtFromRequest = extratJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretKey

module.exports = passport => {
  passport.use(new jwtStrategy(opts, (jwt_payloads, done) => {
    User.findById(jwt_payloads.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err ))
  }))
}

