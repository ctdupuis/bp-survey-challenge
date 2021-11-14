require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());

const { PORT } = process.env;

app.get("/", (req, res) => console.log("Hit the main endpoint"))


app.listen(PORT, () => console.log(`App running on port ${PORT}`));