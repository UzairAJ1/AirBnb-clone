const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
//const User = require('./models/User.js');
const Place=require('./models/Place.js')
const Book=require('./models/Booking.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const cookieParser = require('cookie-parser')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const loginRoute=require('./routes/loginRoute.js')
const profileRoute=require('./routes/profileRoute.js')
const logoutRoute=require('./routes/logoutRoute.js')
const saveRoute=require('./routes/saveRoute.js')
const findRoute=require('./routes/findRoute.js')
const startRoute=require('./routes/startRoute.js')
const placesRoute=require('./routes/placesRoute.js')
const bookRoute=require('./routes/bookRoute.js')
const myBookingRoute=require('./routes/my-bookingRoute.js')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use('/uploads', express.static('uploads'));

app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5173',
  
  //methods:["POST","GET"]
}));
app.use(express.json());
app.use(cookieParser())
app.get('/test', (req, res) => {

  res.json('test ok');
});

app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/save', saveRoute);
app.use('/find', findRoute);
app.use('/start', startRoute);
app.use('/places', placesRoute);
app.use('/book', bookRoute);
app.use('/logout',logoutRoute)
app.use('/my-booking',myBookingRoute)
app.listen(4000)

module.exports = app;