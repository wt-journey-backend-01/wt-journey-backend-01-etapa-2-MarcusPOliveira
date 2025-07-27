const express = require('express')
const router = express.Router()
const agentesController = require('../controllers/agentesController')

router.get('/agentes', agentesController.getAll)
router.get('/agentes/:id', agentesController.getById)
router.post('/agentes', agentesController.create)
router.put('/agentes/:id', agentesController.put)
router.patch('/agentes/:id', agentesController.patch)
router.delete('/agentes/:id', agentesController.remove)

module.exports = router
