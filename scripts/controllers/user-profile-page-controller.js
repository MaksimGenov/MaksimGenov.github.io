controllers.userProfilePageController = (function () {

    async function loadPage(ctx) {
        let user = await userServices.loadUser(ctx.params.id.substring(1));
        let subscriptions = user.subscriptions || [];
        ctx.loggedIn = authorization.loggedIn();
        ctx.user = user;
        ctx.folowersCount = await userServices.getUserFollowersCount(user._id);
        ctx.followingsCount = subscriptions.length;
        ctx.isFollowed = JSON.parse(sessionStorage.getItem('subscriptions')).includes(user._id);
        ctx.chirps = await chirpServices.loadChirpsByUserId(user._id);
        ctx.chirpsCount = ctx.chirps.length;
        ctx.loadPartials({
            'header': 'templates/common/header.hbs',
            'footer': 'templates/common/footer.hbs',
            'nav': 'templates/common/navigation.hbs',
            'chirp': 'templates/chirp/chirp.hbs',
            'user-stats': 'templates/common/user-stats.hbs',
            'create-chirp-form': 'templates/forms/chirp-create-form.hbs',
        }).then(function () {
            this.partial('templates/profile/user-profile-page.hbs')
        })
    }

    function handleFollowUser(ctx) {
        let targetId = ctx.params.id.substring(1);
        userServices.followUser(targetId).then(() => {
            ctx.redirect('#/user/:' + targetId);
            notifications.showInfo('Subscribed' );
        }).catch(notifications.handleError)
    }

    function handleUnFollowUser(ctx) {
        let targetId = ctx.params.id.substring(1);
        userServices.unFollowUser(targetId).then(() => {
            ctx.redirect('#/user/:' + targetId);
            notifications.showInfo('Unsubscribed');
        }).catch(notifications.handleError)
    }

    return {loadPage, handleFollowUser, handleUnFollowUser};
}());