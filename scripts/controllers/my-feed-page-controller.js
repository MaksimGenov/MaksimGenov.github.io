controllers.myFeedPageController = (function () {

    async function loadPage(ctx) {
        let myId = sessionStorage.getItem('myId');
        let user = await userServices.loadUser(myId);
        let subscriptions = user.subscriptions || [];
        ctx.loggedIn = authorization.loggedIn();
        ctx.user = user;
        ctx.folowersCount = await userServices.getUserFollowersCount(user._id);
        ctx.followingsCount = subscriptions.length;
        ctx.isFollowed = JSON.parse(sessionStorage.getItem('subscriptions')).includes(user._id);
        ctx.chirps = await chirpServices.loadMyChirps();
        ctx.chirpsCount = ctx.chirps.length;
        ctx.loadPartials({
            'header': 'templates/common/header.hbs',
            'footer': 'templates/common/footer.hbs',
            'nav': 'templates/common/navigation.hbs',
            'chirp': 'templates/chirp/chirp.hbs',
            'user-stats': 'templates/common/user-stats.hbs',
            'create-chirp-form': 'templates/forms/chirp-create-form.hbs',
        }).then(function () {
            this.partial('templates/my-feed/my-feed-page.hbs')
        })
    }

    function deleteChirp(ctx) {
        let id = ctx.params.id.substring(1);
        chirpServices.deleteChirp(id).then(function () {
            ctx.redirect('#/myFeed');
        })
    }


    return {loadPage, deleteChirp};
}());