const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const Place=require('../models/Place.js')
const router = express.Router();

router.route('/').get( (req, res) => {
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
module.exports = router;