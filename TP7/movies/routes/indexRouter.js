var express = require('express');
var router = express.Router();
var Movies = require('../controllers/movieController')

//Homepage
router.get('/', (req, res) => {
  Movies.count()
    .then(data => { res.render('index', { count: data }) })
    .catch(error => { res.render('error', { error: error }) })
});

module.exports = router;
