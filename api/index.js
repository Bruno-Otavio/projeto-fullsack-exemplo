require('dotenv').config();
const express = require('express')
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
const routes = require('./src/routes');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Working on PORT: ${PORT}`)
});