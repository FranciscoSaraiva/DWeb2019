var express = require('express');
var router = express.Router();

var musicas = require("../controllers/indexController");

router.get('/obras', (req, res) => {
  var compositor = req.query.compositor;
  var instrumento = req.query.instrumento;
  musicas.listar(compositor, instrumento).then(dados => {
    res.jsonp(dados);
  }).catch(erro => res.jsonp(erro));
});

router.get('/obras/:id', (req, res) => {
  console.log(req.params.id)
  musicas.encontraID(req.params.id).then(dados => {
    res.jsonp(dados);
  }).catch(erro => res.jsonp(erro));
});

router.get('/tipos', (req, res) => {
  musicas.listarTipos().then(dados => {
    res.jsonp(dados);
  }).catch(erro => res.jsonp(erro));
});

router.get('/obrasQuant', (req, res) => {
  musicas.obrasQuant().then(dados => {
    res.jsonp(dados);
  }).catch(erro => res.jsonp(erro));
});

module.exports = router;
