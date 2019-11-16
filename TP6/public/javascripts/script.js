function deleteSong(id) {
    if (confirm('Deseja mesmo apagar esta canção?')) {
        axios.delete('/song/' + id).then(() => {
            window.location = '/';
        });
    }
}