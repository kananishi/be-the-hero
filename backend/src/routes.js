const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

routes.get('/ongs', ongController.getAll);
routes.post('/ongs', ongController.create);

routes.get('/profile', profileController.index);
routes.post('/sessions', sessionController.create);

routes.get('/incident', incidentController.findAll );
routes.post('/incident', incidentController.create );
routes.delete('/incident/:id', incidentController.delete);

module.exports = routes;