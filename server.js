const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send('WELCOME!') })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

app.listen(PORT, ()=> {
	console.log(`app is running on port ${PORT}`);
});
