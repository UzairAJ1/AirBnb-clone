const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

const router = express.Router();

router.route('/').get( (req, res) => {
    const { token } = req.cookies
  
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, user) => {
        if (err) throw err;
        res.json(user);
        //console.log(user);
  
      })
    }
  });
  module.exports = router;