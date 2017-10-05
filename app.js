const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static(__dirname + '/views'))
const subject = require('./routes/subject')
const teacher = require('./routes/teacher')
const student = require('./routes/student')

app.use('/', teacher)

app.use('/', subject)

app.use('/', student)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function() {
  //console.log('sini guuys');
});