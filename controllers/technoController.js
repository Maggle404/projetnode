const pool = require('../database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

// MIDDLEWARES

// FONCTIONS

exports.getTechno = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM techno");
        conn.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.createTechno = async (req, res) => {
    const { tech, date, createur } = req.body;
    try {
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO techno (tech, createur) VALUES (?, ?)', [tech, createur]);
        conn.release();
        res.status(201).json({ message: 'Technologie créée' });
    } catch (error) {
        console.error("Erreur lors de la crémation", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateTechno = async (req, res) => {
    const id = req.params.id;
    const { tech, date, createur } = req.body;
    try {
        const conn = await pool.getConnection();
        await conn.query('UPDATE techno SET tech = ?, createur = ? WHERE id = ?', [tech, createur, id]);
        conn.release();
        res.status(200).json({ message: 'Technologie mise à jour :D' });
    } catch (error) {
        console.error("Error de MàJ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteTechno = async (req, res) => {
    const id = req.params.id;
    try {
        const conn = await pool.getConnection();
        await conn.query('DELETE FROM techno WHERE id = ?', [id]);
        conn.release();
        res.status(200).json({ message: 'Technologie effacée avec succès' });
    } catch (error) {
        console.error("Erreur! techno non effacée!", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}