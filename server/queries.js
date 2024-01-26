const getUsers = 'SELECT * FROM user_list';
const getUserById = 'SELECT * FROM user_list WHERE LOWER(username) = LOWER($1)';
const checkUsernameExists = 'SELECT * FROM user_list WHERE username = $1';
const addUser = 'INSERT INTO user_list (username, password) VALUES ($1, $2)';
const deleteUser = 'DELETE FROM user_list WHERE LOWER(username) = LOWER($1)';
const updateUserInfo = "UPDATE user_list SET items = $1::jsonb, total = $2 WHERE LOWER(username) = LOWER($3)";

module.exports = {
    getUsers,
    getUserById,
    checkUsernameExists,
    addUser,
    deleteUser,
    updateUserInfo
};