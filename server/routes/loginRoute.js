

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const router = express.Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser())
router.route('/').post( async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
  
      jwt.sign({ email: user.email, id: user._id }, jwtSecret, { expiresIn: '100h' }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token,{ sameSite: 'None', secure: true });
        console.log(token);
  
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

  module.exports = router;