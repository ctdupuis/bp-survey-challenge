require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const {
    root
} = require('./controller')


app.use(express.json());
app.use(cors());

const { PORT } = process.env;

app.get("/", root);


app.listen(PORT, () => console.log(`App running on port ${PORT}`));