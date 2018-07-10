const express = require('express');
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoAwsURL

//Connect to mongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err) )

//Passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

//Api Routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)
//Server static assets if in production

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  console.log('in production')
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__filename, 'client', 'build', 'index.html'))
  })
} else {
  console.log('dev')
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))