const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const router = express.Router();
const Book=require('../models/Booking.js')
const cookieParser = require('cookie-parser')
router.use(express.json());
router.use(cookieParser())
router.use('/uploads', express.static('uploads'));

router.route('/').post( (req, res) => {
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

module.exports = router;