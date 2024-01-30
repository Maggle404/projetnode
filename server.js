const pool = require("./database");
const express = require("express");


//middleware
app.use(express.json())

// Requiring routes:
const utilisateur = require('./routes/utilisateurRoute.js')
const techno = require('./routes/technoRoute.js')

// API Routes:
app.use('/utilisateur', utilisateur)
app.use('/techno', techno)

app.listen(8000, ()=>{
    console.log("server open on 8000");
})