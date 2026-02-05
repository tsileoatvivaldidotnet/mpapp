// jade web application routes
// base path is 'app/'
var express = require('express');
const router = express.Router();

router.get('/menu', function(req, res, next) {
    res.render('menu', { title: 'Express' });
  });


module.exports = router;  