const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const Place=require('../models/Place.js')
const router = express.Router();

router.route('/').get( (req, res) => {
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
module.exports = router;