const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/User.js')
const Place=require('./models/Place.js')
const Book=require('./models/Booking.js')
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
  origin: 'https://memories-app-e3h7.vercel.app/'
}));
app.use(express.json());
app.use(cookieParser())
app.get('/test', (req, res) => {

  res.json('test ok');
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {

    jwt.sign({ email: user.email, id: user._id }, jwtSecret, { expiresIn: '100h' }, (err, token) => {
      if (err) throw err;
      res.cookie('token', token);
      //console.log(token);

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



app.post('/save',upload.single('photos'), async (req, res) => {
  const { token } = req.cookies;
  const { title, address, description } = req.body;
  const booked=false;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const owner = user.email; 

    try {
      const photos=req.file.path;
  console.log(req);
      const placeDoc = await Place.create({
        booked,
        owner, 
        title,
        address,
        description,
        photos
        
      });

      res.json({placeDoc,message:'saved'});
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
    //console.log(place);

   
  });
  
})
app.get('/start',async (req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      const places=await Place.find();
      res.json(places);
      return;
    }
    const owner = user.email; 
    const places=await Place.find({ owner: { $ne: owner } });
    res.json(places);
    //console.log(place);

   
  });
})
app.post('/find',async (req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      const {_id}=req.body;
      const places=await Place.findOne({_id});

      res.json({data:places,message:'user not found'});
      return;
    }
    else
    {
      const {_id}=req.body;
      const places=await Place.findOne({_id});

      res.json({data:places,message:'user found'});
      return;
    }
    
  
  //res.json(places);
    //console.log(place);

   
  });
  
})

app.post('/book',(req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    
    
      const {_id,checkingDate,checkoutDate,checkinTime,checkoutTime}=req.body;
      const place=await Book.findOne({_id});
      const resident=user.email;
      const places=await Place.findOne({_id});
      const owner=places.owner;
      await Place.updateOne({ _id: _id }, { $set: { booked: true } });
      console.log(place);
      if(place!==null)
      {
        res.json({message:"Already booked"})
      }
      else
      {
      
      try {
        const bookdoc = await Book.create({
          owner,
          _id,
          checkingDate,
          checkoutDate,
          checkinTime,
          checkoutTime,
          resident,
        });
        res.json({bookdoc,message:"saved"});
      } catch (e) {
        res.status(422).json(e);
      }
      //const places=await Place.findOne({_id});
    
      //res.json({data:places,message:'user found'});
      return;
    
    
  
  //res.json(places);
    //console.log(place);

    }
  });
})

app.post('/my-booking', async(req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const resident = user.email; 
    const place=await Book.find({resident});
    //res.json(place);
    //console.log(place);
    res.json(place);
   
  });
})
app.listen(4000)