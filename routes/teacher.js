const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/teacher', (req, res) => {

	Model.Teacher.findAll().then((result) =>{
		res.render('teacher', {allTeacher : result})
	})
})

module.exports = router