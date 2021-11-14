require('dotenv').config();
const Sequelize = require('sequelize');
const { CONNECTION } = process.env;

const sequelize = new Sequelize(CONNECTION, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    root: (req, res) => {
        res.status(200).send("You hit the root endpoint")
    }
}