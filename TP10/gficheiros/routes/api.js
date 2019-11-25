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

router.post('/ficheiros', upload.array('ficheiro'), (req, res) => {

  if (req.files.length == 1) {
    let desc = req.body.desc;
    let file = req.files[0];
    
    let oldPath = __dirname + '/../' + file.path;
    let newPath = __dirname + '/../public/ficheiros/' + file.originalname;

    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err
    })

    let data = new Date();
    console.log(file);
    console.log(req.body)

    let novoFicheiro = new Ficheiro({
      data: data.toISOString(),
      desc: desc,
      name: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    })

    novoFicheiro.save((err, ficheiro) => {
      if (!err)
        console.log('Ficheiro guardado com sucesso')
      else
        console.log('ERRO: ' + err)
    })
  } else {
    for (let index = 0; index < req.body.desc.length; index++) {

      let desc = req.body.desc[index];
      let file = req.files[index];
      console.log(file);
      let oldPath = __dirname + '/../' + file.path;
      let newPath = __dirname + '/../public/ficheiros/' + file.originalname;

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err
      })

      let data = new Date();
      console.log(file);
      console.log(req.body)

      let novoFicheiro = new Ficheiro({
        data: data.toISOString(),
        desc: desc,
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      })

      novoFicheiro.save((err, ficheiro) => {
        if (!err)
          console.log('Ficheiro guardado com sucesso')
        else
          console.log('ERRO: ' + err)
      })
    }
  }
  res.redirect('/')
});

module.exports = router;
