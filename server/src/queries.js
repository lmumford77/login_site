// store all queries to the database

const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkUsernameExists = "SELECT s from users s WHERE username = $1";
const addUser = "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)";
const deleteUserById = "DELETE FROM users WHERE id = $1";
const checkUserLogin = "SELECT s FROM users s WHERE username = $1 AND password = $2";

module.exports = {
    getUsers,
    getUserById,
    checkUsernameExists,
    addUser,
    deleteUserById,
    checkUserLogin,
};
