const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const Place=require('../models/Place.js')
const router = express.Router();
router.route('/').post( (req, res) => {
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
  });
  module.exports = router;