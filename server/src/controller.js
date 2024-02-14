// have all of the business logic related to each route
const pool = require('./db')
const queries = require('./queries')

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        // if it was a successful query, the status will be 200 in which case you should send back this json data
        return res.status(200).json(results.rows);
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    //pool.query(query statement, arguments to pass into the query statement, callback function)
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows);
    })
}

const addUser = (req, res) => {
    // the body of the request is going to be json with these fields so use JS destructuring to extract those values
    let { first_name, last_name, username, password } = req.body;
    first_name = first_name[0];
    last_name = last_name[0];
    username = username[0];
    password = password[0];

    // ensure the username is not in the database before attempting to add a new user
    pool.query(queries.checkUsernameExists, [username], (error, results) => {
        if (error) throw error;
        // if a user has that email, returned will be a JSON array 
        if (results.rows.length) return res.send("Username is taken");
        
        pool.query(queries.addUser, [first_name, last_name, username, password], (error, results) => {
            if (error) throw error;
            return res.status(201).send("User created");
        })

    })
}

const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        if (!results.rows.length) return res.send("Deletion failed. User does not exist");

        pool.query(queries.deleteUserById, [id], (error, results) => {
            if (error) throw error;
            return res.status(200).send("User deleted");
        })
    })
}

const checkLogin = (req, res) => {
    const username = req.query.username.toString()
    const password = req.query.password.toString()
    
    pool.query(queries.checkUserLogin, [username, password], (error, results) => {
        
        if (error) throw error;
        if (!results.rows.length) {
            return res.send("Username and/or password are incorrect");
        } else {
            return res.status(200).send("Login succeeded");
        } 
    })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUserById,
    checkLogin,
}