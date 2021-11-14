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
                select s.title, s.survey_id, q.text, q.question_id from questions q
                join surveys s
                on q.survey_id = s.survey_id;
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
    },
    recordSurvey: (req, res) => {
        let { surveyId, name, q1, q2, q3, q4, q5 } = req.body;
        surveyId = parseInt(surveyId);
        let qId = 1;
        sequelize.query(
            `
                insert into names (name, survey_id) 
                values ('${name}', ${surveyId});

                insert into answers (text, question_id)
                values 
                ('${q1}', ${qId}),
                ('${q2}', ${qId+1}), 
                ('${q3}', ${qId+2}),
                ('${q4}', ${qId+3}),
                ('${q5}', ${qId+4})
                ;
            `
        )
        .then(dbRes => res.status(200).send('Succesfully submitted!'))
        
    }
}