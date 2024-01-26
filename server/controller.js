const pool = require('./db');
const queries = require('./queries')

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getUserById = (req, res) => {
    const username = req.params.username;
    console.log(req.params.username);

    pool.query(queries.getUserById, [username], (error, results) => {
        if (error) throw error;

        if (results.rows.length === 0) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(results.rows);
    })
}

const addUser = (req, res) => {
    const { username, password } = req.body;
    pool.query(queries.checkUsernameExists, [username], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            return res.status(400).send('Username already exists.');
        } else {
            pool.query(queries.addUser, [username, password], (error, results) => {
                if (error) throw error;
                res.status(201).send('User created successfully!');
                console.log("User Created")
            })
        }
    })
}

const deleteUser = (req, res) => {
    const username = req.params.username;

    pool.query(queries.getUserById, [username], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send('User does not exist in the database.');
        }
        pool.query(queries.deleteUser, [username], (error, results) => {
            if (error) throw error;
            res.status(200).send('User removed successfully.')
        })
    })
}

const updateUserInfo = (req, res) => {
    const username = req.params.username;
    const { items, total } = req.body;

    const jsonItems = JSON.stringify(items);
    

    pool.query(queries.getUserById, [username], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send('User does not exist in the database.');
        }
        pool.query(queries.updateUserInfo, [jsonItems, total, username], (error, results) => {
            if (error) throw error;
            res.status(200).send('User updated successfully.')
        })
    })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUserInfo
}