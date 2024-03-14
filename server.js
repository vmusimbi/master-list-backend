const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'masterlist',
});

connection.connect();


app.get('/registry', (req, res) => {
    connection.query('SELECT * FROM facilities', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/registry', (req, res) => {

    const newItem = req.body;

    connection.query('INSERT INTO facilities ?', newItem, (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId, ...newItem });
    });
});

app.put('/registry/:id', (req, res) => {

    const newItem = req.params.id;
    const updatedItem = req.body;

    connection.query('UPDATE facilities SET ? WHERE facility_id = ?', [updatedItem, itemId], (error) => {
        if (error) throw error;
        res.json({ id: itemId, ...updatedItem });
    });
});

app.delete('/registry/:id', (req, res) => {

    const newItem = req.params.id;

    connection.query('DELETE FROM facilities WHERE facility_id = ?', itemId, (error) => {
        if (error) throw error;
        res.json({ message: 'Item deleted successfully', id: itemId });
    });
});

app.get('/registry/search', (req, res) => {
    
    const { facility_id, mfl_code,facility_name } = req.query;
    connection.query('SELECT * FROM facilities WHERE facility_id = ?   mfl_code = ? AND facility_name ?', [facility_id, mfl_code, facility_name], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
