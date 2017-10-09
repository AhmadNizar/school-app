const express = require('express')
const router = express.Router()
const Model = require('../models')
const CheckAuth = require('../helper/checkAuth')

router.use((req, res, next) =>{
	router.use(CheckAuth)
	console.log(req.session);
	if (req.session.role === 'headmaster') {
		next()
	}else{
		res.redirect('/login')
	}
})

router.get('/', (req, res) => {

	Model.Teachers.findAll({include:[Model.Subjects]}).then((result) =>{
		//res.send(result)
		res.render('teacher', {allTeacher : result, role : req.session.role})
	})
})

router.get('/deleteTeacher/:id', (req, res) => {

	Model.Teachers.destroy({
		where: { id : req.params.id }
	}).then(res.redirect('/teacher'))
})

router.get('/add', (req, res) =>{
	res.render('addteacher')
})

router.post('/addTeacher', (req, res) =>{
	Model.Teachers.create({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		createdAt : new Date(),
      	updatedAt : new Date(),
      	SubjectId : 0
	}).then(res.redirect('/teacher'))
})

router.get('/editTeacher/:id', (req, res) =>{
	Model.Teachers.findById(req.params.id).then((result) =>{
		res.render('editTeacher', {teacher : result})
	})
})

router.post('/updateTeacher/:id', (req, res) =>{
	Model.Teachers.update({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		createdAt : new Date(),
      	updatedAt : new Date(),
      	SubjectId : 0
	}, {where: { id : req.params.id}}).then(res.redirect('/teacher'))
})

module.exports = router