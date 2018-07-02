const express = require('express');
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

const app = express();
const db = require('./config/keys').mongoAwsURL
console.log(db)
//Connect to mongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err) )

//Api Routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

app.get('/', (req, res) => res.send('hello world'));
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))