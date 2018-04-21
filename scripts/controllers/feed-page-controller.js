controllers.feedPageController = (function () {
    async function loadPage(ctx) {
        let myId = sessionStorage.getItem('myId');
        let myChirps = await chirpServices.loadMyChirps();
        let subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'));
        ctx.loggedIn = authorization.loggedIn();
        ctx.username = sessionStorage.getItem('username');
        ctx.chirps = await chirpServices.loadFollowedChirps();
        ctx.chirpsCount = myChirps.length;
        ctx.followingsCount = subscriptions.length;
        ctx.folowersCount = await userServices.getUserFollowersCount(myId);
        ctx.loadPartials({
            'header': 'templates/common/header.hbs',
            'footer': 'templates/common/footer.hbs',
            'nav': 'templates/common/navigation.hbs',
            'chirp': 'templates/chirp/chirp.hbs',
            'chirp-create-form': 'templates/forms/chirp-create-form.hbs',
            'user-stats': 'templates/common/user-stats.hbs',
        }).then(function () {
            this.partial('templates/feed/feed-page.hbs')
        })
    }

    return {loadPage}
}());