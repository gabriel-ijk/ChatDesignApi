const express = require('express');
const router = express.Router();

let currentUser = null;

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  currentUser = req.body.username;
  res.redirect('/rooms');
});

router.get('/logout', (req, res) => {
  currentUser = null;
  res.redirect('/login');
});

router.get('/currentUser', (req, res) => {
  res.json({ user: currentUser });
});

module.exports = router;
