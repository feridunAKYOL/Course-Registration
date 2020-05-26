const controllers = require('./controllers');
const express = require('express');

const router = express.Router();

router.get('/profiles', controllers.readAll);
router.get('/profiles/:id', controllers.readOne);
router.post('/profiles', controllers.create);
router.put('/profiles/:id', controllers.update);
router.delete('/profiles/:id', controllers.delete);

module.exports = router;
