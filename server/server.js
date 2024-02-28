const express = require('express');
const userRoutes = require('./routes');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = process.env.PORT ?? 5200;

app.use(express.json());
app.use(cors({
    origin: 'ecommerce-app.onrender.com'
}));

app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));