const express = require('express');
const { createRoom, getRooms, findRoom } = require('../models/roomModel');
const { addMessage } = require('../models/messageModel');
const router = express.Router();
const { currentUser } = require('./auth');

router.get('/', (req, res) => {
  const rooms = getRooms();
  res.render('rooms', { rooms });
});

router.post('/create', (req, res) => {
  const { name, isPrivate, password } = req.body;
  createRoom(name, isPrivate === 'on', password);
  res.redirect('/rooms');
});

router.get('/room/:id', (req, res) => {
    const room = findRoom(parseInt(req.params.id));
    if (room) {
      if (room.isPrivate) {
        // Verifique a senha
        if (!req.query.password || req.query.password !== room.password) {
          return res.status(401).send('Senha incorreta!');
        }
      }
      res.render('chatroom', { room, user: currentUser });
    } else {
      res.status(404).send('Sala não encontrada');
    }
  });

router.post('/room/:id/message', (req, res) => {
  const room = findRoom(parseInt(req.params.id));
  if (room) {
    const message = addMessage(room, req.body.message, currentUser);
    res.json(message);
  } else {
    res.status(404).send('Sala não encontrada');
  }
});

module.exports = router;
