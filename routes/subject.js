const express = require('express')
const router = express.Router()
const Model = require('../models')

router.use((req, res, next) =>{

	if (req.session.role === 'academic' || req.session.Role === 'headmaster') {
		next()
	}else{
		res.redirect('/login')
	}
})

router.get('/', (req, res) => {

	Model.Subjects.findAll({include:[Model.Teachers]}).then((result) =>{
		res.render('subject', {result, role : req.session.role})
	})
})

router.get('/enrolledStudents/:id', (req, res)=>{
		Model.School.findAll({
			include : [Model.Student, Model.Subjects], where:{
				SubjectId : req.params.id
			}
		}).then( result =>{
			//res.send(result)
			res.render('enrolledStudent', {result, role:req.session.role})
		} )
	})

router.get('/add', (req, res) =>{
	res.render('addSubject')
})

router.post('/add', (req, res) =>{
	Model.Subjects.create({
		subject_name : req.body.subject_name,
		createdAt : new Date(),
      	updatedAt : new Date()
	}).then(res.redirect('/subject'))
})

router.get('/addScore/:id', (req, res) =>{
	res.send(req.params.id)
})

module.exports = router