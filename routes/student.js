const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/student', (req, res) => {

	Model.Student.findAll().then((result) =>{
		res.render('student', {allStudent : result})
	})
})

router.get('/deleteStudent/:id', (req, res) => {

	Model.Student.destroy({
		where: { id : req.params.id }
	}).then(res.redirect('/student'))
})

router.get('/student/add', (req, res) =>{
	console.log('masuk sini');
	//res.redirect('addstudent')
	res.render('addstudent')
})

router.post('/add', (req, res) =>{
	console.log(req.body);
	Model.Student.create(req.body).then(err =>{
			if(err){
				alert("Email Salah gan");
			}else{
				res.redirect('/student')
			}
			
  //do something when you get error
  //you could check if this is validation error or other error
});
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
module.exports = router