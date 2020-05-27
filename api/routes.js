const controllers = require('./controllers');
const express = require('express');

const router = express.Router();

router.get('/profiles', controllers.readAll);
router.post('/profiles/view', controllers.readOne);
router.post('/profiles', controllers.create);
router.post('/profiles/change', controllers.update);
router.post('/profiles/delete', controllers.delete);

module.exports = router;
