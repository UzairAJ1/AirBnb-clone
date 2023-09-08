const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const Place=require('../models/Place.js')
const router = express.Router();
const Book=require('../models/Booking.js')
const cookieParser = require('cookie-parser')
router.use(express.json());
router.use(cookieParser())
router.use('/uploads', express.static('uploads'));
router.route('/').post( (req, res) => {
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
module.exports = router;