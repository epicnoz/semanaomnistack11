const express = require('express');
const OngController = require('./controllers/OngController');
const InsidentController = require('./controllers/InsidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const route = express.Router();

route.post('/session', SessionController.create);

route.get('/ongs', OngController.index);
route.post('/ongs', OngController.create);

route.get('/insidents', InsidentController.index);
route.post('/insidents', InsidentController.create);
route.delete('/insidents/:id', InsidentController.delete);

route.get('/profile', ProfileController.index);

module.exports = route;
