const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/User.js')
const Place=require('./models/Place.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const cookieParser = require('cookie-parser')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use('/uploads', express.static('uploads'));

app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5173'
}));
app.use(express.json());
app.use(cookieParser())
app.get('/test', (req, res) => {

  res.json('test ok');
});

app.post('/register', async (req, res) => {


  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }

});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {

    jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token);


      if (user.password === password) {

        res.json({ message: "found", email, password });
      } else {
        res.json({ message: "incorrect password" });
      }
    });
  } else {
    res.json({ message: "user not found" });
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
      //console.log(user);

    })
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});



app.post('/save', async (req, res) => {
  const { token } = req.cookies;
  const { title, address, description } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const owner = user.email; 

    try {
      const placeDoc = await Place.create({
        owner, 
        title,
        address,
        description,
        
      });

      res.json(placeDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  });
});


app.post('/upload',upload.single('photos'),async(req,res)=>
{
  
  const photos=req.file.path;
  //console.log(imagePath);
 try {
  const placeDoc = await Place.create({
   photos,
  });
  res.json(placeDoc);
} catch (e) {
  res.status(422).json(e);
}
});

app.get('/places', async(req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const owner = user.email; 
    const place=await Place.find({owner});
    res.json(place);
    console.log(place);

   
  });
  
})

app.listen(4000)