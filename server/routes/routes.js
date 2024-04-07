const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const authUser = require('../middleware/middleware');

//Customer Routes
router.get('/', controller.signin);
router.post('/', controller.authUser);

router.get('/signup', controller.signup);
router.post('/signup', controller.addUser);

router.get('/dashboard', controller.dashboard);

module.exports = router;