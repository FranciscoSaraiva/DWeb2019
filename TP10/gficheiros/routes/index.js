var express = require('express');
var router = express.Router();
const axios = require('axios');
const lhost = require('../config/env').host;

/* GET home page. */
router.get('/', (req, res) => {
  axios.get(lhost + '/api/ficheiros')
    .then(
      dados => {
        res.render('index', { lista: dados.data })
      })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

//DOWNLOAD
router.get('/download/:fnome', (req, res) => {
  res.download(__dirname + '/../public/ficheiros/' + req.params.fnome)
})

module.exports = router;
