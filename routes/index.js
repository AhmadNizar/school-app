const express = require('express')
const router = express.Router()
const Model = require('../models')
const CheckAuth = require('../helper/checkAuth')


router.get('/', (req, res) => {
	router.use(CheckAuth)
	res.render('index', {role : req.session.role})
})

module.exports = router