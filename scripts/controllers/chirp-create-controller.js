controllers.chirpCreateController = (function () {

    function postChirp(ctx) {
        let text = ctx.params.text;
        let author = sessionStorage.getItem('username');
        if (text.length === 0){
            notifications.showError('You can not publish empty Chirp.');
            return;
        }
        chirpServices.postChirp(author, text)
            .then(() => {
                ctx.redirect('#/myFeed');
                notifications.showInfo('Chirp published.')
            })
            .catch(notifications.handleError)
    }

    return {postChirp}
}());