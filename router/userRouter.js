const express = require('express');
const router = express.Router();
const userController = require('../controller/user'); // Adjust the path accordingly

// Define routes
router.post('/users', userController.createUser);

// Export the router
module.exports = router;
