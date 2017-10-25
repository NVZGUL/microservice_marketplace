const express = require('express');
const router = express.Router();

router.get('/', (req, res) => 
    req.user ? res.render('admin', {user: req.user}) : res.redirect('/login')
);

module.exports = router;