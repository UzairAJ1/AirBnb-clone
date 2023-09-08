const express = require('express');
const cookieParser = require('cookie-parser')
const router = express.Router();
router.use(cookieParser())
router.route('/').post( async (req, res) => {
    res.cookie('token', '',{ sameSite: 'None', secure: true }).json(true);
});

module.exports = router;