var express = require('express');
var router = express.Router();
const fs = require('fs')
var Ficheiros = require('../controllers/ficheiro')
var Ficheiro = require('../models/ficheiro')

var multer = require('multer');
var upload = multer({ dest: 'uploads/' })


router.get('/ficheiros', (req, res) => {
  Ficheiros.listar()
    .then(dados => { res.jsonp(dados) })
    .catch(erro => { res.status(500).jsonp(erro) })
})

router.post('/ficheiros', upload.single('ficheiro'), (req, res) => {
  let oldPath = __dirname + '/../' + req.file.path;
  let newPath = __dirname + '/../public/ficheiros/' + req.file.originalname;

  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err
  })

  let data = new Date();

  let novoFicheiro = new Ficheiro({
    data: data.toISOString(),
    desc: req.body.desc,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  })

  novoFicheiro.save((err, ficheiro) => {
    if (!err)
      console.log('Ficheiro guardado com sucesso')
    else
      console.log('ERRO: ' + err)
  })
  res.redirect('/')
});

module.exports = router;
