const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = 5200;

app.get('/users', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM user_list');
        res.json(users.rows);
    } catch (error) {
        console.error(error);
    }
})

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));