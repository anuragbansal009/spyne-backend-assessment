const express = require('express');

const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/user', userController.createUser);
router.put('/user/:uuid', userController.updateUser);
router.delete('/user/:uuid', userController.deleteUserById);
router.get('/user', userController.getAllUsers);
router.get('/user/name', userController.getUserByName);
// router.get('/user/:uuid', userController.getUserById);
// router.post("/signup", userController.createUser);
// router.post("/signin", userController.signIn);

module.exports = router;