var express = require('express');
var axios = require('axios')
var router = express.Router();

const API_KEY = '&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ';
const DOMAIN_WEBSITE = 'http://clav-api.dglab.gov.pt/api';

/* GET home page. */
router.get('/', (req, res) => {
  axios.get(DOMAIN_WEBSITE + '/entidades?processos=com' + API_KEY)
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
