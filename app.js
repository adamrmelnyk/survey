var express = require('express');
var Sequelize = require('sequelize');
var app = express();

// TODO: That means we will probably have to create this as part of an init script
var sequelize = new Sequelize('survey', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var SurveyAnswer = sequelize.define('SurveyAnswer', {
  Answer: {
    type: Sequelize.TEXT,
    field: 'answer',
  }
}, {
  freezeTableName: true,
  paranoid: true,
});

var SurveyQuestion = sequelize.define('SurveyQuestion', {
  Question: {
    type: Sequelize.TEXT,
    field: 'question'
  },
}, {
  freezeTableName: true,
  paranoid: true,
});
// Creating the associations
SurveyQuestion.hasMany(SurveyAnswer);
SurveyAnswer.belongsTo(SurveyQuestion)
sequelize.sync();

function nextSurveyQuestion() {
  // Returning mock data for now
  return '<h1>Survey Questions<h1> \
  <div>\
    <form>\
      <input type="radio" name="answer", value=""> A </ br>\
      <input type="radio" name="answer", value=""> B </ br>\
      <input type="radio" name="answer", value=""> C </ br>\
      <input type="radio" name="answer", value=""> D </ br>\
    </form>\
  <\div>'
}

app.route('/')
  .get(function(req, res) {
    res.send(nextSurveyQuestion());
  })
  .post(function(req, res) {
    // TODO: submit the survey answer
  });
app.route('/admin')
  .get(function(req, res) {
    res.send('TODO: Add the admin interface');
  });

app.listen(3000, function() {
  console.log('Example App listening on port 3000');
});