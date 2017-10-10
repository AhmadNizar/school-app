const express = require('express');
const session = require('express-session')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static(__dirname + '/views'))

app.use(session({
	secret: 'berhasil',
	resave: false,
	saveUninitialized: true
}))
const subject = require('./routes/subject')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const login = require('./routes/login')
const index = require('./routes/index')


app.use('/login', login)

app.use('/index', index)

app.use('/teacher', teacher)

app.use('/subject', subject)

app.use('/student', student)

app.get('/', function (req, res) {
  res.redirect('/login')
})

app.listen(process.env.PORT || '3000', function() {
  //console.log('sini guuys');
});