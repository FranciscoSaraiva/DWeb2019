var express = require('express');
var router = express.Router();
var Prize = require('../controllers/prizeController')
var APIResponse = require('../models/apiResponse');

/******************
 * GET
 ******************/
//work
router.get('/prizes', (req, res) => {

    let category = req.query.category;
    let date = req.query.date;

    Prize.getPrizes(category, date)
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get all prizes",
                message: "All prizes retrieved successfully",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get all prizes",
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})
//work
router.get('/prizes/:id', (req, res) => {
    Prize.getPrize(req.params.id)
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get prize with id: " + req.params.id,
                message: "Prize retrieved",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get prize with id: " + req.params.id,
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})
//semi work
router.get('/categories', (req, res) => {
    Prize.getCategories()
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get all categories",
                message: "Categories retrieved",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get all categories",
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})
//not implemented
router.get('/laureates', (req, res) => {
    Prize.getLaureates()
        .then(data => {
            res.status(200)
            res.jsonp(new APIResponse({
                request: "Get all laureates",
                message: "Laureates retrieved",
                status: 200
            }, data));
        })
        .catch(error => {
            let json = new APIResponse({
                request: "Get all laureates",
                message: "An error occured in the database",
                status: 500,
            }, []);
            json.Request.Error = error;
            res.status(500)
            res.jsonp(json)
        })
})

module.exports = router;