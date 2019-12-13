const router = require('express').Router();
const controller = require('./controllers');

router.get('/users', controller.users.get);
router.post('/users', controller.users.post);
router.put('/users', controller.users.put);
router.delete('/users', controller.users.delete);

router.get('/courses', controller.courses.get);
router.post('/courses', controller.courses.post);
router.put('/courses', controller.courses.put);
router.delete('/courses', controller.courses.delete);

module.exports = router;
