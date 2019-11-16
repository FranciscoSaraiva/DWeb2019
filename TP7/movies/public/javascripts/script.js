function searchMovie() {
    window.location = '/movies?title=' + $('#title')[0].value;
}

function deleteMovie(id) {
    if (confirm('Do you reeally wish to delete this movie?')) {
        axios.delete('/movies/' + id).then(() => {
            window.location = '/';
        });
    }
}