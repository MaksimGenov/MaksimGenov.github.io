controllers.discoverPageController = (function () {

    async function loadPage(ctx) {
        let users = await userServices.loadAllUsers().catch(notifications.handleError);
        ctx.users = users.filter(u => u.username !== sessionStorage.getItem('username'));
        ctx.loggedIn = authorization.loggedIn();
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            'header': 'templates/common/header.hbs',
            'footer': 'templates/common/footer.hbs',
            'nav': 'templates/common/navigation.hbs',
            'user': 'templates/discover-users/user.hbs',
        }).then(function () {
            this.partial('templates/discover-users/discover-page.hbs')
        })
    }

    return {loadPage};
}());