const userRoutes = require('./routes');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5432;

// middleware that allows you to post and get back json from endpoints
app.use(express.json())
app.use(cors())

// create the route to lead to the userRoutes
app.use('/api/v1/users', userRoutes);

app.listen(port, () => console.log(`App is listening on port ${port}`))
