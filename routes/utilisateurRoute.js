const express = require("express");
const Route = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

Route.get('/getUtilisateurs', utilisateurController.getUtilisateurs)
Route.post('/create', utilisateurController.create)
Route.post('/edit', utilisateurController.edit)
Route.post('/delete', utilisateurController.delete)




module.exports = Route