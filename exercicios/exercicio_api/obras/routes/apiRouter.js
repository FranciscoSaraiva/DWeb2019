var express = require('express');
var router = express.Router();
var Obra = require('../controllers/obraController')
var APIResponse = require('../models/apiResponse');

/******************
 * GET
 ******************/
//work
router.get('/obras', (req, res) => {

    let ano = req.query.ano;
    let compositor = req.query.compositor;
    let periodo = req.query.periodo;
    let duracao = req.query.duracao;

    Obra.getObras(ano, compositor, periodo, duracao)
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get all obras",
                message: "All obras retrieved successfully",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get all obras",
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})
//work
router.get('/obras/:id', (req, res) => {
    Obra.getObra(req.params.id)
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get obra with id: " + req.params.id,
                message: "Obra retrieved",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get obra with id: " + req.params.id,
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})

//extra
router.get('/compositores', (req, res) => {
    Obra.getCompositores()
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get compositores",
                message: "Compositores retrieved",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get compositores",
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})
router.get('/periodos', (req, res) => {
    Obra.getPeriodos()
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get periodos",
                message: "Periodos retrieved",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get periodos",
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})

module.exports = router;