const express = require('express');
const jwt = require('jsonwebtoken');
const Place=require('../models/Place.js')
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/').post(upload.single('photos'), async (req, res) => {
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
})

module.exports = router;