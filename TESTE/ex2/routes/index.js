var express = require('express');
var router = express.Router();
var axios = require('axios')

const API_KEY = '&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ';
const DOMAIN_WEBSITE = 'http://clav-api.dglab.gov.pt/api';


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(DOMAIN_WEBSITE + '/entidades?' + API_KEY)
    .then(data => {
      res.render('index', { entidades: data.data });
    })
    .catch(error => {
      res.send('<p> Error: ' + error + '</p>')
    })
});

router.get('/:id', async (req, res) => {
  var id = req.params.id;
  axios.get(DOMAIN_WEBSITE + '/entidades/' + id + '?' + API_KEY)
    .then(entidade => {
      console.log('ENTREI NA ENTIDADE')
      var entidade_recebida = entidade.data;
      axios.get(DOMAIN_WEBSITE + '/entidades/' + id + '/tipologias?' + API_KEY)
        .then(tipologias => {
          console.log('ENTREI NA TIPOLOGIA')
          entidade_recebida.tipologias = tipologias.data;
          axios.get(DOMAIN_WEBSITE + '/entidades/' + id + '/intervencao/dono?' + API_KEY)
            .then(donos => {
              console.log('ENTREI NA INTERVENCAO');
              entidade_recebida.donos = donos.data
              axios.get(DOMAIN_WEBSITE + '/entidades/' + id + '/intervencao/participante?' + API_KEY)
                .then(participantes => {
                  console.log('ENTREI NA PARTICIPANTE')
                  entidade_recebida.participantes = participantes.data;
                  res.render('entidade', { entidade: entidade_recebida });
                })
            })
        })
    })
    .catch(error => {
      res.send('<p> Error: ' + error + '</p>')
    })
})

module.exports = router;
