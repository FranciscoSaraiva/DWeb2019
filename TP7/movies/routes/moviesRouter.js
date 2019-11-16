var express = require('express');
var router = express.Router();
var Movies = require('../controllers/movieController')

//GET list of movies
router.get('/', (req, res) => {
    let query = req.query;
    let title = query.title;
    Movies.showAll(title)
        .then(data => { res.render('../movies/movies', { movies: data }) })
        .catch(error => { res.render('error', { error: "There was an error finding movies in the database..." }) })
})

//GET movie page
router.get('/:idMovie', (req, res) => {
    let id = req.params.idMovie;
    Movies.show(id)
        .then(data => { res.render('../movies/movie', { movie: data }) })
        .catch(error => { res.render('error', { error: "No movie with such id was found..." }) })
})

//POST Movie
router.post('/', (req, res) => {
    let bodyReq = req.body;

    let title = bodyReq.title;
    let year = bodyReq.year;
    let cast = bodyReq.cast.split(',');
    let genres = bodyReq.genres.split(',');

    console.log(cast);
    console.log(genres);

    let body = {};
    body.title = title;
    body.year = year;
    body.cast = cast;
    body.genres = genres;
    console.log(body);
    Movies.insert(body)
        .then(movie => { res.redirect('/movies/' + movie._id) })
        .catch(() => { res.redirect('/') })
})

//PUT Movie
router.post('/:idMovie', (req, res) => {
    let id = req.params.idMovie;
    let bodyReq = req.body;

    let title = bodyReq.title;
    let year = bodyReq.year;
    let cast = bodyReq.cast.split(',');
    let genres = bodyReq.genres.split(',');

    let body = {};
    body.title = title;
    body.year = year;
    body.cast = cast;
    body.genres = genres;

    Movies.update(id, body)
        .then(() => { res.redirect('/movies/' + id) })
        .catch(() => { res.redirect('/') })
})

//DELETE Movie
router.delete('/:idMovie', (req, res) => {
    let id = req.params.idMovie;
    Movies.delete(id)
        .then(() => { res.redirect('/') })
        .catch(() => { res.redirect('/') })
})

module.exports = router;