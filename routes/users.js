const router = require('express').Router();
const { getUsers, getProfile, createUser } = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:_id', getProfile);
router.post('/users', createUser);
module.exports = router;
