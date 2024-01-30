let http = require("http");
const pool = require("./database");
const express = require("express");


// créer le serveur
const app = express();
app.use(express.json())
app.get("/", (req, res)=>{
    res.writeHead(200,{"content-type":"text/html"}).end("<strong>Hello world</strong>");
})

let utilisateur = [];

// ROUTES API

app.post('/utilisateur/create', async (req, res) => {
    const { nom, prenom, email } = req.body;
        const connection = await pool.getConnection();
        const [results] = await connection.query('INSERT INTO utilisateur (nom, prenom, email) VALUES (?, ?, ?)', [nom, prenom, email]);
        connection.release();
        res.json({ id: results.insertId, nom, prenom, email });
});

app.get('/utilisateur', async (req, res) => {
    const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM utilisateur');
        connection.release();
        res.json(results);  
});

app.put('/utilisateur/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email } = req.body;
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?', [nom, prenom, email, id]);
        connection.release();
        res.json({ id, nom, prenom, email });
    } catch (error) {
        console.error("Error editing user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/utilisateur/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('DELETE FROM utilisateur WHERE id = ?', [id]);
        connection.release();
        if (results.affectedRows > 0) {
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur introuvable' });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// listen sers à ouvrir le serveur sur le port rensigné (3000 our 8000)
app.listen(8000);
