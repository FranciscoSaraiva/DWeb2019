var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
const nanoid = require('nanoid');

var myBD = __dirname + "/../database/database.json"


/****************************************
 * GETS
 ****************************************/

//Get homepage
router.get('/', (req, res) => {
  //we run the database and give new IDs to the objects
  jsonfile.readFile(myBD, (erro, data) => {
    if (!erro) {
      data.forEach(song => {
        song.id = nanoid();
      });
      //save in db
      jsonfile.writeFile(myBD, data, erro => {
        if (erro) {
          res.render('index', { count: 0 });
        }
        else {
          console.log('IDs generated successfully')
          res.render('index', { count: data.length });
        }
      })
    }
  })
});

//Get All songs
router.get('/songs', (req, res) => {
  let query = req.query;
  console.log(query)
  jsonfile.readFile(myBD, (erro, data) => {
    if (!erro) {

      if (query != {}) {
        if (query.prov) { //filter province
          data = data.filter(song => {
            return song.prov.includes(query.prov)
          });
        }
      }

      let response_object = {};
      response_object.cancoes = data;
      response_object.prov = (query.prov) ? query.prov : "";

      res.render('songs', response_object);
    }
    else {
      res.render('error', { error: erro })
    }
  })
})

//Get specific song page
router.get('/song/:id', (req, res) => {
  let reqID = req.params.id; //id of the song
  jsonfile.readFile(myBD, (erro, data) => {
    if (!erro) {
      data = data.filter(song => song.id == reqID);
      res.render('song', { cancao: data[0] })
    }
    else {
      res.render('error', { error: erro })
    }
  })
})

//Get list of regions
router.get('/regions', (req, res) => {
  let regions = [];
  jsonfile.readFile(myBD, (erro, data) => {
    if (!erro) {
      //fill regions
      data.forEach(song => {
        regions.push(song.prov);
      });
      //filter regions
      console.log(regions);
      console.log('---------------')
      regions = regions.filter((reg, pos) => {
        return regions.indexOf(reg) == pos;
      })
      console.log(regions);

      res.render('regions', { regioes: regions })
    }
    else {
      res.render('error', { error: erro })
    }
  })
})

/****************************************
 * POST
 ****************************************/

//post new song
router.post('/song', (req, res) => {
  var body = req.body;
  body.id = nanoid();

  jsonfile.readFile(myBD, (erro, data) => {
    if (!erro) {
      data.push(body)
      jsonfile.writeFile(myBD, data, erro => {
        if (erro) console.log(erro)
        else {
          console.log('Registo gravado com sucesso.')
          res.redirect('/');
        }
      })
    }
  })
})

/****************************************
 * UPDATE
 ****************************************/

//update song
router.post('/updatesong', (req, res) => {
  var body = req.body;
  let reqID = body.id; //id of the song
  console.log(body);
  console.log(reqID);

  jsonfile.readFile(myBD, (erro, data) => {
    if (!erro) {
      data.forEach(song => {
        if (song.id == reqID) {
          song.tit = body.tit;
          song.prov = body.prov;
          song.local = body.local;
          song.musico = body.musico;
          song.file['#text'] = body.file;
          song.duracao = body.duracao;
        }
      });

      jsonfile.writeFile(myBD, data, erro => {
        if (erro) console.log(erro)
        else {
          console.log('Registo atualizado com sucesso.')
          res.redirect('/');
        }
      })

    }
    else {
      res.render('error', { error: erro })
    }
  })
})

/****************************************
 * DELETE
 ****************************************/

//delete song
router.delete('/song/:id', (req, res) => {
  console.log(req.params.id)
  var deleteID = req.params.id; //id of the song

  jsonfile.readFile(myBD, (erro, data) => {
    var removedIndex = -1;
    if (!erro) {
      data.forEach((song, index) => {
        if (song.id == deleteID) {
          removedIndex = index; //get index
        }
      });

      if (removedIndex != -1) {
        var removed = data.splice(removedIndex, 1);
        console.log("DELETED: ");
        console.log(removed);
        //save in db
        jsonfile.writeFile(myBD, data, erro => {
          res.redirect(200, '/');
        })
      } else {
        res.render('error', { error: 'Não encontrada canção para apagar...' });
      }
    }
    else {
      res.render('error', { error: erro })
    }
  })
})

module.exports = router;
