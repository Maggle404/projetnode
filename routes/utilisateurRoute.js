const express = require("express");
const Route = express.Router();
const utilisateurController = require('../controllers/utilisateurController');


Route.get('/getUtilisateurs', utilisateurController.getUtilisateurs)
Route.post('/createUtilisateur', utilisateurController.create)
Route.put('/editUtilisateur/:id', utilisateurController.edit)
Route.delete('/deleteUtilisateur/:id', utilisateurController.delete)

module.exports = Route