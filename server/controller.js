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
    },
    getSurvey: (req, res) => {
        sequelize.query(
            `
                select s.title, q.text from questions q
                join surveys s
                on q.survey_id = s.survey_id;
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
    },
    recordSurvey: (req, res) => {
        res.status(200).send(req.body)
    }
}