const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

// db.select('*').from('users')
//     .then(data => {
//         console.log(data);
// });

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

// using dependency injection to refactor code
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

/* API Design
/ --> res = this is working
/signin --> POST = success/fail (Why a POST? Because we're sending a password)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user/count

*/