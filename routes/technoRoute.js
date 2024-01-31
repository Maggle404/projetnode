const express = require("express");
const Route = express.Router();
const technoController = require('../controllers/technoController');


Route.get('/getTecho', technoController.getTechno)
Route.post('/createTechno', technoController.createTechno)
Route.put('/updateTechno/:id', technoController.updateTechno)
Route.delete('/deleteTechno/:id', technoController.deleteTechno)

module.exports = Route