const express = require('express')
const router = express.Router()
const Model = require('../models')
const CheckAuth = require('../helper/checkAuth')

router.use((req, res, next) =>{
	router.use(CheckAuth)
	if (req.session.role === 'teacher' || req.session.role === 'academic' || req.session.role === 'headmaster') {
		next();
	}else{
		res.redirect('/login')
	}	
})

router.get('/', (req, res) => {

	Model.Student.findAll().then((result) =>{
		//res.send(result)
		res.render('student', {allStudent : result, role : req.session.role})
	})
})

router.get('/deleteStudent/:id', (req, res) => {

	Model.Student.destroy({
		where: { id : req.params.id }
	}).then(res.redirect('/student'))
})

router.get('/add', (req, res) =>{
	res.render('addstudent')
})

router.post('/add', (req, res) =>{
	console.log(req.body);
	Model.Student.create(req.body).then(res.redirect('/student'))
})

router.get('/edit/:id', (req, res) =>{
	Model.Student.findById(req.params.id).then(result =>{
		res.render('editstudent', {temp : result})
	})
})

router.post('/edit/:id', (req, res) =>{

	Model.Student.update(req.body, {where: { id: req.params.id } })  
		.then( result =>{
			console.log(result);
			res.redirect('/student')})
})

router.get('/addSubjectByStudent/:id', (req, res) =>{

	Model.Student.findById(req.params.id).then( result =>{
		Model.Subjects.findAll().then( subject =>{
			res.render('addSubjectByStudent', {result, subject})
		})
		
	})
})

router.post('/addSubjectById/:id', (req, res) =>{

	Model.School.create({
		SubjectId : req.body.subject_name,
		StudentId : req.params.id,
		Score : 0,
		createdAt : new Date(),
      	updatedAt : new Date()
      }).then(res.redirect('/student'))
})

module.exports = router