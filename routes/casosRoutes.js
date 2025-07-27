const express = require('express')
const router = express.Router()
const casosController = require('../controllers/casosController')

router.get('/casos', casosController.getAll)
router.get('/casos/:id', casosController.getById)
router.post('/casos', casosController.create)
router.put('/casos/:id', casosController.put)
router.patch('/casos/:id', casosController.patch)
router.delete('/casos/:id', casosController.remove)

module.exports = router
