const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/subject', (req, res) => {

	Model.Subjects.findAll().then((result) =>{
		res.render('subject', {allSubject : result})
	})
})

module.exports = router